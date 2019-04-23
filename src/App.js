import React from 'react';
import './App.css';
import {HashRouter, Switch, Route} from 'react-router-dom'

import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import Behavior from './components/Behavior/Behavior'
import Settings from './components/Settings/Settings'



function App() {
  return (
    <HashRouter>
      <Switch>
        <Route component={Login} path='/login'/>
        <Route component={Dashboard} path='/' exact/>
        <Route component={Behavior} path='/student/:id'/>
        <Route component={Settings} path='/settings'/>
      </Switch>
    </HashRouter>
  );
}

export default App;
