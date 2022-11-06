import React from "react";
import '../styles/Card.css'

export default function Card({ image, name, temperaments, weightMin, weightMax, }) {
    return (
        <div className='card' >
            <h1 className='info' >{name}</h1>
            <h3 className='info'>{function (temperaments) {
                if (typeof (temperaments) === 'string') {
                    return temperaments;
                }
                if (Array.isArray(temperaments)) {
                    let temps = temperaments.map(el => el.name);
                    return temps.join(', ');
                }
            }(temperaments)}</h3>
            <img src={image} alt={`${name}`} width='250px' heigth='200px' className='imageDog'/>
            {
                name !== 'Lo siento, no se pudo encontrar esa raza' ?
                <h3 className='info'>Peso: {weightMin} - {weightMax} kg</h3> :
                <></>
            }
        </div>
    )
}
