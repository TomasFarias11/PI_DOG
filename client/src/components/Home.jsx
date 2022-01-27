import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getDogs, sortDogsByWeight, sortDogsByLetter, filterCreated, getTemperaments, filterByTemperaments} from "../actions/index.js";
import {Link} from "react-router-dom";
import Dogcard from "./Card.jsx"
import Paged from "./Paging.jsx";
import SearchBar from "./SearchBar";
import Style from "./Home.module.css";

export default function Home () {
    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.dogs)
    const temperaments = useSelector((state) => state.temperaments)
    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 8;

    const paging = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (() => {
        dispatch(getDogs())
        dispatch(getTemperaments())
    }, [dispatch])

    console.log(dogs);

    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog);
    
    function handleSortByLetter (e) {
        dispatch(sortDogsByLetter(e.target.value));
    }

    function handleSortByWeight (e) {
        dispatch(sortDogsByWeight(e.target.value));
    }

    function handleFilterCreated (e) {
        dispatch(filterCreated(e.target.value));
    }

    function handlerFilterTemperaments (e) {
        dispatch(filterByTemperaments(e.target.value));
    }

    return (
        <div className={Style.styleBackground}>
            <div>
                <SearchBar/>
            </div>
            <div className={Style.buttonToCreate}>
                <Link to="/dog"><button className={Style.buttonCreate}>Create your own dog!</button></Link>
            </div>
            <div className={Style.title}>
                <h1>Doggy's main page!</h1>
            </div>
            <div className={Style.filters}>
                <select className={Style.filter} onChange={e => handleSortByLetter(e)}>
                    <option value="None">Sort by letter</option>
                    <option value="Asc">Ascendant</option>
                    <option value="Desc">Descendant</option>
                </select>
                <select className={Style.filter} onChange={e => handleSortByWeight(e)}>
                    <option value="None">Filter by weight</option>
                    <option value="Asc">Ascendant</option>
                    <option value="Desc">Descendant</option>
                </select>
                <select className={Style.filter} onChange={e => handleFilterCreated(e)}>
                    <option value="All">Filter dogs created</option>
                    <option value="Cre">Created</option>
                </select>
                <select className={Style.filter} onChange={(e) => handlerFilterTemperaments(e)}>
                    {temperaments && temperaments.map((e) => {
                        return (
                        <option value={e.name}>{e.name}</option>
                    )})
                    }
                </select>
            </div>
            <div>
                <div>
                    <Paged
                    dogsPerPage={dogsPerPage}
                    dogs = {dogs.length}
                    paged = {paging}
                    />
                </div>
                <div className={Style.cards}>
                    {currentDogs ? currentDogs.map((e) => {
                        return (
                            <div key={e.ID} className={Style.corrector}>
                                <Dogcard 
                                name={e.name}
                                image={e.image}
                                temperaments = {Array.isArray(e.temperaments) ? e.temperaments.map((e) => e.name + ', ') : e.temperaments} 
                                weight={parseInt(e.weight)}  
                                key={e.ID} 
                                id={e.ID}
                                createdInDb={e.createdInDb}
                                />
                            </div>
                        )
                    }): <h1>No recipes</h1>
                    }
                </div>
            </div>
        </div>
    )
}