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
import Navigation from './navigation/Navigation'
import Profile from './router/Profile'
import Connection from './user/Connection'

import Semester from './router/Semester'
import DisplayClass from './display/DisplayClass'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestStatus: RequestStatus.Getting
    }
    disconnect = disconnect.bind(this)
    test = test.bind(this)
  }

  routeSemester() {
    var res = [];
    for (let i = 1; i < 5; i++) {
      res[i] = (
        <React.Fragment key={i}>
          <Route path={`/S${i}/:class/add`} component={NoJSXPage} />
          <Route path={`/S${i}/:class`} component={DisplayClass} />
          <Route path={`/S${i}`} component={Semester} />
        </React.Fragment>
      )
    }
    return res
  }

  render() {
    if (window.location.pathname === '/disconnect')
      disconnect()
    return (
      <Router>
        <Navigation />
        <Switch>
          <Route path='/connexion' component={() => <Connection register="responsive-register" />} />
          <Route path='/register' component={() => <Connection />} />

          {user.isConnected ? (
            <React.Fragment>
              <Route path='/home' component={Home} />
              <Route path='/disconnect' component={test} />
              <Route path='/profile/:user' component={Profile} />
              {this.routeSemester()}
            </React.Fragment>
          )
            : <Redirect path='/' to='/connexion' />
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

function test() {
  console.log(this.state);

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