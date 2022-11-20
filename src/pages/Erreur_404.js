/**
 * @file Erreur_404.js is the page that display if number of user doesn't exist
 * @author Chahouat Taoufik 
 * @see <a href="https://github.com/taifu22/P12_OC/blob/master/src/pages/Erreur_404.js">Répo GitHub</a>
 */

import React from 'react';
import { Link } from 'react-router-dom';

function Erreur_404() {
    return (
        <div className='erreur-404'>
            <div className='erreur-404-container'>
                <p className='p-404'>404</p>
                <p className='p-404-text'>Oups! La page que vous demandez n'existe pas.</p>
            </div>
            <div className='back-to-home'> 
                 <Link style={{color:'#132344' , textDecoration:'none'}} to="/">Retourner sur la page d'accueil</Link>
            </div>
        </div> 
    );
}

export default Erreur_404;
