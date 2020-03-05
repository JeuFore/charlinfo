import React from 'react'
import { RequestStatus } from '../../utils/consts'
import fileSemester from '../../actions/fileSemester'

class AddSemester extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            type: "Informatique",
            description: "",
            professor: "",
            link: ""
        };

        this.inputChange = this.inputChange.bind(this);
        this.uploadSubmit = this.uploadSubmit.bind(this);
    }

    inputChange(event) {
        return this.setState({
            [event.target.name]: event.target.value
        });
    }

    uploadSubmit(event) {
        event.preventDefault();
        this.setState({
            requestStatus: RequestStatus.Getting
        });
        fileSemester.add(this.state, this.props.match.url, {
            title: this.state.title,
            description: this.state.description,
            professor: this.state.professor,
            type: this.state.type,
            link: this.state.link
        }).then((data) => this.setState(data));
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
                            <option value="Informatique">Informatique</option>
                            <option value="Général">Général</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" rows="3" onChange={this.inputChange} name="description" />
                    </div>

                    <input type="enter" className="form-control" placeholder="Professeurs" onChange={this.inputChange} name="professor" />
                    <input type="enter" className="form-control" placeholder="Lien" onChange={this.inputChange} name="link" />

                    <input type="submit" className="btn btn-primary" value="Upload" />
                </form>
            </div>
        )
    }
}

export default AddSemester