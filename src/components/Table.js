import React from 'react';
import { useEffect, useState } from 'react';

function Table(props) {
   return (
      <table>
         <tbody>
            <tr>
               <th></th>
               <th>Symbol</th>
               <th>Purchases</th>
               <th>Date Purchased</th>
               <th>Price</th>
               <th>Last Close</th>
               <th>Shares Owned</th>
               <th>Equity</th>
               <th>Profit</th>
            </tr>
            {props.portfolio.map((entry, i) => {
               return (
                  <tr key={i}>
                     <td></td>
                     <td>{entry.symbol}</td>
                     <td>{entry.purchases}</td>
                     <td>{entry.startDate}</td>
                     <td>{entry.open}</td>
                     <td>{entry.close}</td>
                     <td>{Math.floor(entry.sharesOwned)}</td>
                     <td>
                        {parseInt(entry.sharesOwned) * parseInt(entry.close)}
                     </td>
                     <td>
                        {parseInt(entry.sharesOwned) * parseInt(entry.close) -
                           parseInt(entry.quantity) * parseInt(entry.purchases)}
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
                   <th>{props.portfolio.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.sharesOwned) * parseInt(currentValue.close),0)}</th>
                   <th>{props.portfolio.reduce((accumulator, currentValue) => accumulator + (parseInt(currentValue.sharesOwned) * parseInt(currentValue.close)) -
                       (parseInt(currentValue.quantity) * parseInt(currentValue.purchases)),0)}</th>
            </tr>
         </tbody>
      </table>
   );
}

export default Table;
