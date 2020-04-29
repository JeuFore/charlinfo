import React from 'react'
import { Link } from "react-router-dom";

import arrow from '../../assets/icons/arrow-pointing-to-right.png'

import '../../style/test.css';

class DisplayCategorie extends React.Component {
    constructor(props) {
        super(props);
        this.deleteClass = this.deleteClass.bind(this);
    }

    async deleteClass(e) {
        e.preventDefault();
        this.props.remove(this.props.data.id);
    }

    render() {
        return (
            <Link className="round-card" to={this.props.id}>
                <div className="number-float" style={{ backgroundColor: this.props.data.color }}><h2>{this.props.data.number}</h2></div>
                <div className="round-card-text">
                    <div>
                        <h5>{this.props.data.title}</h5>
                        {this.props.grade && (
                            <button className="delete-button" onClick={this.deleteClass}>-</button>
                        )}
                    </div>
                    <p className="description" style={{ whiteSpace: 'pre-line' }}>{this.props.data.description}</p>
                    <p className="professor">
                        <b>Professeur(s) : </b>
                        {this.props.data.professor.map((data, index) => (
                            this.props.data.professor.length - 1 !== index
                                ? <span key={data.label}>{data.label}, </span>
                                : <span key={data.label}>{data.label}</span>
                        ))}
                    </p>
                    <img src={arrow} alt="" width="32px" />
                </div>
            </Link>

            /** 
            <div className="card" >
                <h5>{props.data.title}</h5>
                <div className="card-body">
                    <div className="card-text border-bottom mb-3">
                        <b>Description :</b>
                        <br />
                        <br />
                        <p style={{ whiteSpace: 'pre-line' }}>{props.data.description}</p>
                    </div>
                    <p>Professeur(s) : <b>{props.data.professor}</b></p>
    
                    <Link to={{
                        pathname: props.link,
                        state: {
                            classNameEnter: props.data.title
                        }
                    }}><div className="btn btn-primary">Accéder au cours</div></Link>
                </div>
    
                {props.grade && (
                    <button className="btn btn-danger delete-button" onClick={deleteClass}>Supprimer</button>
                )}
    
            </div>
            */
        )
    }
}

export default DisplayCategorie