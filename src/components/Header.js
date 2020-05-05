import React from 'react';
import { Link } from 'react-router-dom';

import GoogleAuth from './GoogleAuth';

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="header item">Streamer</Link>                
            <div className="right menu">
                <Link to="/" className="item">Streams</Link>    
                <GoogleAuth></GoogleAuth>  
            </div>
        </div>
    );
}

export default Header;