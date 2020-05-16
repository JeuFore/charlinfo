import React from 'react'
import { RequestStatus } from '../../utils/consts'
import fileClass from '../../actions/fileClass'

import plus_icon from '../../assets/icons/plus.webp'

class AddClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            type: "Cours",
            description: "",
            element: []
        };

        this.inputChange = this.inputChange.bind(this);
        this.addElement = this.addElement.bind(this);
        this.uploadSubmit = this.uploadSubmit.bind(this);
    }

    inputChange(event) {
        if (event.target.name !== "element")
            return this.setState({
                [event.target.name]: event.target.value
            });
        if (this.state.element[event.target.id])
            this.setState({ element: [this.state.element[event.target.id], event.target.value] })
        else
            this.setState({
            element: [...this.state.element, event.target.value]
        });
    }

addElement(){
    let div = document.getElementById("element-changelog");
    let input = document.createElement("input");
    input.type = "text";
    let test = div.lastElementChild.id;
    test++;
    input.id = test;
    input.className = "form-control";
    input.onchange = this.inputChange;
    input.name = "element";
    div.appendChild(input);
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
    }, formData).then(({ requestStatus }) => this.setState({ requestStatus }));
}

render() {
    if (this.state.requestStatus === RequestStatus.Success) {
        window.location.replace(this.props.match.url.replace("/add", ""));
    }
    console.log(this.state)
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
                    <input type="title" className="form-control" placeholder="Beta X" onChange={this.inputChange} name="title" />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input type="date" className="form-control" onChange={this.inputChange} name="date" />
                </div>
                <div className="form-group">
                    <label>Un élement du changelog</label>
                    <div id="element-changelog">
                        <input type="text" id="0" className="form-control" placeholder="Déploiement du site simplifié" onChange={this.inputChange} name="element" />
                    </div>
                    <img src={plus_icon} alt="add icon" className="mb-3 cursor-p" width="40px" onClick={this.addElement} />
                </div>

                <input type="submit" className="btn btn-primary" value="Upload" />
            </form>
        </div>
    )
}
}

export default AddClass