import React from 'react';
import '../styles/Paginado.css'

export default function Paginado({dogsPerPage, allDogs, setCurrentPage}) {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i + 1);
    }




    return (
        <nav className='paginado'>
            <ul>
                {pageNumbers.length > 1 && 
                pageNumbers.map(number => (
                    <li key={number}>
                        <button onClick={() => setCurrentPage(number)}><strong>{number}</strong></button>
                    </li>
                ))}
                
            </ul>
        </nav>
    )
}