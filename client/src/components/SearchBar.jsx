import React from "react";
import { useState} from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../actions";
import '../styles/SearchBar.css';

export default function SearchBar({setCurrentPage}){

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    

    function handleSubmit(e){
        e.preventDefault();
        var found = getDogs(name);
        dispatch(found)
        setName('');
        setCurrentPage(1)
    }

    return (
        <div className="searchBar">
            <input
                type='text'
                placeholder='Buscar Perro' 
                onChange={e => handleInputChange(e)}
                value={name}
                className='input'
                onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
            />
            <button
                type='submit'
                onClick={e => handleSubmit(e)}
                className='btnSearch'
            >
                <strong>Buscar </strong>
            </button>
        </div>
    )
}