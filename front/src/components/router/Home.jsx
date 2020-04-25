import React from 'react'
import { Link } from 'react-router-dom'
import changelog from '../../actions/changelog'
import { RequestStatus } from '../../utils/consts'

import add_icon from '../../assets/icons/add-icon.png'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestStatus: RequestStatus.Getting
        }
    }

    componentDidMount() {
        document.title = 'Charlinfo | Home';
        changelog.get(this.state).then((data) => this.setState({ requestStatus: data.requestStatus }))
    }

    render() {
        return (
            <div className="container">
                <h1 className="text-center m-4">Accueil</h1>
                {this.state.requestStatus === RequestStatus.Getting && (
                    <div className="text-center fixed-center">
                        <div className="spinner-border" role="status">
                        </div>
                    </div>
                )}

                <div className="adding-zone">
                    <Link to={`${this.props.match.url}/add`} className="add-icon"><img src={add_icon} alt="add icon" /></Link>
                    <small className="text-center mb-3">Ajouter un changelog</small>
                </div>

                {this.state.requestStatus === RequestStatus.Error && (
                    <h3 className="text-center">Erreur de chargement</h3>
                )}

                <h2 className="my-4">Changelog</h2>

                {this.state.requestStatus === "Success" && this.state.data.length > 0 && (
                    this.state.data.map((data) => (
                        <div key={data.nom} className="changelog p-4">
                            <h4 className="border-bottom pb-2">{data.nom} ({(new Date(data.date)).toLocaleDateString("fr-FR")})</h4>
                            <ul className="changelog_list">
                                {data.description.map((description) => (
                                    <li key={description.des} className="">{description.des}</li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
            </div>
        )
    }
}

export default Home