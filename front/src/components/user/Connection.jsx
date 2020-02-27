import React from 'react'
import axios from 'axios'

class Connection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            register: "responsive-register",
            username: "",
            password: "",
            userError: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.callAPI = this.callAPI.bind(this)
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.callAPI();
    }

    async callAPI() {

        try {
            const { data } = await axios.post('http://localhost:1443/api/account/login', {
                username: this.state.username,
                password: this.state.password
            })
            console.log(data)
            window.location.replace("/profile")
        } catch (error) {
            this.setState({
                userError: error.response.data.text
            })
        }
    }

    componentDidMount() {
        document.title = `Charlinfo | Connexion`;
    }
    render() {
        return (
            <div className="d-flex justify-content-center mt-5">
                {this.state.register === "responsive-register" && (
                    <form className="p-4 m-5 login-component rainbow bg-success d-flex flex-column justify-content-center" onSubmit={this.handleSubmit}>
                        <h1 className="mb-3 text-center">Connexion</h1>
                        <div className="d-flex flex-column">
                            <input type="username" placeholder="Nom d'utilisateur" onChange={this.handleInputChange} name="username" />
                            <input type="password" placeholder="Mot de passe" onChange={this.handleInputChange} name="password" />
                        </div>
                        <input type="submit" className="btn btn-primary" value="Se connecter" />
                        <label className="responsive-register">Pas encore inscrit, <a href="#register" >Go s'inscrire sur Charlinfo</a></label>
                    </form>
                )}

                <h1>{this.state.userError}</h1>

                <form className={`p-4 m-5 login-component rainbow bg-success ${this.state.register}`}>
                    <h1 className="mb-3 text-center">Inscription</h1>
                    <div className="d-flex flex-column">
                        <input type="username" placeholder="Nom d'utilisateur" />
                        <input type="name" placeholder="Nom" />
                        <input type="name" placeholder="Prénom" />
                        <select className="form-control m-3 w-auto">
                            <option>DUT Informatique</option>
                        </select>
                        <input type="password" placeholder="Mot de passe" />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Se connecter" />
                </form>

            </div>
        )
    }
}

export default Connection