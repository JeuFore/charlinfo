import React from 'react'
import fileClass from '../../actions/fileClass'
import config from '../../utils/config'

import remove_icon from '../../assets/icons/cancel.png'
import arrow from '../../assets/icons/arrow-pointing-to-right.png'

const DisplayUploadingFile = (props) => {
    async function deleteClass(event) {
        event.preventDefault();
        const { requestStatus } = await fileClass.delete({}, props.url, { path: props.data.file });
        if (requestStatus === "Success")
            window.location.reload()
    }
    return (
        <div className="card-design mb-4" style={props.styleD}>
            <div>
                <h5>{props.data.title}</h5>

                <p style={{ whiteSpace: 'pre-line' }} className="description">{props.data.description}</p>

                <p className="creator">Fait par : <b>{props.data.creator}</b></p>

                <p><b>Date :</b> {props.data.release_date}</p>

                <a href={`${config.localApiUrl}/file${props.url}/download/?path=${props.data.file}`}>
                    <div className="download_button">
                        <p>Download</p>
                        <div className="icon"><img src={arrow} alt="arrow" /></div>
                    </div>
                </a>
            </div>

            {((props.data.creator === props.user) || (props.grade)) && (
                <button onClick={deleteClass} className="remove-bar"><img src={remove_icon} alt="remove icon" width="16px"></img></button>
            )}

        </div>

        /**
                <div className="card mb-5">
            <h5 className="card-header" style={props.styleD}>{props.data.title}</h5>
            <div className="card-body">
                <div className="card-text border-bottom mb-3">
                    <b>Description :</b>
                    <br />
                    <br />
                    <p style={{ whiteSpace: 'pre-line' }}>{props.data.description}</p>
                </div>
                <p className="m-0 w-auto">Fait par : <b>{props.data.creator}</b></p>
            </div>
            <div className="card-footer"><b>Date :</b> {props.data.release_date}</div>

            {((props.data.creator === props.user) || (props.grade)) && (
                <button onClick={deleteClass} className="btn btn-danger delete-button" style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>Supprimer</button>
            )}

            <a href={`${config.localApiUrl}/file${props.url}/download/?path=${props.data.file}`} className="btn" style={props.styleD}>Download</a>

        </div>
         */

    )
}

export default DisplayUploadingFile