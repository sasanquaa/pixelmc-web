import React from 'react'
import {BrowserRouter, Route, Switch, browserHistory, IndexRedirect } from 'react-router-dom'
import IndexPage from './components/IndexPage'
import ChargePage from './components/ChargePage'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={IndexPage}></Route>
        <Route exact path='/napthe' component={ChargePage}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
