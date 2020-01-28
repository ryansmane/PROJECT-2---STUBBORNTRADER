import React from 'react'
import {useEffect, useState } from 'react'



function Table(props) {

    

    

    return (
        <table>
            <tbody>
                <tr>
                    <th>Symbol</th>
                    <th>Quantity</th>
                    <th>Date Purchased</th>
                    <th>Price</th>
                    <th>Last Close</th>
                    
                </tr>
                {props.portfolio.map((entry, i) => {
                   return( <tr key={i}>
                      <td>{entry.symbol}</td>
                      <td>{entry.quantity}</td>
                      <td>{entry.startDate}</td>  
                      <td>{entry.open}</td>
                      <td>{entry.close}</td> 
                   </tr> )
                })}

            </tbody>
            
        </table>
    )
}

export default Table