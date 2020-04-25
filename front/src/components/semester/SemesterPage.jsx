import React from 'react'
import { Link } from 'react-router-dom'
import DisplayCategorie from './DisplayCategorie'
import fileSemester from '../../actions/fileSemester'
import { RequestStatus, UserPerm } from '../../utils/consts'
import user from '../../actions/user'

import add_icon from '../../assets/icons/add-icon.png'

class SemesterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestStatus: RequestStatus.Getting,
        }
        this.sortChange = this.sortChange.bind(this);
        this.informatique = [];
        this.general = [];
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

                <select className="form-control" onChange={this.sortChange} name="type">
                    <option value="null">Trier par ...</option>
                    <option value="title">Titre</option>
                    <option value="number">Nombres de cours</option>
                    <option value="description">Description</option>
                    <option value="professor">Professeurs</option>
                </select>

                <div className="s1_container mt-4">
                    <div className="s1_col">
                        <h3 className="mb-3 font-weight-bold">UE Informatique</h3>
                        {this.informatique.map((data) => (
                            <div className="displaycat" key={data.link}>
                                <DisplayCategorie data={data} link={`${this.props.match.url}/${data.link}`} grade={this.state.perm} />
                            </div>
                        ))}
                    </div>
                    <div className="s1_col">
                        <h3 className="mb-3 mt-5 font-weight-bold">UE Générale</h3>
                        {this.general.map((data) => (
                            <div className="displaycat" key={data.link}>
                                <DisplayCategorie data={data} link={`${this.props.match.url}/${data.link}`} grade={this.state.perm} />
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