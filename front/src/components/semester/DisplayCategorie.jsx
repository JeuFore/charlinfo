import React from 'react'
import { Link } from "react-router-dom";
import fileSemester from '../../actions/fileSemester'
import { RequestStatus } from '../../utils/consts'

import arrow from '../../assets/icons/arrow-pointing-to-right.png'

import '../../style/test.css';

const DisplayCategorie = (props) => {
    async function deleteClass(event) {
        event.preventDefault();
        const { requestStatus } = await fileSemester.delete({}, props.link.replace(`/${props.data.link}`, ""), { link: props.data.link });
        if (requestStatus === RequestStatus.Success)
            window.location.reload()
    }
    return (
        <Link className="round-card" to={{
            pathname: props.link,
            state: {
                classNameEnter: props.data.title,
                classId: props.data.id
            }
        }}>
            <div className="number-float" style={{backgroundColor: props.data.color}}><h2>{props.data.number}</h2></div>
            <div className="round-card-text">
                <div>
                    <h5>{props.data.title}</h5>
                    {props.grade && (
                        <button className="delete-button" onClick={deleteClass}>-</button>
                    )}
                </div>
                <p className="description" style={{ whiteSpace: 'pre-line' }}>{props.data.description}</p>
                <p className="professor"> <b>Professeur(s) :</b>{props.data.professor}</p>
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

export default DisplayCategorie