import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getTemperaments, postDog } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import '../styles/DogCreate.css'

function validate(input) {
    let errors = {};

    //? Validador de Nombre:--------------------------------------------------------------------------------------------------------------

    if (!input.name){
        errors.name = 'Debería tener un nombre.';
    }else if(input.name.length > 30){
        errors.name = 'Su nombre es muy largo';
    };


    //? Validador de Altura Mínima:-------------------------------------------------------------------------------------------------------

    if(!input.heightMin){
        errors.heightMin = 'Debería existir una altura mínima.';

    }
    if(input.heightMin <= 0){
        errors.heightMin = 'No puede ser negativo.';
    }
    if(isNaN(parseInt(input.heightMin))){
        errors.heightMin = 'La altura debería ser un número';

    }
    if(input.heightMin >= input.heightMax){
        errors.heightMin = 'La altura mínima debe ser menor a la altura máxima';
    };
    

    //? Validador de Altura Máxima:-------------------------------------------------------------------------------------------------------

    if(!input.heightMax){
        errors.heightMax = 'Debe existir una altura máxima.';

    }
    if(input.heightMax > 150){
        errors.heightMax ='Debe ser menor a 150cm.';
    }
    if(isNaN(parseInt(input.heightMax))){
        errors.heightMax = 'La altura máxima debe ser un número'
    }


    //? Validador de Peso Mínimo:---------------------------------------------------------------------------------------------------------

    if(!input.weightMin){
        errors.weightMin = 'Debe existir un peso mínimo.';
    }else if(input.weightMin <= 0){
        errors.weightMin = 'Su peso debe ser mayor a 0kg.';
    }else if(isNaN(parseInt(input.weightMin))){
        errors.heightMin = 'El peso mínimo debe ser un número.'
    }


    //? Validador de Peso Máximo:-------------------------------------------------------------------------------------------------------

    if(!input.weightMax){
        errors.weightMax = 'Debe existir un peso máximo.';
    }
    if(input.weightMax > 110){
        errors.weightMax = 'Su peso debe ser menor a 110kg.';
    }
    if(isNaN(parseInt(input.heightMax))){
        errors.weightMax = 'El peso máximo debe ser un número'
    }
    if(input.weightMax <= input.weightMin){
        errors.weightMax = 'Su peso máximo debe ser mayor al peso mínimo.'
    }


    //? Validador de Lapo de Vida:-------------------------------------------------------------------------------------------------------

    if(!input.life_span){
        errors.life_span = 'Debe existir un lápso de vida.'

    }
    if(input.life_span > 20){
        errors.life_span = 'Debe ser menor a 20 años.';
    }
    if(isNaN(parseInt(input.life_span))){
        errors.life_span = 'El lapso de vida debería ser un número'
    }
    if (input.life_span <= 0) errors.life_span = 'El perro debe tener más de 0 años...';


    //? Validador de Imagen:-------------------------------------------------------------------------------------------------------------

    if(!input.image.includes('https://')){
        errors.image = `La URL de la imagen debe tener 'https://'`; 
    }


    //? Validador de Temperamentos:-------------------------------------------------------------------------------------------------------




    return errors;
}

export default function DogCreate() {

    const dispatch = useDispatch();
    const history = useHistory();
    const allTemperaments = useSelector((state) => state.temperaments);

    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        life_span: '',
        image: '',
        temperaments: [],
    });

    useEffect(() => {
        dispatch(getTemperaments());
    },[dispatch]);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        // Esta función hace lo siguiente:
        // Cada vez que modifique o agregue algo, a mi estado input, además de lo que tiene, le agrega
        // el value de lo que se esté modificando. La idea es que a medida que vaya llenando los inputs
        // del formulario, me vaya modificando el estado inicial, que tiene todas las propiedades vacías.

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }));

        console.log(input)
    }

    function handleSelect(e) {
        /* 
        Condicional para saber si en temperaments existe un valor
        si existe, setear el input con el estado anterior(...state) y temperaments 
        */
        if(!input.temperaments.includes(e.target.value)){
            setInput((input) =>({
                ...input,
                temperaments: [...input.temperaments, e.target.value]
            }))
        }
        
    
        }

        // if (!input.temperaments.includes(e.target.value)) {
        //     setInput({
        //         ...input,
        //         temperaments: [...input.temperaments, e.target.value]
        //     });
        // }


    function handleSubmit(e) {
        e.preventDefault();
        console.log(errors);
        if (!Object.getOwnPropertyNames(errors).length && input.name && input.heightMin && input.heightMax && input.weightMin && input.weightMax && input.life_span && input.temperaments.length) {
            dispatch(postDog(input));
            alert('Perro creado correctamente.');
            setInput({
                name: '',
                heightMin: '',
                heightMax: '',
                weightMin: '',
                weightMax: '',
                life_span: '',
                image: '',
                temperaments: [],
                
            });
            history.push('/home');
        } else {
            alert('El perro no puede ser completado con esa data, revisala.')
        }
    }

    function handleDeleteTemperament(el) {
        setInput({
            ...input,
            temperaments: input.temperaments.filter(temp => temp !== el)
        })
    }

    return (
        <div className="background-image">
        <div className='divCreate'>
            <Link to='/home'><button className='buttonHome'>Home </button></Link>
            <h1 className='title'>¡Crea a tu Perro!</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label><strong>Nombre: </strong></label>
                    <input autoComplete="off" type='text' value={input.name} name='name' onChange={e => handleChange(e)} />
                    {errors.name && (
                        <b className='error'><strong>{errors.name}</strong></b>
                    )}
                </div>
                <div>
                    <label><strong>Altura Mínima: </strong></label>
                    <input type='number' value={input.heightMin} name='heightMin' onChange={e => handleChange(e) }/>
                    <label><strong> cm</strong></label>
                    {errors.heightMin && (
                        <b className='error'><strong>{errors.heightMin}</strong></b>
                    )}
                </div>
                <div>
                    <label><strong>Altura Máxima: </strong></label>
                    <input type='number' value={input.heightMax} name='heightMax' onChange={e => handleChange(e)} />
                    <label><strong> cm</strong></label>
                    {errors.heightMax && (
                        <b className='error'><strong>{errors.heightMax}</strong></b>
                    )}
                </div>
                <div>
                    <label><strong>Peso Mínimo: </strong></label>
                    <input type='number' value={input.weightMin} name='weightMin' onChange={e => handleChange(e)} />
                    <label><strong> kg</strong></label>
                    {errors.weightMin && (
                        <b className='error'><strong>{errors.weightMin}</strong></b>
                    )}
                </div>
                <div>
                    <label><strong>Peso Máximo: </strong></label>
                    <input type='number' value={input.weightMax} name='weightMax' onChange={e => handleChange(e)} />
                    <label><strong> kg</strong></label>
                    {errors.weightMax && (
                        <b className='error'><strong>{errors.weightMax}</strong></b>
                    )}
                </div>
                <div>
                    <label><strong>Lapso de Vida Esperado: </strong></label>
                    <input type='number' value={input.life_span} name='life_span' onChange={e => handleChange(e)} />
                    <label><strong> years</strong></label>
                    {errors.life_span && (
                        <b className='error'><strong>{errors.life_span}</strong></b>
                    )}
                </div>
                <div>
                    <label><strong>Imagen: </strong></label>
                    <input autoComplete="off" type='text' value={input.image} name='image' onChange={e => handleChange(e)} />
                    {errors.image && (
                        <b className="error">{errors.image}</b>
                    )}
                </div>
                <div>
                    <select onChange={e => handleSelect(e)} >
                        <option value='selected' hidden >Temperamentos</option>
                        {allTemperaments?.sort(function (a, b) {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                        }).map(temp => {
                            return (
                                <option value={temp.name} key={temp.id}>{temp.name}</option>
                            )
                        })}
                    </select>

                    {input.temperaments.map(el => {
                        return (
                            
                                <ul className='allTemps' key={el}>
                                    <li>
                                        <p className='temp'><strong>{el}</strong></p>
                                        <button onClick={() => handleDeleteTemperament(el)} className='x' >X</button>
                                    </li>
                                </ul>
                            
                        )
                    })}
                    {errors.temperaments && (
                        <b className="error"><strong>{errors.temperaments}</strong></b>
                    )}
                </div>
                <button type='submit' className='boop' ><strong>Crear </strong></button>

            </form>

        </div>
        </div>
    )
}
