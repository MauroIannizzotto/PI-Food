import React from 'react';
import {Link} from 'react-router-dom';

//COMPONENTE FUNCIONAL
export default function LandingPage(){
    return(
        <div className='landing'>
            <h1>Let's Cook</h1>
            <Link to = '/home'>
                <button>Join Now</button>
            </Link>
        </div>
    )
}