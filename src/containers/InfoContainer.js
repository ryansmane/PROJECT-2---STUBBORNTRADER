import React from 'react';
import { useState, useEffect } from 'react';
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
  const [open, setOpen] = useState(0.0);
  const [close, setClose] = useState(0.0);
  const [sharesOwned, setSharesOwned] = useState(0.0);
  const [purchases, setPurchases] = useState(0.0);
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
    setFrequency(e.target.value);
  };

  const fetchAndSet = () => {
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

          if (!isNaN(res.history.day[i].open)) {
            fractionalsOwned +=
              parseFloat(quantity) / parseFloat(res.history.day[i].open);
          } else {
            fractionalsOwned += 0;
          }
        }
        setActualDate(date);
        setPurchases(count);
        setSharesOwned(parseFloat(fractionalsOwned));
        setOpen(res.history.day[0].open);
        setClose(res.history.day[res.history.day.length - 2].close);

        let portEntry = {
          quantity: quantity,
          startDate: actualDate,
          symbol: symbol,
          open: open,
          close: close,
          sharesOwned: sharesOwned,
          purchases: purchases,
          frequency: frequency
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
    if (portfolio.length > 0) {
      let portfolioMime = portfolio.slice(0);
      portfolioMime[portfolioMime.length - 1].open = open;
      portfolioMime[portfolioMime.length - 1].close = close;
      portfolioMime[portfolioMime.length - 1].sharesOwned = sharesOwned;
      portfolioMime[portfolioMime.length - 1].purchases = purchases;
      portfolioMime[portfolioMime.length - 1].startDate = actualDate;
      portfolioMime[portfolioMime.length - 1].frequency = frequency;
      setPortfolio(portfolioMime);
    }
  }, [counter]);

  return (
    <div className='main'>
      <form className='formcontainer'>
        {counter.map((el, i) => {
          return (
            <div className='form' key={i}>
              {i === 0 ? (
                <div className='hadi comp'>
                  <h1 className='had'>Had you invested:</h1>
                  <p className='tips'>
                    (Multiple entries are allowed, but you must click the plus
                    sign after completing each row)
                  </p>
                </div>
              ) : (
                <div></div>
              )}
              <div className='propercont'>
                <div className='qinput comp'>
                  $
                  <input
                    className='quantinput'
                    name='quantity'
                    type='text'
                    placeholder='Amount'
                    onChange={e => setQuantity(e.target.value)}
                  />
                  {i === 0 ? (
                    <span className='fifty comp'>(50?)</span>
                  ) : (
                    <span className='fifty comp'></span>
                  )}
                </div>
                <div className='aday comp'>
                  every
                  <select
                    className='select'
                    type='text'
                    onChange={handleDropDown}
                  >
                    <option value=''></option>
                    <option value='daily'>day</option>
                    <option value='weekly'>week</option>
                    <option value='monthly'>month</option>
                  </select>{' '}
                  {i === 0 ? (
                    <span className='week comp'>(week?)</span>
                  ) : (
                    <span className='week comp'></span>
                  )}
                </div>

                <div className='in comp'>
                  in
                  <input
                    className='stock-input comp'
                    name='symbol'
                    type='text'
                    placeholder='Symbol'
                    onChange={e => setSymbol(e.target.value)}
                  />
                  {i === 0 ? (
                    <span className='tickers comp'>(AMZN? NFLX?)</span>
                  ) : (
                    <span className='tickers comp'></span>
                  )}
                </div>
                <div className='startingon comp'>
                  starting on
                  <DatePicker
                    className='picker'
                    selected={startDate}
                    onChange={setStartDate}
                  />
                </div>
                <div className='plus comp'>
                  <button
                    className='plus-button'
                    type='submit'
                    onClick={e => {
                      e.preventDefault();

                      fetchAndSet();
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </form>

      <Link to='/table/'>
        <div className='dream-button'>
          <button
            className='dreammobile'
            onClick={props.setPortfolio(portfolio)}
          >
            Daydream!
          </button>
          <button
            className='dreamformal'
            onClick={props.setPortfolio(portfolio)}
          >
            Generate portfolio
          </button>
        </div>
      </Link>
    </div>
  );
};

export default InfoContainer;
