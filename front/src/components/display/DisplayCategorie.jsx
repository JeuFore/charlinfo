import React from 'react'
import { Link } from "react-router-dom";

class DisplayCategorie extends React.Component {
    render() {
        return (
            <div className="card mb-5 displayUploading" >
                <h5 className="card-header">{this.props.data.title}</h5>
                <div className="card-body">
                    <div className="card-text border-bottom mb-3">
                        <b>Description :</b>
                        <br />
                        <br />
                        <p>{this.props.data.description}</p>
                    </div>
                    <p>Professeur(s) : <b>{this.props.data.creator}</b></p>

                    <Link to={{
                        pathname: this.props.link,
                        state: {
                            classNameEnter: this.props.data.title
                        }
                    }}><div className="btn btn-primary" >Accéder au cours</div></Link>
                </div>
            </div>
        )
    }
}

export default DisplayCategorie