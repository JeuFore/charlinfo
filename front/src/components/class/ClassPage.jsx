import React from 'react'
import { Link } from 'react-router-dom'
import DisplayUploadingFile from './DisplayUploadingFile'
import fileClass from '../../actions/fileClass'
import { RequestStatus, UserPerm, Color } from '../../utils/consts'
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
        this.count = 0;
        this.test = '';
    }

    componentDidMount() {
        document.title = `Charlinfo | ${this.props.match.params.class}`;
        fileClass.get(this.state, `${this.props.match.params.s1}/${this.props.location.state.classId}`).then((data) => this.setState(data));
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

    container() {
        this.count++;
        this.test = '';
        if (this.count <= 3)
            this.test = 'container';
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
            cours = this.state.data.filter(data => data.type === 1);
            exercice = this.state.data.filter(data => data.type === 2);
            corrige = this.state.data.filter(data => data.type === 3);
            aide = this.state.data.filter(data => data.type === 4);
            DM = this.state.data.filter(data => data.type === 5);
        }
        console.log(this.state)
        return (
            <div className="d-flex flex-column">
                <h1 className="text-center m-3">{this.props.location.state.classNameEnter}</h1>

                <div className="adding-zone">
                    <Link to={{
                        pathname: `${this.props.match.url}/add`,
                        state: {
                            classId: this.props.location.state.classId,
                            classNameEnter: this.props.location.state.classNameEnter
                        }
                    }} className="add-icon"><img src={add_icon} alt="add icon" /></Link>
                    <small className="text-center mb-3">Ajouter des cours, exercices, corrigés, aides</small>
                </div>

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

                <div className={`displayClass ${this.test}`}>

                    {cours.length !== 0 && (
                        <div>
                            {this.container()}
                            <h2 className="mb-3">Cours</h2>
                            {cours.map((data) => (
                                <DisplayUploadingFile key={data.release_date} data={data} url={this.props.match.url} styleD={{ color: 'white', backgroundColor: Color[1] }} user={this.user} grade={this.state.perm} />
                            ))}
                        </div>
                    )}

                    {exercice.length !== 0 && (
                        <div>
                            {this.container()}
                            <h2 className="mb-3">Exercice</h2>
                            {exercice.map((data) => (
                                <DisplayUploadingFile key={data.release_date} data={data} url={this.props.match.url} styleD={{ color: 'white', backgroundColor: Color[10] }} user={this.user} grade={this.state.perm} />
                            ))}
                        </div>
                    )}

                    {corrige.length !== 0 && (
                        <div>
                            {this.container()}
                            <h2 className="mb-3">Corrigé</h2>
                            {corrige.map((data) => (
                                <DisplayUploadingFile key={data.release_date} data={data} url={this.props.match.url} styleD={{ color: 'white', backgroundColor: Color[0] }} user={this.user} grade={this.state.perm} />
                            ))}
                        </div>
                    )}

                    {aide.length !== 0 && (
                        <div>
                            {this.container()}
                            <h2 className="mb-3">Aide</h2>
                            {aide.map((data) => (
                                <DisplayUploadingFile key={data.release_date} data={data} url={this.props.match.url} styleD={{ color: 'white', backgroundColor: Color[6] }} user={this.user} grade={this.state.perm} />
                            ))}
                        </div>
                    )}

                    {DM.length !== 0 && (
                        <div>
                            {this.container()}
                            <h2 className="mb-3">DM</h2>
                            {DM.map((data) => (
                                <DisplayUploadingFile key={data.release_date} data={data} url={this.props.match.url} styleD={{ color: 'white', backgroundColor: Color[8] }} user={this.user} grade={this.state.perm} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default DisplayClass