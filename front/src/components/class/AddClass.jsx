import React from 'react'
import { RequestStatus } from '../../utils/consts'
import fileClass from '../../actions/fileClass'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import config from '../../utils/config';

import { Progress, Uploader } from 'rsuite';

class AddClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            type: "1",
            description: "",
            upload: 0,
            upload_bar: 'active'
        };

        this.inputChange = this.inputChange.bind(this);
        this.uploadSubmit = this.uploadSubmit.bind(this);
    }

    inputChange(event) {
        if (event.target.name !== "file")
            return this.setState({
                [event.target.name]: event.target.value
            });
        return this.setState({
            file: event.target.files[0]
        })
    }

    async uploadSubmit(event) {
        event.preventDefault();

        console.log(this.test)
        console.log(this.state.file)

        this.setState({
            requestStatus: RequestStatus.Getting,
            upload: 0
        });

        const formData = new FormData();
        formData.append('content', this.test[0].blobFile);

        console.log(formData)
        console.log(this.test)

        try {
            const { data } = await axios({
                baseURL: config.localApiUrl,
                url: `/file/${this.props.match.params.s1.replace("S", "")}/${this.props.location.state.classId}/add`,
                method: 'POST',
                headers: {
                    'content-type': 'multipart/form-data'
                },
                data: formData,
                params: {
                    title: this.state.title,
                    type: this.state.type,
                    description: this.state.description,
                },
                withCredentials: true,
                onUploadProgress: (p) => {
                    this.setState({
                        upload: Math.floor((p.loaded / p.total) * 100)
                    })
                }
            });
            this.setState({ requestStatus: RequestStatus.Success, upload_bar: 'success' })
        } catch (error) {
            this.setState({ requestStatus: error.response.data, upload_bar: 'fail' })
        }

        /**fileClass.add(this.state, `/${this.props.match.params.s1}/${this.props.location.state.classId}/add`, {
            title: this.state.title,
            type: this.state.type,
            description: this.state.description,
        }, formData, this).then((data) => this.setState(data));
        */
    }

    render() {
        if (this.state.requestStatus === RequestStatus.Success) {
            //return <Redirect to={this.props.match.url.replace("/add", "")} />
            //window.location.replace();
        }
        console.log(this.state.file)
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
                                            <a role="presentation" className="rs-uploader-file-item-title">{this.state.file.name}</a>
                                            <span className="rs-uploader-file-item-size">
                                                {this.state.file.size < 1048576 ?
                                                    `${Math.round(this.state.file.size / 1024 * 100) / 100}KB`
                                                    : `${Math.round(this.state.file.size / 1048576 * 100) / 100}MB`
                                                }</span>
                                        </div>
                                    </div>
                                    <a className="rs-uploader-file-item-btn-remove" role="button" onClick={() => this.setState({ file: '' })}></a>
                                </div>
                            </div>
                        </div>
                    )}

                    <input type="submit" className="btn btn-primary mb-3" value="Ajouter le cours" />

                    <Progress.Line percent={this.state.upload} status={this.state.upload_bar} />
                </form>
            </div>
        )
    }
}

export default AddClass