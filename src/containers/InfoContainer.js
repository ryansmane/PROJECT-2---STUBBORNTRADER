import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Table from '../components/Table.js';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const key = process.env.REACT_APP_KEY;

const InfoContainer = props => {
   const [quantity, setQuantity] = useState('0');
   const [startDate, setStartDate] = useState('');
   const [actualDate, setActualDate] = useState('');
   const [symbol, setSymbol] = useState('');
   const [counter, setCounter] = useState([1]);
   const [portfolio, setPortfolio] = useState([]);
   const [open, setOpen] = useState(0);
   const [close, setClose] = useState(0);
   const [sharesOwned, setSharesOwned] = useState(0);
   const [purchases, setPurchases] = useState(0);
   const [frequency, setFrequency] = useState('');

   const formatDate = date => {
      const map = {
         Jan: '01',
         Feb: '02',
         Mar: '03',
         Apr: '04',
         May: '05',
         Jun: '06',
         Jul: '07',
         Aug: '08',
         Sep: '09',
         Oct: '10',
         Nov: '11',
         Dec: '12'
      };
      return (
         date.toString().split(' ')[3] +
         '-' +
         map[date.toString().split(' ')[1]] +
         '-' +
         date.toString().split(' ')[2]
      );
   };

   const handleDropDown = e => {
      console.log(e.target.value);
      setFrequency(e.target.value);
   };
   const fetchAndSet = () => {
      console.log('button');
      fetch(
         `https://sandbox.tradier.com/v1/markets/history?symbol=${symbol.toUpperCase()}&interval=daily&start=${formatDate(
            startDate
         )}`,
         {
            headers: {
               Accept: 'application/json',
               Authorization: `Bearer ${key}`
            }
         }
      )
         .then(res => res.json())
         .then(res => {
            console.log(res);
            var fractionalsOwned = 0;
            var count = 0;
            var date = res.history.day[0].date;

            var freq;
            switch (frequency) {
               case 'daily':
                  freq = 1;
                  break;
               case 'weekly':
                  freq = 5;
                  break;
               case 'monthly':
                  freq = 30;
                  break;
               default:
                  freq = 1;
            }

            for (let i = 0; i < res.history.day.length; i += freq) {
               count++;
               fractionalsOwned +=
                  parseInt(quantity) / parseInt(res.history.day[i].open);
            }
            setActualDate(date);
            setPurchases(count);
            setSharesOwned(fractionalsOwned);
            setOpen(res.history.day[0].open);
            setClose(res.history.day[res.history.day.length - 2].close);

            let portEntry = {
               quantity: quantity,
               startDate: actualDate,
               symbol: symbol,
               open: open,
               close: close,
               sharesOwned: sharesOwned,
               purchases: purchases
            };
            let portfolioCopy = portfolio.slice(0);
            portfolioCopy.push(portEntry);
            setPortfolio(portfolioCopy);
            let counterCopy = counter.slice(0, counter[counter.length - 1]);
            let last = counterCopy[counterCopy.length - 1] + 1;
            counterCopy.push(last);
            setCounter(counterCopy);
         });
   };

   useEffect(() => {
      console.log('effect');
      if (portfolio.length > 0) {
         fetch(
            `https://sandbox.tradier.com/v1/markets/history?symbol=${symbol.toUpperCase()}&interval=daily&start=${formatDate(
               startDate
            )}`,
            {
               headers: {
                  Accept: 'application/json',
                  Authorization: `Bearer rE7f2NeTyBINSPSy0LmzZql5Ak8m`
               }
            }
         )
            .then(res => res.json())
            .then(res => {
               var fractionalsOwned = 0;
               var count = 0;
               var date = res.history.day[0].date;
               var freq;
               switch (frequency) {
                  case 'daily':
                     freq = 1;
                     break;
                  case 'weekly':
                     freq = 5;
                     break;
                  case 'monthly':
                     freq = 30;
                     break;
                  default:
                     freq = 1;
               }

               for (let i = 0; i < res.history.day.length; i += freq) {
                  count++;
                  fractionalsOwned +=
                     parseInt(quantity) / parseInt(res.history.day[i].open);
               }
               setActualDate(date);
               setPurchases(count);
               setSharesOwned(fractionalsOwned);
               setOpen(res.history.day[0].open);
               setClose(res.history.day[res.history.day.length - 2].close);
            });

         let portfolioMime = portfolio.slice(0);
         portfolioMime[portfolioMime.length - 1].open = open;
         portfolioMime[portfolioMime.length - 1].close = close;
         portfolioMime[portfolioMime.length - 1].sharesOwned = sharesOwned;
         portfolioMime[portfolioMime.length - 1].purchases = purchases;
         portfolioMime[portfolioMime.length - 1].startDate = actualDate;
         setPortfolio(portfolioMime);
      }
   }, [counter]);

   return (
      <div>
         {counter.map((el, i) => {
            return (
               <form className="formcontainer" key={i}>
                  {i === 0? <div className="hadi comp">
                     Had I invested 
                     </div> : <div className="hadi comp">
                        And
                     </div> }
                     <div className="qinput comp">
                     $<input className='quantinput'
                        name='quantity'
                        placeholder='amount'
                        onChange={e => setQuantity(e.target.value)}
                     />($50?)
                  </div>
                  <div className='aday comp'>
                     every<select className='select' onChange={handleDropDown}>
                        <option value=''></option>
                        <option value='daily'>day</option>
                        <option value='weekly'>week</option>
                        <option value='monthly'>month</option>
                     </select> (week?)
                  </div>

                  <div className='in comp'>
                     in
                     
                     <input className="stock-input comp"
                        name='symbol'
                        placeholder='symbol'
                        onChange={e => setSymbol(e.target.value)}
                     />(AMZN, NFLX?)
                  </div>
                  <div className='startingon comp'>
                     starting on
                     
                     <DatePicker
                        placeholder={'use calendar'}
                        selected={startDate}
                        onChange={setStartDate}
                     />(01/01/2000?)
                     {/* <input
                        name='startDate'
                        onChange={e => setStartDate(e.target.value)}
                     /> */}
                  </div>
                  <div className="plus comp">
                  <button
                     type='submit'
                     onClick={e => {
                        e.preventDefault();
                        console.log(frequency);
                        fetchAndSet();
                        
                     }}
                  >
                     +
                  </button>
                  </div>
               </form>
            );
         })}

         <Link to='/table/'>
            <button onClick={props.setPortfolio(portfolio)}>
               What would I have today?
            </button>
         </Link>
      </div>
   );
};

export default InfoContainer;
