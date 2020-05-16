import React from 'react'
import { RequestStatus } from '../../utils/consts'
import fileSemester from '../../actions/fileSemester'
import { Color } from '../../utils/consts'

import { SelectPicker } from 'rsuite';

import plus_icon from '../../assets/icons/plus.webp'

class AddSemester extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            professorStatus: RequestStatus.Getting,
            professor_list: []
        };
        this.inputChange = this.inputChange.bind(this);
        this.uploadSubmit = this.uploadSubmit.bind(this);
        this.addProfessor = this.addProfessor.bind(this);
        this.type = 1;
        this.professor_number = 0;
        this.professor = []
    }

    componentDidMount() {
        fileSemester.getallprofessor({}).then((data) => this.setState({ professorStatus: data.requestStatus, professor: data.data, professor_list: [...this.state.professor_list, <SelectPicker key={this.professor_number} data={data.data} placeholder={data.data[0].label} className="w-100 d-block mb-3" onChange={(value) => this.professor[this.professor_number] = value} name="professor" />] }));
    }

    inputChange(e) {
        e.preventDefault();
        return this[e.target.name] = e.target.value
    }

    uploadSubmit(event) {
        event.preventDefault();
        this.setState({
            requestStatus: RequestStatus.Getting
        });
        fileSemester.add(this.state, this.props.match.url.replace("S", ""), {
            name: this.name,
            description: this.description,
            professor: this.professor,
            type: this.type,
            id: this.id,
            color: this.color
        }).then(({ requestStatus }) => this.setState({ requestStatus }));
    }

    addProfessor() {
        this.professor_number++;
        this.setState({
            professor_list: [...this.state.professor_list, <SelectPicker key={this.professor_number} data={this.state.professor} placeholder={this.state.professor[0].label} className="w-100 d-block mb-3" onChange={(value) => this.professor[this.professor_number] = value} name="professor" />]
        })
    }

    render() {
        if (this.state.requestStatus === RequestStatus.Success) {
            this.props.history.goBack();
        }
        return (
            <div>
                {(this.state.professorStatus === RequestStatus.Getting || this.state.requestStatus === RequestStatus.Getting) && (
                    <div className="text-center fixed-center">
                        <div className="spinner-border" role="status">
                        </div>
                    </div>
                )}

                <form className="m-5" onSubmit={this.uploadSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="title" className="form-control" placeholder="Mon cours" onChange={this.inputChange} name="name" />
                    </div>
                    <div className="form-group">
                        <label>Type</label>
                        <select className="form-control my-3 w-auto" onChange={this.inputChange} name="type">
                            <option value="1">Informatique</option>
                            <option value="2">Général</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" rows="3" onChange={this.inputChange} name="description" />
                    </div>

                    {this.state.professor_list}

                    <img src={plus_icon} alt="add icon" className="mb-3 cursor-p" width="40px" onClick={this.addProfessor} />

                    <input type="enter" className="form-control mb-3" placeholder="Lien" onChange={this.inputChange} name="id" />

                    <div className="d-flex mb-3">
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