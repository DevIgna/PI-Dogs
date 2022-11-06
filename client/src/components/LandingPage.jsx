import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

export default function LandingPage(){
    return(
        <div className='landing'>
            <h1>¡Bienvenido/a a Dogs API!</h1>
            <h2>Toca el boton de abajo para ingresar a la Home</h2>
            <Link to='/home' className='btnLan'>
                <button className='button'><h1><span>Home </span></h1></button>
            </Link>
        </div>
    )
}