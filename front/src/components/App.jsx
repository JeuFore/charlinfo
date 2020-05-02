import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import user from '../actions/user'
import { RequestStatus } from '../utils/consts'

import Home from './router/Home'
import AddChangelog from './router/AddChangelog'
import Navigation from './navigation/Navigation'
import Profile from './router/Profile'
import Connection from './account/Connection'
import NotificationPage from './router/Notification'

import SemesterPage from './semester/SemesterPage'
import AddSemester from './semester/AddSemester'
import ClassPage from './class/ClassPage'
import AddClass from './class/AddClass'

import { Notification } from 'rsuite'

const URL = 'wss://glafore.ddns.net/websocket'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestStatus: RequestStatus.Getting
    }
    this.disconnect = this.disconnect.bind(this);
    this.DisconnectPage = this.DisconnectPage.bind(this);
  }

  ws = new WebSocket(URL)

  componentDidMount() {
    try {
      this.ws.onopen = () => {
        // on connecting, do nothing but log it to the console
        console.log('connected');

        let test = localStorage.getItem('eK#*iZ#Am5nqfo@Xk36&2')
        if (test)
          this.ws.send(test);

      }

      this.ws.onmessage = evt => {
        // on receiving a message, add it to the list of messages

        let data = JSON.parse(evt.data);

        Notification["info"]({
          title: data.message.title,
          duration: 0,
          description: (
            <div>
              <p style={{ whiteSpace: 'pre-line' }} >{data.message.description}</p>
              {data.id === 1 && (
                <div>
                  <p style={{ whiteSpace: 'pre-line' }} >Date : {new Date(data.message.date).toLocaleDateString("fr-FR")}, {new Date(data.message.date).toLocaleTimeString('fr-FR')}</p>
                  <div className="d-flex justify-content-around mt-3" style={{ marginLeft: "-34px" }}>
                    <button type="button" className="btn btn-success ">Accéder</button>
                    <button type="button" className="btn btn-danger">Effacer</button>
                  </div>
                </div>
              )}
            </div>
          )
        });
      }

      this.ws.onclose = () => {
        console.log('disconnected');
      }

    } catch (error) {
      console.log(error)
    }
  }

  NoJSXPage() {
    document.title = "charlinfo | Not Found"
    return (
      <div className="text-center">
        <div className="fixed-center">
          <img src={require('../assets/icons/error.png')} alt="Icon error" style={{ width: 256 }} />
        </div>
        <h2 className="fixed-center">Page Not Found</h2>
      </div>
    );
  }

  disconnect() {
    user.disconnect(this.state).then((data) => this.setState(data));
  }

  DisconnectPage() {
    if (this.state.requestStatus === RequestStatus.Getting)
      return (
        <div className="text-center fixed-center">
          <div className="spinner-border" role="status">
          </div>
        </div>
      )
    return null
  }

  render() {
    if (window.location.pathname === '/disconnect')
      this.disconnect();
    return (
      <Router>
        <Navigation />
        <Switch>
          <Route path='/connexion' component={() => <Connection register="responsive-register" />} />
          <Route path='/register' component={() => <Connection />} />
          <Route path='/NoPageFound' component={this.NoJSXPage} />

          {user.isConnected ? (
            <Switch>
              <Route path='/home/add' component={AddChangelog} />
              <Route path='/home' component={Home} />
              <Route path='/disconnect' component={this.NoJSXPage} />
              <Route path='/notification' component={NotificationPage} />
              <Route path='/profile/:user' component={Profile} />
              <Route path={`/:s1/:class/add`} component={AddClass} />
              <Route path={`/:s1/add`} component={AddSemester} />
              <Route path={`/:s1/:class`} component={ClassPage} />

              <React.Fragment>
                <Route path={`/S1`} component={SemesterPage} />
                <Route path={`/S2`} component={SemesterPage} />
                <Route path={`/S3`} component={SemesterPage} />
                <Route path={`/S4`} component={SemesterPage} />
              </React.Fragment>

            </Switch>
          )
            : <Redirect path='' to='/connexion' />
          }

        </Switch>
      </Router>
    );
  }
}

export default App