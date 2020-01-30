import React from 'react';
import InfoContainer from './containers/InfoContainer';
import Header from './components/Header';
import HistoryTable from './components/HistoryTable';
import Table from './components/Table';
import { useState, useEffect, useRef } from 'react';
import './App.css';
import { Link, Switch, Route } from 'react-router-dom';

function App() {
   const [portfolio, setPortfolio] = useState([]);
   const [savedProfits, setSavedProfits] = useState([]);

   return (
      <div>
         <Header setPortfolio={setPortfolio}/>
         <div className='mainPage'>
            <Switch>
               <Route
                  path='/'
                  exact
                  render={() => {
                     return <InfoContainer setPortfolio={setPortfolio} />;
                  }}
               />
               <Route
                  path='/table'
                  exact
                  render={() => {
                     return <Table savedProfits={savedProfits} setSavedProfits={setSavedProfits} portfolio={portfolio} />;
                  }}
               />
            </Switch>
            <HistoryTable savedProfits={savedProfits}/>
         </div>
      </div>
   );
}

export default App;
