import React from 'react';
import InfoContainer from './containers/InfoContainer'
import Header from './components/Header'
import Table from './components/Table'
import { useState, useEffect, useRef } from 'react';
import './App.css';
import { Link, Switch, Route } from 'react-router-dom';

function App() {
  const [portfolio, setPortfolio] = useState([])
  

  return (
    <div>
      
      <Header />
      <div class="mainPage">
      <Switch>
        <Route path="/" exact render ={() => {
          return <InfoContainer setPortfolio={setPortfolio} />
        }}/>
        <Route path="/table" exact render={() => {
          return <Table portfolio={portfolio} />
        }} />
      </Switch>
      </div>
    </div>
  );
}

export default App;
