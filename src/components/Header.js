import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
   return (
      <div className='mainHeader'>
          <div className="title">
         <h1 className='mainh1'>The Stubborn Trader</h1>
         <p className="byline">For generating hypothetical stock portfolios</p>
           </div>
         <nav>
            <Link className='link' to='/'>
               <h3>Sandbox</h3>
            </Link>
         </nav>
      </div>
   );
}

export default Header;
