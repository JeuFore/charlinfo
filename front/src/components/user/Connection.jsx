import React from 'react'
import account from '../../actions/account'
import { RequestStatus } from '../../utils/consts'

class Connection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            name: "",
            first_name: "",
            formation: "DUT Informatique",
            password: "",
            userError: "",
            requestStatus: RequestStatus.Getting
        };

        this.inputChange = this.inputChange.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
        this.signupSubmit = this.signupSubmit.bind(this);
    }

    inputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    loginSubmit(event) {
        event.preventDefault();
        account.login(this.state, {
            username: this.state.username,
            password: this.state.password
        }).then((data) => this.setState(data))
    }

    signupSubmit(event) {
        event.preventDefault();
        account.signup(this.state, {
            username: this.state.username,
            name: this.state.name,
            first_name: this.state.first_name,
            formation: this.state.formation,
            password: this.state.password,
        }).then((data) => this.setState(data))
    }

    componentDidMount() {
        if (this.props.register)
            document.title = `Charlinfo | Connexion`;
        else
            document.title = `Charlinfo | Inscription`;
    }
    render() {
        if (this.state.requestStatus === RequestStatus.Success) {
            account.token(this.state.username);
            window.location.replace('/home');
        }
        return (

            <div className="d-flex justify-content-center mt-5">
                {this.props.register && (
                    <form className="p-4 m-5 login-component rainbow bg-success d-flex flex-column justify-content-center" onSubmit={this.loginSubmit}>
                        <h1 className="m-3 text-center">Connexion</h1>
                        <div className="d-flex flex-column">
                            <input type="username" placeholder="Nom d'utilisateur" onChange={this.inputChange} name="username" />
                            <input type="password" placeholder="Mot de passe" onChange={this.inputChange} name="password" />
                        </div>
                        <input type="submit" className="btn btn-primary" value="Se connecter" />
                        <label className="responsive-register p-3">Pas encore inscrit, <a href="/register">Go s'inscrire sur Charlinfo</a></label>
                    </form>
                )}

                <h1>{this.state.userError}</h1>

                <form className={`p-4 m-5 login-component rainbow bg-success text-center ${this.props.register}`} onSubmit={this.signupSubmit}>
                    <h1 className="m-3 text-center">Inscription</h1>
                    <div className="d-flex flex-column">
                        <input type="username" placeholder="Nom d'utilisateur" onChange={this.inputChange} name="username" />
                        <input type="name" placeholder="Nom" onChange={this.inputChange} name="name" />
                        <input type="first_name" placeholder="Prénom" onChange={this.inputChange} name="first_name" />
                        <select className="form-control m-3 w-auto" onChange={this.inputChange} name="formation">
                            <option value="DUT Informatique">DUT Informatique</option>
                        </select>
                        <input type="password" placeholder="Mot de passe" onChange={this.inputChange} name="password" />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Se connecter" />
                </form>

            </div>
        )
    }
}

export default Connection