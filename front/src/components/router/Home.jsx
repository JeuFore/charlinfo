import React from 'react'
import { httpRequest } from '../../actions/httpRequest';
import { Session } from '../../actions/Session';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changelog: [],
            requestStatusDataPage: "Unknown",
            httpRequest
        }
    }


    componentDidMount() {
        const httpClient = new httpRequest(new Session())
        document.title = 'Charlinfo | Home';
        httpClient.get("/api/changelog/get")
            .then(({ data, status }) => {
                this.setState({
                    changelog: data,
                    requestStatusDataPage: status
                })
            })
    }

    render() {
        return (
            <div className="m-5">
                <h1 className="text-center m-4">Accueil</h1>
                {this.state.requestStatusDataPage === "Unknown" && (
                    <div className="text-center fixed-center">
                        <div className="spinner-border" role="status">
                        </div>
                    </div>
                )}
                {this.state.requestStatusDataPage === 404 && (
                    <h3 className="text-center">Erreur de chargement</h3>
                )}
                {this.state.requestStatusDataPage === "Success" && (
                    this.state.changelog.map((data) => (
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