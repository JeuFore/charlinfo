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
            type: "null",
            perm: ''
        }
        this.inputChange = this.inputChange.bind(this);
    }

    componentDidMount() {
        document.title = `Charlinfo | ${this.props.match.url.replace('/', '')}`;
        fileSemester.get(this.state, this.props.match.url).then(({ requestStatus }) => this.setState({ requestStatus }));
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

        var informatique = [];
        var general = [];
        if (this.state.requestStatus === RequestStatus.Success) {
            informatique = this.state.data.filter(data => data.type === "Informatique");
            general = this.state.data.filter(data => data.type === "Général");
        }
        return (
            <div className="container mt-3">
                <h1 className="text-center mb-3">{this.props.match.url.replace('/', '')}</h1>
                <Link to={`${this.props.match.url}/add`} className="mx-auto mb-3 add-icon"><img src={add_icon} alt="add icon" style={{ width: 50 }} /></Link>
                <small className="text-center mb-3">Ajouter des cours, exercices, corrigés, aides</small>

                <select className="form-control m-3 w-auto" onChange={this.inputChange} name="type">
                    <option value="null">Trier par ...</option>
                    <option value="title">Titre</option>
                    <option value="description">Description</option>
                    <option value="professor">Professeurs</option>
                </select>

                <div className="s1_container">
                    <div className="s1_col">
                        <h3 className="text-center mb-3">UE Informatique</h3>
                        {informatique.map((data) => (
                            <DisplayCategorie data={data} link={`${this.props.match.url}/${data.link}`} key={data.link} grade={this.state.perm} />
                        ))}
                    </div>
                    <div className="s1_col">
                        <h3 className="text-center mb-3">UE Générale</h3>
                        {general.map((data) => (
                            <DisplayCategorie data={data} link={`${this.props.match.url}/${data.link}`} key={data.link} grade={this.state.perm}/>
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