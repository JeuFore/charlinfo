import React from 'react'
import account from '../../actions/account'
import { RequestStatus } from '../../utils/consts'

class Connection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestStatus: RequestStatus.Getting
        };
        this.username = "";
        this.name = "";
        this.first_name = "";
        this.formation = 1;
        this.password = "";
        this.inputChange = this.inputChange.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this);
        this.signupSubmit = this.signupSubmit.bind(this);
    }

    inputChange(event) {
        this[event.target.name] = event.target.value
    }

    loginSubmit(event) {
        event.preventDefault();
        this.props.ws(this.username);
        account.login({}, {
            username: this.username,
            password: this.password
        }).then((data) => {
            if (data.requestStatus === RequestStatus.Success) {
                account.token(this.username);
                this.props.ws(this.username, 2);
                this.props.history.push('/home');
            }
            else
                this.setState({ requestStatus: data.requestStatus });
        });
    }

    signupSubmit(event) {
        event.preventDefault();
        this.props.ws(this.state.username);
        account.signup({}, {
            username: this.state.username,
            name: this.state.name,
            first_name: this.state.first_name,
            formation: this.state.formation,
            password: this.state.password,
        }).then((data) => this.setState(data));
    }

    componentDidMount() {
        if (this.props.register)
            document.title = `Charlinfo | Connexion`;
        else
            document.title = `Charlinfo | Inscription`;
    }
    render() {
        return (
            <div className="d-flex justify-content-center mt-5">
                {this.props.register && (
                    <form className="p-4 m-5 login-component rainbow bg-success d-flex flex-column justify-content-center" onSubmit={this.loginSubmit}>
                        <h1 className="m-3 text-center">Connexion</h1>
                        <div className="d-flex flex-column">
                            <small className={`px-3 text-danger d-none R${this.state.requestStatus}`}>Requête invalide</small>
                            <input type="username" placeholder="Nom d'utilisateur" onChange={this.inputChange} name="username" className={`U${this.state.requestStatus}`} />
                            <small className={`px-3 text-danger d-none SU${this.state.requestStatus}`}>Utilisateur incorrect</small>
                            <small className={`px-3 text-danger d-none SN${this.state.requestStatus}`}>Vous n'êtes pas inscrit</small>
                            <input type="password" placeholder="Mot de passe" onChange={this.inputChange} name="password" className={`P${this.state.requestStatus}`} />
                            <small className={`px-3 text-danger d-none SP${this.state.requestStatus}`}>Mot de passe incorrect</small>
                        </div>
                        <input type="submit" className="btn btn-primary" value="Se connecter" />
                        <label className="responsive-register p-3">Pas encore inscrit, <a href="/register">Go s'inscrire sur Charlinfo</a></label>
                    </form>
                )}

                <form className={`p-4 m-5 login-component rainbow bg-success text-center ${this.props.register}`} onSubmit={this.signupSubmit}>
                    <h1 className="m-3 text-center">Inscription</h1>
                    <div className="d-flex flex-column">
                        <input type="username" placeholder="Nom d'utilisateur" onChange={this.inputChange} name="username" />
                        <input type="name" placeholder="Nom" onChange={this.inputChange} name="name" />
                        <input type="first_name" placeholder="Prénom" onChange={this.inputChange} name="first_name" />
                        <select className="form-control m-3 w-auto" onChange={this.inputChange} name="formation">
                            <option value="1">DUT Informatique</option>
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