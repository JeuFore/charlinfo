import React from 'react'
import config from '../../utils/config'

import remove_icon from '../../assets/icons/cancel.png'
import arrow from '../../assets/icons/arrow-pointing-to-right.png'

class DisplayUploadingFile extends React.Component {
    constructor(props) {
        super(props)
        this.deleteClass = this.deleteClass.bind(this);
    }

    async deleteClass(e) {
        e.preventDefault();
        this.props.remove(this.props.data.id);
    }
    
    render() {
        return (
            <div className="card-design mb-4" style={this.props.styleD}>
                <div>
                    <h5>{this.props.data.title}</h5>

                    <p style={{ whiteSpace: 'pre-line' }} className="description">{this.props.data.description}</p>

                    <p className="creator">Fait par : <b>{this.props.data.creator}</b></p>

                    <p><b>Date :</b> {this.props.data.release_date}</p>

                    <a href={`${config.localApiUrl}/file${this.props.url}/download/?path=${this.props.data.extension}`}>
                        <div className="download_button">
                            <p>Download</p>
                            <div className="icon"><img src={arrow} alt="arrow" /></div>
                        </div>
                    </a>
                </div>

                {((this.props.data.creator === this.props.user) || (this.props.grade)) && (
                    <button onClick={this.deleteClass} className="remove-bar"><img src={remove_icon} alt="remove icon" width="16px"></img></button>
                )}

            </div>

        )
    }
}

export default DisplayUploadingFile