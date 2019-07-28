import React from 'react';

import img from '../../assets/images/favicon.png';
import './HeaderFooter.scss';

const Header: React.FC = () => {
    return (
        <header>
            <img src={img} alt="header"/>
            <h1>Rick and Morty</h1>
        </header>
    );
};

export default Header;
