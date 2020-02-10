import React from 'react';

function addCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function Table(props) {
  return (
    <div className='portTable'>
      <h2 className='porth2'>Portfolio</h2>
      <table className='wholetable'>
        <tbody>
          <tr>
            <th></th>
            <th>Symbol</th>
            <th>Frequency</th>
            <th>Purchased</th>
            <th>Price</th>
            <th>Last Close</th>
            <th>Shares</th>
            <th>Equity</th>
            <th>Profit</th>
          </tr>
          {props.portfolio.map((entry, i) => {
            return (
              <tr key={i}>
                <td></td>
                <td>{entry.symbol.toUpperCase()}</td>
                <td>
                  {entry.frequency.toUpperCase()}(${entry.quantity})
                </td>
                <td>{entry.startDate}</td>
                <td>${addCommas(entry.open.toFixed(2))}</td>
                <td>${addCommas(entry.close.toFixed(2))}</td>
                <td>{addCommas(entry.sharesOwned.toFixed(2))}</td>
                <td>
                  $
                  {addCommas(
                    (
                      parseFloat(entry.sharesOwned) * parseFloat(entry.close)
                    ).toFixed(2)
                  )}
                </td>
                <td
                  className={
                    parseFloat(entry.sharesOwned) * parseFloat(entry.close) -
                      parseFloat(entry.quantity) *
                        parseFloat(entry.purchases) >=
                    0
                      ? 'pos'
                      : 'neg'
                  }
                >
                  $
                  {addCommas(
                    (
                      parseFloat(entry.sharesOwned) * parseFloat(entry.close) -
                      parseFloat(entry.quantity) * parseFloat(entry.purchases)
                    ).toFixed(2)
                  )}
                </td>
              </tr>
            );
          })}
          <tr>
            <th>Total</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>
              $
              {addCommas(
                props.portfolio
                  .reduce(
                    (accumulator, currentValue) =>
                      accumulator +
                      parseFloat(currentValue.sharesOwned) *
                        parseFloat(currentValue.close),
                    0
                  )
                  .toFixed(2)
              )}
            </th>
            <th
              className={
                props.portfolio.reduce(
                  (accumulator, currentValue) =>
                    accumulator +
                    parseFloat(currentValue.sharesOwned) *
                      parseFloat(currentValue.close) -
                    parseFloat(currentValue.quantity) *
                      parseFloat(currentValue.purchases),
                  0
                ) >= 0
                  ? 'pos'
                  : 'neg'
              }
            >
              $
              {addCommas(
                props.portfolio
                  .reduce(
                    (accumulator, currentValue) =>
                      accumulator +
                      parseFloat(currentValue.sharesOwned) *
                        parseFloat(currentValue.close) -
                      parseFloat(currentValue.quantity) *
                        parseFloat(currentValue.purchases),
                    0
                  )
                  .toFixed(2)
              )}
            </th>
          </tr>
        </tbody>
      </table>
      <div className='bd'>
        <button
          className='saveButton'
          onClick={() => {
            var day = new Date();

            var time = day
              .toString()
              .split(' ')[4]
              .split(':');
            time.pop();
            time = time.join(':');

            var playerArr = [];
            props.portfolio.forEach(entry => {
              var entryProfit =
                parseFloat(entry.sharesOwned) * parseFloat(entry.close) -
                parseFloat(entry.quantity) * parseFloat(entry.purchases);
              var obj = { sym: entry.symbol, profit: entryProfit };
              playerArr.push(obj);
            });

            playerArr.sort((a, b) => (a.profit > b.profit ? 1 : -1));
            var topPlayer = playerArr[playerArr.length - 1].sym;
            var biggestLoser = playerArr[0].sym;

            let equity = addCommas(
              props.portfolio
                .reduce(
                  (accumulator, currentValue) =>
                    accumulator +
                    parseFloat(currentValue.sharesOwned) *
                      parseFloat(currentValue.close),
                  0
                )
                .toFixed(2)
            );
            let profit = addCommas(
              props.portfolio
                .reduce(
                  (accumulator, currentValue) =>
                    accumulator +
                    parseFloat(currentValue.sharesOwned) *
                      parseFloat(currentValue.close) -
                    parseFloat(currentValue.quantity) *
                      parseFloat(currentValue.purchases),
                  0
                )
                .toFixed(2)
            );
            var arr = [];
            props.portfolio.forEach(entry =>
              arr.push(entry.symbol.toUpperCase())
            );
            let data = {
              profit: profit,
              numEntries: arr.length,
              topPlayer: topPlayer,
              biggestLoser: biggestLoser,
              equity: equity,
              time: time
            };
            let copyOfSavedProfits = props.savedProfits.slice(0);
            copyOfSavedProfits.push(data);
            props.setSavedProfits(copyOfSavedProfits);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Table;
