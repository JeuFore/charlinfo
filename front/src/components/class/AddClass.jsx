import React from 'react'
import { RequestStatus } from '../../utils/consts'
import axios from 'axios'
import config from '../../utils/config';

import { Progress, Uploader } from 'rsuite';

class AddClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            upload: 0,
            upload_bar: 'hide'
        };
        this.type = 1;
        this.inputChange = this.inputChange.bind(this);
        this.uploadSubmit = this.uploadSubmit.bind(this);
    }

    inputChange(e) {
        return this[e.target.name] = e.target.value;
    }

    async uploadSubmit(event) {
        event.preventDefault();
        if (!this.state.file)
            return this.setState({
                requestStatus: RequestStatus.Error
            });

        if (this.state.file.size > 500000000 * 10)
            return this.setState({
                requestStatus: RequestStatus.Error
            });

        this.setState({
            requestStatus: RequestStatus.Getting,
            upload: 0,
            upload_bar: 'active'
        });
        const formData = new FormData();
        formData.append('content', this.state.file);
        try {
            await axios({
                baseURL: config.localApiUrl,
                url: `/file/${this.props.match.params.s1.replace("S", "")}/${this.props.match.params.class}/add`,
                method: 'POST',
                headers: {
                    'content-type': 'multipart/form-data'
                },
                data: formData,
                params: {
                    title: this.title,
                    type: this.type,
                    description: this.description,
                },
                withCredentials: true,
                onUploadProgress: (p) => {
                    this.setState({
                        upload: Math.floor((p.loaded / p.total) * 100)
                    })
                }
            });
            this.setState({ requestStatus: RequestStatus.Success, upload_bar: 'success' })
            this.props.history.goBack();
        } catch (error) {
            this.setState({ requestStatus: error.response, upload_bar: 'fail' })
        }
    }

    render() {
        return (
            <div>
                {this.state.requestStatus === RequestStatus.Getting && (
                    <div className="text-center fixed-center">
                        <div className="spinner-border" role="status">
                        </div>
                    </div>
                )}

                <form className="m-5" onSubmit={this.uploadSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="title" className="form-control" placeholder="Mon cours" onChange={this.inputChange} name="title" />
                    </div>
                    <div className="form-group">
                        <label>Type</label>
                        <select className="form-control m-3 w-auto" onChange={this.inputChange} name="type">
                            <option value="1">Cours</option>
                            <option value="2">Exercice</option>
                            <option value="3">Corrigé</option>
                            <option value="4">Aide</option>
                            <option value="5">DM</option>
                        </select>
                    </div>
                    <div className="form-group mb-3">
                        <label>Description</label>
                        <textarea className="form-control" rows="3" onChange={this.inputChange} name="description" />
                    </div>

                    <Uploader
                        className="mb-3"
                        multiple={false}
                        autoUpload={false}
                        fileListVisible={false}
                        onChange={(value) => this.setState({ file: value[value.length - 1].blobFile })}
                    />

                    {this.state.file && (
                        <div className="rs-uploader rs-uploader-text mb-5">
                            <div className="rs-uploader-file-items">
                                <div className="rs-uploader-file-item rs-uploader-file-item-text bg-light">
                                    <div className="rs-uploader-file-item-icon-wrapper">
                                        <i className="rs-uploader-file-item-icon"></i>
                                    </div>
                                    <div className="rs-uploader-file-item-panel">
                                        <div className="rs-uploader-file-item-content">
                                            <p role="presentation" className="rs-uploader-file-item-title">{this.state.file.name}</p>
                                            <span className="rs-uploader-file-item-size">
                                                {this.state.file.size < 1048576 ?
                                                    `${Math.round(this.state.file.size / 1024 * 100) / 100}KB`
                                                    : `${Math.round(this.state.file.size / 1048576 * 100) / 100}MB`
                                                }</span>
                                        </div>
                                    </div>
                                    <p className="rs-uploader-file-item-btn-remove" role="button" onClick={() => this.setState({ file: '' })}></p>
                                </div>
                            </div>
                        </div>
                    )}

                    <input type="submit" className="btn btn-primary mb-3" value="Ajouter le cours" />

                    <Progress.Line percent={this.state.upload} status={this.state.upload_bar} className={this.state.upload_bar} />
                </form>
            </div>
        )
    }
}

export default AddClass