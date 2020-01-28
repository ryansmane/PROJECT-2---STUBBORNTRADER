import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Table from '../components/Table.js';
import { Link } from 'react-router-dom'

const key = process.env.REACT_APP_KEY;

const InfoContainer = props => {
   const [quantity, setQuantity] = useState(0);
   const [startDate, setStartDate] = useState('');
   const [symbol, setSymbol] = useState('');
   const [counter, setCounter] = useState([1]);
   const [portfolio, setPortfolio] = useState([]);
   const [open, setOpen] = useState(0);
   const [close, setClose] = useState(0)
   const [sharesOwned, setSharesOwned] = useState(0)
   const [purchases, setPurchases] = useState(0)
   console.log(portfolio, purchases)

   const fetchAndSet = () => {
      fetch(
         `https://sandbox.tradier.com/v1/markets/history?symbol=${symbol.toUpperCase()}&interval=daily&start=${startDate}`,
         {
            headers: {
               Accept: 'application/json',
               Authorization: `Bearer ${key}`
            }
         }
      )
         .then(res => res.json())
         .then(res => {
            var fractionalsOwned = 0;
            var count = 0;
            for (let i = 0; i < res.history.day.length; i += 5) {
               count++
               fractionalsOwned += parseInt(quantity) / parseInt(res.history.day[i].open)
            }
            setPurchases(count)
            setSharesOwned(fractionalsOwned)
            setOpen(res.history.day[0].open);
            setClose(
               res.history.day[res.history.day.length - 2]
                  .close
            );
            
            let portEntry = {
               quantity: quantity,
               startDate: startDate,
               symbol: symbol,
               open: open,
               close: close,
               sharesOwned: sharesOwned,
               purchases: purchases            
            };
            let portfolioCopy = portfolio.slice(0);
            portfolioCopy.push(portEntry);
            setPortfolio(portfolioCopy);
            let counterCopy = counter.slice(
               0,
               counter[counter.length - 1]
            );
            let last =
               counterCopy[counterCopy.length - 1] + 1;
            counterCopy.push(last);
            setCounter(counterCopy);
         });
   }


 
   useEffect(() => {
      if (portfolio.length > 0) {
         fetch(
            `https://sandbox.tradier.com/v1/markets/history?symbol=${symbol.toUpperCase()}&interval=daily&start=${startDate}`,
            {
               headers: {
                  Accept: 'application/json',
                  Authorization: `Bearer rE7f2NeTyBINSPSy0LmzZql5Ak8m`
               }
            }
         )
            .then(res => res.json())
            .then(res => {
               var fractionalsOwned=0;
               var count = 0;
               for (let i = 0; i < res.history.day.length; i+=5) {
                  count++
                  fractionalsOwned += parseInt(quantity) / parseInt(res.history.day[i].open)
               }
               setPurchases(count)
               setSharesOwned(fractionalsOwned)
               setOpen(res.history.day[0].open);
               setClose(res.history.day[res.history.day.length - 2].close);
            });
         
         let portfolioMime = portfolio.slice(0);
         portfolioMime[portfolioMime.length - 1].open = open;
         portfolioMime[portfolioMime.length - 1].close = close;
         portfolioMime[portfolioMime.length - 1].sharesOwned = sharesOwned;
         portfolioMime[portfolioMime.length - 1].purchases = purchases;
         setPortfolio(portfolioMime);
      }
   }, [counter]);

   return (
      <div>
         {counter.map((el, i) => {
            return (
               <form key={i}>
                  <label>
                     I want to invest
                     <input
                        name='quantity'
                        onChange={e => setQuantity(e.target.value)}
                     />
                  </label>
                  <label>
                     starting on
                     <input
                        name='startDate'
                        onChange={e => setStartDate(e.target.value)}
                     />
                  </label>
                  <label>
                     in
                     <input
                        name='symbol'
                        onChange={e => setSymbol(e.target.value)}
                     />
                  </label>
                  <button
                     type='submit'
                     onClick={e => {
                        e.preventDefault();
                        fetchAndSet()

                        
                     }}
                  >
                     Add Choice
                  </button>
               </form>
            );
         })}

         <Link to='/table/'><button onClick={props.setPortfolio(portfolio)}>Generate Portfolio</button></Link>
         
      </div>
   );
   
};

export default InfoContainer;
