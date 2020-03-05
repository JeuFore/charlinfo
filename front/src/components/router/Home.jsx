import React from 'react'
import changelog from '../../actions/changelog'
import { RequestStatus } from '../../utils/consts'

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
            <div className="m-5">
                <h1 className="text-center m-4">Accueil</h1>
                {this.state.requestStatus === RequestStatus.Getting && (
                    <div className="text-center fixed-center">
                        <div className="spinner-border" role="status">
                        </div>
                    </div>
                )}

                {this.state.requestStatus === RequestStatus.Error && (
                    <h3 className="text-center">Erreur de chargement</h3>
                )}

                <h2 className="my-4">Changelog</h2>

                {this.state.requestStatus === "Success" && this.state.data.length > 0 && (
                    this.state.data.map((data) => (
                        <div key={data.title}>
                            <h4>{data.title}</h4>
                            <ul className="list-group list-group-flush mb-4">
                                {data.description.map((description) => (
                                    <li key={description} className="list-group-item">{description}</li>
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