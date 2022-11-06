import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemperaments, filterDogsByTemperament, filterDogsByOrigin, sortByName, sortByWeight } from "../actions";
import { Link } from 'react-router-dom';
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import '../styles/Home.css'

export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.temperaments);

    // Paginado:
    const [currentPage, setCurrentPage] = useState(1); // En una constante me guardo el estado local actual y la otra me setea el estado actual. El state inicial es 1 porque empiezo en la primer página.
    const [dogsPerPage, /*_setDogsPerPage*/] = useState(8); // Me guardo cuantos perros quiero por página.
    const indexOfLastDog = currentPage * dogsPerPage; // El índice del último perro de cada página va a ser el numero de la página multiplicado por la cantidad de perros por página.
    const indexOfFirstDog = indexOfLastDog - dogsPerPage; // El índice del primer perro de cada página va a ser el índice del último de esa página menos la cantidad de perros por página.
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); // Los perros mostrados en cada página serán los que estén en la porción que va desde el primero hasta el último de cada página, de la lista total de perros.

    const [/*_orden*/, setOrden] = useState(''); // Estado local que me sirve para modificar el estado cuando ordeno y renderizar los perros ordenados como quiero.


    //------------------------------------------------------------------------------------------------------

    // Ahora voy a traerme del estado los perros cuando el componente se monta:
    useEffect(() => { // useEffect simula los lifecycles de los estados locales.
        dispatch(getDogs()) // Este dispatch es lo mismo que hacer el mapDispatchToProps
    }, [dispatch]) // El segundo parámetro del useEffect es un array donde va todo de lo que depende el useEffect para ejecutarse.

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(getDogs())
    }

    function handleFilterTemperaments(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterDogsByTemperament(e.target.value))
    }

    function handleFilterOrigin(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterDogsByOrigin(e.target.value))
    }

    function handleSortByName(e) {
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleSortByWeight(e) {
        e.preventDefault();
        dispatch(sortByWeight(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }


    return (
        <div className='home'>

            <div className='divNB'>
                <ul className='navbar'>
                    <li >
                        <button onClick={e => { handleClick(e) }} className='elementNBHome' >
                            Cargar Perros
                        </button>
                    </li>
                    <li>
                        <Link to='/dogs' ><button className='elementNBCreate' >
                            Crear Perro
                        </button></Link>
                    </li>
                    <li className='content-select'>
                        <select onChange={e => handleSortByName(e)}  >
                            <option value='selected' hidden className='elementNB' >Orden Por Nombre</option>
                            <option value='asc'  >A - Z</option>
                            <option value='desc'  >Z - A</option>
                        </select>
                    </li>
                    <li className='content-select' >
                        <select onChange={e => handleSortByWeight(e)}  >
                            <option value='selected' hidden>Orden por Peso</option>
                            <option value='asc'>Liviano a Pesado</option>
                            <option value='desc'>Pesado a Liviano</option>
                        </select>
                    </li>
                    <li className='content-select' >
                        <select onChange={e => handleFilterTemperaments(e)}  >
                            <option key={0} value='all'>Temperamentos</option>
                            {allTemperaments?.sort(function (a, b) {
                                if (a.name < b.name) return -1;
                                if (a.name > b.name) return 1;
                                return 0;
                            }).map(el => {
                                return (
                                    <option key={el.id} value={el.name}>{el.name}</option>
                                )
                            })}
                        </select>
                    </li>
                    <li className='content-select' >
                        <select onChange={e => handleFilterOrigin(e)}  >
                            <option value='all'>Todas las Razas</option>
                            <option value='api'>Existentes</option>
                            <option value='created'>Creadas</option>
                        </select>
                    </li>
                    <li>
                        <SearchBar setCurrentPage={setCurrentPage}/>
                        {/* Loader para que busque un perro, me lleve a la pag 1 y me muestre los perros */}
                    </li>
                </ul>
            </div>
            <div>

                <Paginado  dogsPerPage={dogsPerPage} allDogs={allDogs.length} setCurrentPage={setCurrentPage} />

            </div>


            <div className='container'>
                {
                    currentDogs?.map((el) => {
                        return (
                            <div key={el.id} className='cardHome'>
                                <Link to={'/home/' + el.id} style={{ textDecoration: 'none' }} >
                                    <Card
                                        name={el.name}
                                        image={el.image}
                                        temperaments={el.temperaments}
                                        weightMin={el.weightMin}
                                        weightMax={el.weightMax}
                                        key={el.id}
                                    />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>

            <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} setCurrentPage={setCurrentPage} />
            <Link to='/' ><button className='welcome'><span>Welcome Page</span></button></Link>
        </div>
    )

}
