import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import user from '../../actions/user'

import logo from "../../assets/icons/home-icon.png"
import profile from "../../assets/icons/user-icon.png"

class Navigation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-info">
                <Link to='/home' className="navbar-brand"><img width="30" className="logo mr-3" src={logo} alt="Home Icon" />Charlinfo</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="true" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <div className="navbar-nav mr-auto">
                        <NavLink to='/S1' className="nav-link">S1</NavLink>
                        <NavLink to='/S2' className="nav-link">S2</NavLink>
                        <NavLink to='/S3' className="nav-link">S3</NavLink>
                        <NavLink to='/S4' className="nav-link">S4</NavLink>
                    </div>
                    <div className="navbar-right-text py-2">
                        <a href='/disconnect' className="mb-3 mr-3">Deconnexion</a>
                        <Link to={`/profile/${user.isConnected}`}>Compte<img src={profile} alt="Profil icon" style={{ width: 32, marginLeft: 15 }} /></Link>
                    </div>
                </div>
            </nav>
        );
    }
}
export default Navigation;