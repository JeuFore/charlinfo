import React from 'react'
import { RequestStatus } from '../../utils/consts'
import fileSemester from '../../actions/fileSemester'
import { Color } from '../../utils/consts'

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
        event.preventDefault();
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
            link: this.state.link,
            color: this.state.color
        }).then(({ requestStatus }) => this.setState({ requestStatus }));
    }

    render() {
        if (!this.props.location.state) 
            window.location.replace('/home');
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
                        <select className="form-control my-3 w-auto" onChange={this.inputChange} name="type">
                            <option value="Informatique">Informatique</option>
                            <option value="Général">Général</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" rows="3" onChange={this.inputChange} name="description" />
                    </div>

                    <input type="enter" className="form-control my-3" placeholder="Professeurs" onChange={this.inputChange} name="professor" />
                    <input type="enter" className="form-control my-3" placeholder="Lien" onChange={this.inputChange} name="link" />

                    <div className="d-flex my-3">
                        {Color.map((data) => (
                            <button key={data} className="rounded-circle m-1" style={{ backgroundColor: data, width: "20px", height: "20px" }} value={data} onClick={this.inputChange} name="color" />
                        ))}
                    </div>

                    <input type="submit" className="btn btn-primary" value="Upload" />
                </form>
            </div>
        )
    }
}

export default AddSemester