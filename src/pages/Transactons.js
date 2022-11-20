import React from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../composants/Nav';

function Transactons() {

    const location = useLocation()

    return (
        <div>
            <Nav />
            <p>{location.state.data}</p>
        </div>
    );
}

export default Transactons;