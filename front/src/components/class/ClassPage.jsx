import React from 'react'
import { Link } from 'react-router-dom'
import DisplayUploadingFile from './DisplayUploadingFile'
import fileClass from '../../actions/fileClass'
import { RequestStatus, Color } from '../../utils/consts'

import add_icon from '../../assets/icons/add-icon.webp';
import alert from '../../assets/icons/alert-circle.svg';

class DisplayClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestStatus: RequestStatus.Getting,
            type: "null",
            container: 'container'
        }
        this.count = 0;
        this.title = '';
        this.inputChange = this.inputChange.bind(this);
        this.validateRemove = this.validateRemove.bind(this);
        this.removeChild = this.removeChild.bind(this);
        this.dismissRemove = this.dismissRemove.bind(this);
        this.container = this.container.bind(this);
    }

    componentDidMount() {
        document.title = `Charlinfo | ${this.props.match.params.class}`;
        fileClass.get(this.state, this.props.location.pathname.replace("S", "")).then((res) => {
            if (res.requestStatus === RequestStatus.Success)
                this.title = res.data.title;
            this.setState(res.data);
        });
    }

    inputChange(event) {
        return this.setState({
            [event.target.name]: event.target.value
        });
    }

    container() {
        this.count++;
    }

    validateRemove(id) {
        this.remove = id;
        this.setState({ deleteStatus: RequestStatus.Getting });
    }

    dismissRemove() {
        this.setState({ deleteStatus: RequestStatus.Success });
    }

    async removeChild() {
        const { requestStatus } = await fileClass.delete({}, this.props.location.pathname, { id: this.remove });
        if (requestStatus === RequestStatus.Success) {
            let index = this.state.data.findIndex((element) => element.id === this.remove);
            this.state.data.splice(index, 1);
        }
        this.dismissRemove();
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

        return (
            <div className="d-flex flex-column">
                <h1 className="text-center m-3">{this.title}</h1>

                <div className="adding-zone">
                    <Link to={`${this.props.match.url}/add`} className="add-icon"><img src={add_icon} alt="add icon" /></Link>
                    <small className="text-center mb-3">Ajouter des cours, exercices, corrigés, aides</small>
                </div>


                {this.state.deleteStatus === RequestStatus.Getting && (
                    <div className="toast position-fixed fixed-center" role="alert" style={{ opacity: 1, zIndex: 100 }}>
                        <div className="toast-header">
                            <img src={alert} className="rounded mr-2" alt="alert-icon" />
                            <strong className="mr-auto">Charlinfo</strong>
                            <button type="button" className="ml-2 mb-1 close" onClick={this.dismissRemove}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="toast-body d-flex flex-column">
                            <p>Êtes-vous sur de supprimer ce module ?</p>
                            <button type="button" className="btn btn-danger" onClick={this.removeChild}>Supprimer</button>
                        </div>
                    </div>
                )}

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

                <div className={`displayClass ${this.state.container}`}>

                    {cours.length !== 0 && (
                        <div>
                            {this.container()}
                            <h2 className="mb-3">Cours</h2>
                            {cours.map((data) => (
                                <DisplayUploadingFile key={data.id} grade={this.state.permission} user={this.props.user} url={this.props.match.url} data={data} styleD={{ color: 'white', backgroundColor: Color[1] }} remove={this.validateRemove} />
                            ))}
                        </div>
                    )}

                    {exercice.length !== 0 && (
                        <div>
                            {this.container()}
                            <h2 className="mb-3">Exercice</h2>
                            {exercice.map((data) => (
                                <DisplayUploadingFile key={data.id} grade={this.state.permission} user={this.props.user} url={this.props.match.url} data={data} styleD={{ color: 'white', backgroundColor: Color[10] }} remove={this.validateRemove} />
                            ))}
                        </div>
                    )}

                    {corrige.length !== 0 && (
                        <div>
                            {this.container()}
                            <h2 className="mb-3">Corrigé</h2>
                            {corrige.map((data) => (
                                <DisplayUploadingFile key={data.id} grade={this.state.permission} user={this.props.user} url={this.props.match.url} data={data} styleD={{ color: 'white', backgroundColor: Color[0] }} remove={this.validateRemove} />
                            ))}
                        </div>
                    )}

                    {aide.length !== 0 && (
                        <div>
                            {this.container()}
                            <h2 className="mb-3">Aide</h2>
                            {aide.map((data) => (
                                <DisplayUploadingFile key={data.id} grade={this.state.permission} user={this.props.user} url={this.props.match.url} data={data} styleD={{ color: 'white', backgroundColor: Color[6] }} remove={this.validateRemove} />
                            ))}
                        </div>
                    )}

                    {DM.length !== 0 && (
                        <div>
                            {this.container()}
                            <h2 className="mb-3">DM</h2>
                            {DM.map((data) => (
                                <DisplayUploadingFile key={data.id} grade={this.state.permission} user={this.props.user} url={this.props.match.url} data={data} styleD={{ color: 'white', backgroundColor: Color[8] }} remove={this.validateRemove} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default DisplayClass