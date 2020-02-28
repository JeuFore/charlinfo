import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import user from '../actions/user'

import Home from './router/Home'
import Navigation from './navigation/Navigation'
import Profile from './router/Profile'
import Connection from './user/Connection'

import Semester from './router/Semester'
import DisplayClass from './display/DisplayClass'

import uploadingData from '../assets/bdd/uploadingData.json'
import dataClass from '../assets/bdd/dataClass.json'

class App extends Component {

  render() {
    return (
      <Router>
        <Navigation />

        <Switch>
          <Route path='/connexion' component={() => <Connection register="responsive-register" />} />
          <Route path='/register' component={() => <Connection />} />

          {user.isConnected ? (
            <React.Fragment>
              <Route path='/home' component={Home} />
              <Route path='/disconnect' component={user.disconnect} />
              <Route path='/profile/:user' component={Profile} />
              <Route path='/:semester/:class/add' component={Profile} />
              {dataClass.S1.map((data) => (
                <Route path={`/S1/${data.link}`} key={data.id} component={(props) => <DisplayClass {...props} dataPage={uploadingData[data.link]} />} />
              ))}
              {dataClass.S2.map((data) => (
                <Route path={`/S2/${data.link}`} key={data.id} component={(props) => <DisplayClass {...props} dataPage={uploadingData[data.link]} />} />
              ))}
              {dataClass.S3.map((data) => (
                <Route path={`/S3/${data.link}`} key={data.id} component={(props) => <DisplayClass {...props} dataPage={uploadingData[data.link]} />} />
              ))}
              {dataClass.S4.map((data) => (
                <Route path={`/S4/${data.link}`} key={data.id} component={(props) => <DisplayClass {...props} dataPage={uploadingData[data.link]} />} />
              ))}
              <Route path='/S1' component={() => <Semester dataClass={dataClass.S1} title='S1' />} />
              <Route path='/S2' component={() => <Semester dataClass={dataClass.S2} title='S2' />} />
              <Route path='/S3' component={() => <Semester dataClass={dataClass.S3} title='S3' />} />
              <Route path='/S4' component={() => <Semester dataClass={dataClass.S4} title='S4' />} />
            </React.Fragment>
          )
            : <Redirect path='/' to='/connexion' />
          }

          <Route path='/' component={NoJSXPage} />
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

export default App