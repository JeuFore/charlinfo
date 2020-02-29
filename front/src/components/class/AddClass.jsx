import React from 'react'
import { RequestStatus } from '../../utils/consts'
import fileClass from '../../actions/fileClass'

class AddClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            type: "Cours",
            description: "",
            file: React.createRef()
        };

        this.inputChange = this.inputChange.bind(this);
        this.uploadSubmit = this.uploadSubmit.bind(this);
    }

    inputChange(event) {
        if (event.target.name !== "file")
            return this.setState({
                [event.target.name]: event.target.value
            });
        this.setState({
            file: event.target.files[0]
        })
    }

    uploadSubmit(event) {
        event.preventDefault();
        this.setState({
            requestStatus: RequestStatus.Getting
        });
        const formData = new FormData();
        formData.append('content', this.state.file)
        fileClass.add(this.state, this.props.match.url, {
            title: this.state.title,
            type: this.state.type,
            description: this.state.description,
        }, formData).then((data) => this.setState(data));

    }

    render() {
        if (this.state.requestStatus === RequestStatus.Success) {
            window.location.replace(this.props.match.url.replace("/add", ""));
        }
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
                            <option value="Cours">Cours</option>
                            <option value="Exercice">Exercice</option>
                            <option value="Corrigé">Corrigé</option>
                            <option value="Aide">Aide</option>
                            <option value="DM">DM</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" rows="3" onChange={this.inputChange} name="description" />
                    </div>
                    <input type="file" onChange={this.inputChange} name="file" />
                    <input type="submit" className="btn btn-primary" value="Upload" />
                </form>
            </div>
        )
    }
}

export default AddClass