import React from 'react'
import { Link } from "react-router-dom";
import fileSemester from '../../actions/fileSemester'

const DisplayCategorie = (props) => {
    async function deleteClass(event) {
        event.preventDefault();
        const { requestStatus } = await fileSemester.delete({}, props.link.replace(`/${props.data.link}`, ""), { link: props.data.link });
        if (requestStatus === "Success")
            window.location.reload()
    }
    console.log(props)
    return (
        <div className="card mb-5 displayUploading" >
            <h5 className="card-header">{props.data.title}</h5>
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
                }}><div className="btn btn-primary" >Accéder au cours</div></Link>
            </div>

            <button onClick={deleteClass}>Supprimer</button>

        </div>
    )
}

export default DisplayCategorie