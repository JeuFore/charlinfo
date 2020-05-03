import React from 'react'
import user from '../../actions/user'
import { RequestStatus } from '../../utils/consts'
import { Link } from 'react-router-dom'

import profile from "../../assets/icons/user-icon.png"
import register_icon from "../../assets/icons/id-card.png"
import uploading_icon from "../../assets/icons/uploading.png"
import support_icon from "../../assets/icons/support.png"
import logout_icon from "../../assets/icons/logout.png"

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestStatus: RequestStatus.Getting
        }
        this.data = [];
    }

    componentDidMount() {
        document.title = 'Charlinfo | Profile';
        user.get(this.state, this.props.match.params.user).then(({ requestStatus }) => this.setState({ requestStatus }));
    }

    render() {
        return (
            <div className="text-center mt-4">
                <svg className="mt-n5 responsive-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <linearGradient id="gradient1">
                        <stop offset="5%" stopColor="#0099ff" />
                        <stop offset="95%" stopColor="#e7008a" />
                    </linearGradient><path fill="#17a2b8" fillOpacity="1" d="M0,192L80,208C160,224,320,256,480,224C640,192,800,96,960,96C1120,96,1280,192,1360,240L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>

                {this.state.requestStatus === RequestStatus.Getting && (
                    <div className="text-center fixed-center">
                        <div className="spinner-border" role="status">
                        </div>
                    </div>
                )}

                {this.state.requestStatus === RequestStatus.Success && (
                    <div>
                        <img className="mb-3" src={profile} alt="Profile icon" width={100} />
                        <h3>{`${this.state.data.first_name} ${this.state.data.name}`}</h3>
                        <p className="text-muted">{this.data.type}</p>
                        <div className="mt-n5 responsive-svg">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                <path fill="url(#gradient1)" fillOpacity="1" d="M0,96L80,128C160,160,320,224,480,256C640,288,800,288,960,245.3C1120,203,1280,117,1360,74.7L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                <path fill="url(#gradient1)" fillOpacity="1" d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
                        </div>

                        <ul className="list-group list-group-flush responsive-ul">

                            <a className="text-body list-group-item d-flex align-items-center" href="/">
                                <img src={register_icon} alt="profil icon" style={styles.size_icon} />
                                <h5 className="m-0 ml-5">Inscription</h5>
                            </a>


                            <a className="text-body list-group-item d-flex align-items-center" href="/">
                                <img src={uploading_icon} alt="profil icon" style={styles.size_icon} />
                                <h5 className="m-0 ml-5">Fichier uploadés</h5>
                            </a>

                            <a className="text-body list-group-item d-flex align-items-center" href="/">
                                <img src={support_icon} alt="profil icon" style={styles.size_icon} />
                                <h5 className="m-0 ml-5">Support</h5>
                            </a>

                            <Link className="text-body list-group-item d-flex align-items-center" to="/disconnect">
                                <img src={logout_icon} alt="profil icon" style={styles.size_icon} />
                                <h5 className="m-0 ml-5">Déconnexion</h5>
                            </Link>
                        </ul>
                    </div>
                )}
            </div>
        )
    }
}

const styles = {
    size_icon: {
        width: 40
    }
}

export default Profile