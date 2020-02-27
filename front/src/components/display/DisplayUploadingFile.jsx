import React from 'react'

const DisplayUploadingFile = (props) => {
    return (
        <div className="card mb-5 displayUploading">
            <h5 className={`card-header ${props.styleD}`}>{props.data.title}</h5>
            <div className="card-body">
                <div className="card-text border-bottom mb-3">
                    <b>Description :</b>
                    <br />
                    <br />
                    <p>{props.data.description}</p>
                </div>
                <p className="m-0">Fait par : <b>{props.data.creator}</b></p>
            </div>
            <div className="card-footer"><b>Date :</b> {props.data.release_date}</div>
            <a href="/null" download="#" className={`btn ${props.styleD}`} style={{ color: "white", borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>Download</a>
        </div>
    )
}

export default DisplayUploadingFile