import React from 'react'
import DisplayUploadingFile from './DisplayUploadingFile'

//import request from '../../actions/httpRequest'

import add_icon from '../../assets/icons/add-icon.png'

class DisplayClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPage: [],
            requestStatusDataPage: false
        }
    }

    componentDidMount() {
        document.title = `Charlinfo | ${this.props.location.state.classNameEnter}`;
        /**request(`/file${this.props.match.url}/get`)
            .then((data) => {
                if (data)
                    this.setState({ dataPage: data, requestStatusDataPage: true })
            })
*/
    }

    render() {
        var cours = [];
        var exercice = [];
        var corrige = [];
        var aide = []

        if (this.state.dataPage.request !== null) {
            cours = this.state.dataPage.filter(data => data.type === "Cours");
            exercice = this.state.dataPage.filter(data => data.type === "Exercice");
            corrige = this.state.dataPage.filter(data => data.type === "Corrigé");
            aide = this.state.dataPage.filter(data => data.type === "Aide");
        }
        return (
            <div className="d-flex flex-column">
                <h1 className="text-center m-3">{this.props.location.state.classNameEnter}</h1>
                <a href={`${this.props.match.url}/add`} className="mx-auto mb-3 add-icon"><img src={add_icon} alt="add icon" style={{ width: 50 }} /></a>
                <small className="text-center mb-3">Ajouter des cours, exercices, corrigés, aides</small>

                {this.state.dataPage.text && (
                    <p className="text-center">{this.state.dataPage.text}</p>
                )}

                {!this.state.requestStatusDataPage && (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                        </div>
                    </div>
                )}

                <div className="displayClass">

                    {cours.length !== 0 && (
                        <div className="flex-column m-3">
                            <h2 className="mb-3">Cours</h2>
                            {cours.map((data) => (
                                <DisplayUploadingFile key={data.id} data={data} styleD="text-white bg-secondary" />
                            ))}
                        </div>
                    )}


                    {exercice.length !== 0 && (
                        <div className="flex-column m-3">
                            <h2 className="mb-3">Exercice</h2>
                            {exercice.map((data) => (
                                <DisplayUploadingFile key={data.id} data={data} styleD="text-white bg-info" />
                            ))}
                        </div>
                    )}



                    {corrige.length !== 0 && (
                        <div className="flex-column m-3">
                            <h2 className="mb-3">Corrigé</h2>
                            {corrige.map((data) => (
                                <DisplayUploadingFile key={data.id} data={data} styleD="text-white bg-success" />
                            ))}
                        </div>
                    )}


                    {aide.length !== 0 && (
                        <div className="flex-column m-3">
                            <h2 className="mb-3">Aide</h2>
                            {aide.map((data) => (
                                <DisplayUploadingFile key={data.id} data={data} styleD="text-white bg-primary" />

                            ))}
                        </div>
                    )}

                </div>
            </div>
        )
    }
}

export default DisplayClass