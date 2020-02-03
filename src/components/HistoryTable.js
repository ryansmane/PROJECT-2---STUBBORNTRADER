import React from 'react';


function HistoryTable(props) {
   return (
      <div className='HistoryTable'>
         <div className="hishead">
         <h2 className="hish2">Consolidated History</h2>
         <span><button className="hisbutton" onClick={() => props.setSavedProfits([])}>CLEAR</button></span>
         </div>
         <table className='historyTable'>
            <tbody>
               {props.savedProfits.map((obj, i) => (
                  <tr key={i}>
                     <td>Time: {obj.time}</td>
                     <td>Entries: {obj.numEntries}</td>
                     <td>Top Player: {obj.topPlayer.toUpperCase()}</td>
                     <td>Equity: ${obj.equity}</td>
                     <td className={parseFloat(obj.profit) >= 0 ? 'pos' : 'neg'}>
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
