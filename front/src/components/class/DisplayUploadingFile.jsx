import React from 'react'
import fileClass from '../../actions/fileClass'
import config from '../../utils/config'

const DisplayUploadingFile = (props) => {
    async function deleteClass(event) {
        event.preventDefault();
        const { requestStatus } = await fileClass.delete({}, props.url, { path: props.data.file });
        if (requestStatus === "Success")
            window.location.reload()
    }
    return (
        <div className="card mb-5">
            <h5 className={`card-header ${props.styleD}`}>{props.data.title}</h5>
            <div className="card-body">
                <div className="card-text border-bottom mb-3">
                    <b>Description :</b>
                    <br />
                    <br />
                    <p style={{ whiteSpace: 'pre-line' }}>{props.data.description}</p>
                </div>
                <p className="m-0 w-auto">Fait par : <b>{props.data.creator}</b></p>
                <a href={`${config.localApiUrl}/file${props.url}/download/?path=${props.data.file}`} className={`btn mt-3 ${props.styleD}`}>Download</a>
            </div>
            <div className="card-footer"><b>Date :</b> {props.data.release_date}</div>

            <a href={`${config.localApiUrl}/file${props.url}/download/?path=${props.data.file}`} className={`btn mt-3 ${props.styleD}`}>Download</a>

            {((props.data.creator === props.user) || (props.grade)) && (
                <button onClick={deleteClass} className="btn btn-danger delete-button">Supprimer</button>
            )}
        </div>
    )
}

export default DisplayUploadingFile