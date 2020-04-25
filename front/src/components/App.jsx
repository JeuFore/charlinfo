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

import SemesterPage from './semester/SemesterPage'
import AddSemester from './semester/AddSemester'
import ClassPage from './class/ClassPage'
import AddClass from './class/AddClass'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestStatus: RequestStatus.Getting
    }
    disconnect = disconnect.bind(this)
    DisconnectPage = DisconnectPage.bind(this)
  }

  render() {
    if (window.location.pathname === '/disconnect')
      disconnect();
    return (
      <Router>
        <Navigation />
        <Switch>
          <Route path='/connexion' component={() => <Connection register="responsive-register" />} />
          <Route path='/register' component={() => <Connection />} />
          <Route path='/NoPageFound' component={NoJSXPage} />

          {user.isConnected ? (
            <Switch>
              <Route path='/home/add' component={AddChangelog} />
              <Route path='/home' component={Home} />
              <Route path='/disconnect' component={NoJSXPage} />
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

function NoJSXPage() {
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

function disconnect() {
  user.disconnect(this.state).then((data) => this.setState(data));
}

function DisconnectPage() {
  if (this.state.requestStatus === RequestStatus.Getting)
    return (
      <div className="text-center fixed-center">
        <div className="spinner-border" role="status">
        </div>
      </div>
    )
  return null
}

export default App