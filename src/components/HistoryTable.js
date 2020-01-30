import React from 'react';
import { Link } from 'react-router-dom';

function HistoryTable(props) {
   return (
      <div className='HistoryTable'>
         <h2>Consolidated History</h2>
         <table className='historyTable'>
            <tbody>
               {props.savedProfits.map(obj => (
                  <tr>
                     <td>Entries: {obj.numEntries}</td>
                     <td>Winner: {obj.topPlayer}</td>
                     <td>Loser: {obj.biggestLoser}</td>
                     <td>Equity: ${obj.equity}</td>
                     <td>Profit: ${obj.profit}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}

export default HistoryTable;
