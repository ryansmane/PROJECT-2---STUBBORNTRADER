import React from 'react';
import { useEffect, useState } from 'react';

function addCommas(x) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function Table(props) {
   return (
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
                     <td>{entry.symbol}</td>
                     <td>
                        {entry.frequency.toUpperCase()}(${entry.quantity})
                     </td>
                     <td>{entry.startDate}</td>
                     <td>{addCommas(entry.open.toFixed(2))}</td>
                     <td>{addCommas(entry.close.toFixed(2))}</td>
                     <td>{addCommas(entry.sharesOwned.toFixed(2))}</td>
                     <td>
                        $
                        {addCommas(
                           (
                              parseFloat(entry.sharesOwned) *
                              parseFloat(entry.close)
                           ).toFixed(2)
                        )}
                     </td>
                     <td>
                        $
                        {addCommas(
                           (
                              parseFloat(entry.sharesOwned) *
                                 parseFloat(entry.close) -
                              parseFloat(entry.quantity) *
                                 parseFloat(entry.purchases)
                           ).toFixed(2)
                        )}
                     </td>
                  </tr>
               );
            })}
            <tr>
               <th>Total</th>
               <th>x</th>
               <th>x</th>
               <th>x</th>
               <th>x</th>
               <th>x</th>
               <th>x</th>
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
               <th>
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
   );
}

export default Table;
