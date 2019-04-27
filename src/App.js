import React from 'react';
import './App.css';
import {HashRouter, Switch, Route} from 'react-router-dom'

import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import Behavior from './components/Behavior/Behavior'
import Settings from './components/Settings/Settings'
import Editor from './components/Editor/Editor'
import New from './components/New/New'



function App() {
  return (
    <HashRouter>
      <Switch>
        <Route component={Login} path='/login'/>
        <Route component={Dashboard} path='/' exact/>
        <Route component={New} path='/student/new'/>
        <Route component={Behavior} path='/student/:id'/>
        <Route component={Settings} path='/settings'/>
        <Route component={Editor} path='/editor/:id'/>
      </Switch>
    </HashRouter>
  );
}

export default App;
