import React from 'react';
import { Link } from 'react-router-dom';

function HistoryTable(props) {
   return (
      <div className='HistoryTable'>
         <h2>Consolidated History</h2>
         <table className='historyTable'>
            <tbody>
               {props.savedProfits.map((obj, i) => (
                  <tr key={i}>
                     <td>Time: {obj.time}</td>
                     <td>Entries: {obj.numEntries}</td>
                     <td>Top Player: {obj.topPlayer}</td>
                     <td>Equity: ${obj.equity}</td>
                     <td className={obj.profit >= 0 ? 'pos' : 'neg'}>
                        Profit: ${obj.profit}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}

export default HistoryTable;
