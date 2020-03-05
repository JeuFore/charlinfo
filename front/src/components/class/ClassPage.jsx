import React from 'react'
import { Link } from 'react-router-dom'
import DisplayUploadingFile from './DisplayUploadingFile'
import fileClass from '../../actions/fileClass'
import { RequestStatus, UserPerm } from '../../utils/consts'
import user from '../../actions/user'

import add_icon from '../../assets/icons/add-icon.png'

class DisplayClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestStatus: RequestStatus.Getting,
            type: "null",
            perm: ''
        }
        this.inputChange = this.inputChange.bind(this);
    }

    componentDidMount() {
        document.title = `Charlinfo | ${this.props.match.params.class}`;
        fileClass.get(this.state, this.props.match.url);
        this.user = user.isConnected;
        user.permission({}, {
            grade: UserPerm.Admininstrator
        }).then((data) => this.setState({ perm: data.data }));
    }

    inputChange(event) {
        return this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        if (this.state.requestStatus === RequestStatus.Success && this.state.type !== "null") {
            let sort_type = this.state.type;
            function compare(a, b, type = sort_type) {
                return a[type].localeCompare(b[type])
            }
            this.state.data.sort(compare);
        }
        var cours = [];
        var exercice = [];
        var corrige = [];
        var aide = [];
        var DM = [];
        if (this.state.requestStatus === RequestStatus.Success) {
            cours = this.state.data.filter(data => data.type === "Cours");
            exercice = this.state.data.filter(data => data.type === "Exercice");
            corrige = this.state.data.filter(data => data.type === "Corrigé");
            aide = this.state.data.filter(data => data.type === "Aide");
            DM = this.state.data.filter(data => data.type === "DM");
        }
        return (
            <div className="d-flex flex-column">
                <h1 className="text-center m-3">{this.props.match.params.class}</h1>
                <Link to={`${this.props.match.url}/add`} className="mx-auto mb-3 add-icon"><img src={add_icon} alt="add icon" style={{ width: 50 }} /></Link>
                <small className="text-center mb-3">Ajouter des cours, exercices, corrigés, aides</small>

                <select className="form-control m-3 w-auto" onChange={this.inputChange} name="type">
                    <option value="null">Trier par ...</option>
                    <option value="title">Titre</option>
                    <option value="description">Description</option>
                    <option value="creator">Createur</option>
                    <option value="release_date">Date</option>
                </select>

                {this.state.requestStatus === RequestStatus.Getting && (
                    <div className="text-center fixed-center">
                        <div className="spinner-border" role="status">
                        </div>
                    </div>
                )}

                <div className="displayClass">

                    {cours.length !== 0 && (
                        <div className="flex-column m-3">
                            <h2 className="mb-3">Cours</h2>
                            {cours.map((data) => (
                                <DisplayUploadingFile key={data.release_date} data={data} url={this.props.match.url} styleD="text-white bg-secondary" user={this.user} grade={this.state.perm} />
                            ))}
                        </div>
                    )}

                    {exercice.length !== 0 && (
                        <div className="flex-column m-3">
                            <h2 className="mb-3">Exercice</h2>
                            {exercice.map((data) => (
                                <DisplayUploadingFile key={data.release_date} data={data} url={this.props.match.url} styleD="text-white bg-info" user={this.user} grade={this.state.perm} />
                            ))}
                        </div>
                    )}

                    {corrige.length !== 0 && (
                        <div className="flex-column m-3">
                            <h2 className="mb-3">Corrigé</h2>
                            {corrige.map((data) => (
                                <DisplayUploadingFile key={data.release_date} data={data} url={this.props.match.url} styleD="text-white bg-success" user={this.user} grade={this.state.perm} />
                            ))}
                        </div>
                    )}

                    {aide.length !== 0 && (
                        <div className="flex-column m-3">
                            <h2 className="mb-3">Aide</h2>
                            {aide.map((data) => (
                                <DisplayUploadingFile key={data.release_date} data={data} url={this.props.match.url} styleD="text-white bg-primary" user={this.user} grade={this.state.perm} />
                            ))}
                        </div>
                    )}

                    {DM.length !== 0 && (
                        <div className="flex-column m-3">
                            <h2 className="mb-3">DM</h2>
                            {DM.map((data) => (
                                <DisplayUploadingFile key={data.release_date} data={data} url={this.props.match.url} styleD="text-white bg-danger" user={this.user} grade={this.state.perm} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default DisplayClass