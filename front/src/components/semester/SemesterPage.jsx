import React from 'react'
import { Link } from 'react-router-dom'
import DisplayCategorie from './DisplayCategorie'
import fileSemester from '../../actions/fileSemester'
import { RequestStatus, UserPerm } from '../../utils/consts'
import user from '../../actions/user'

import add_icon from '../../assets/icons/add-icon.png'
import alert from '../../assets/icons/alert-circle.svg'

class SemesterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestStatus: RequestStatus.Getting,
            deleteStatus: RequestStatus.Success
        }
        this.informatique = [];
        this.general = [];
        this.remove = '';
        this.sortChange = this.sortChange.bind(this);
        this.validateRemove = this.validateRemove.bind(this);
        this.removeChild = this.removeChild.bind(this);
        this.dismissRemove = this.dismissRemove.bind(this);
    }

    componentDidMount() {
        document.title = `Charlinfo | ${this.props.match.url.replace('/', '')}`;
        fileSemester.get(this.state, this.props.match.url).then((data) => {
            if (data.requestStatus === RequestStatus.Success) {
                this.informatique = data.data.filter(data => data.type === 1);
                this.general = data.data.filter(data => data.type === 2);
            }
            this.setState({ requestStatus: RequestStatus.Success });
        });
        user.permission({}, {
            grade: UserPerm.Admininstrator
        }).then(({ data }) => this.setState({ perm: data }));
    }

    sortChange(event) {
        if (this.state.requestStatus === RequestStatus.Success && event.target.value !== "null") {
            function compare(a, b) {
                if (event.target.value === "number")
                    return b[event.target.value].localeCompare(a[event.target.value])
                return a[event.target.value].localeCompare(b[event.target.value])
            }
            this.informatique.sort(compare);
            this.general.sort(compare);
            this.setState({ requestStatus: RequestStatus.Success });
        }
    }

    validateRemove(id) {
        this.remove = id;
        this.setState({ deleteStatus: RequestStatus.Getting });
    }

    dismissRemove() {
        this.setState({ deleteStatus: RequestStatus.Success });
    }

    async removeChild() {
        const { requestStatus } = await fileSemester.delete({}, this.props.location.pathname.replace("S", ""), { id: this.remove });
        if (requestStatus === RequestStatus.Success){
            let index = this.informatique.findIndex((element) => element.id === this.remove);
            this.informatique.splice(index, 1);
            index = this.general.findIndex((element) => element.id === this.remove);
            this.general.splice(index, 1);
        }
        this.dismissRemove();
    }

    render() {
        return (
            <div className="container mt-3">
                <h1 className="text-center mb-3">{this.props.match.url.replace('/', '')}</h1>

                {this.state.perm && (
                    <div className="adding-zone">
                        <Link className="add-icon" to={{
                            pathname: `${this.props.match.url}/add`,
                            state: {
                                Perm: this.state.perm
                            }
                        }}><img src={add_icon} alt="add icon" /></Link>
                        <small className="text-center mb-3">Ajouter des cours</small>
                    </div>
                )}

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

                <select className="form-control" onChange={this.sortChange} name="type">
                    <option value="null">Trier par ...</option>
                    <option value="title">Titre</option>
                    <option value="number">Nombres de cours</option>
                    <option value="description">Description</option>
                    <option value="professor">Professeurs</option>
                </select>

                <div className="s1_container mb mt-4">
                    <div className="s1_col">
                        <h3 className="mb-3 font-weight-bold">UE Informatique</h3>
                        {this.informatique.map((data) => (
                            <div className="displaycat" key={data.id}>
                                <DisplayCategorie data={data} id={`${this.props.match.url}/${data.id}`} grade={this.state.perm} remove={this.validateRemove} />
                            </div>
                        ))}
                    </div>
                    <div className="s1_col">
                        <h3 className="mb-3 mt-5 font-weight-bold">UE Générale</h3>
                        {this.general.map((data) => (
                            <div className="displaycat" key={data.id}>
                                <DisplayCategorie data={data} id={`${this.props.match.url}/${data.id}`} grade={this.state.perm} remove={this.validateRemove} />
                            </div>
                        ))}
                    </div>
                </div>

                {this.state.requestStatus === RequestStatus.Getting && (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                        </div>
                    </div>
                )}

            </div>
        )
    }
}

export default SemesterPage