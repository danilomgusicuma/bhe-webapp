import React, { useState } from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Login from './pages/Login'
import Layout from './layout/Admin';

const Routes = () => {
  const [user,setUser] = useState()
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login"/>
        </Route>
        <Route path="/login">
          <Login setUser={setUser}/>
        </Route>
        <Route path="/app">
          <Layout user={user}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
