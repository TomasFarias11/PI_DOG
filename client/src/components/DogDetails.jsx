import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getDogById} from "../actions/index.js";
import {useEffect} from "react";
import Style from "./DogDetails.module.css";



export default function Details ({props}) {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getDogById(props));
    }, [dispatch])

    const dog = useSelector((state) => state.dogsById)
    return (
        <div className={Style.box}>
            {
                dog ?
                <div >
                    <div>
                        <img src={dog.image} alt="img not found" width="200px" height="200px" style={{borderRadius: '20px'}}/>
                    </div>
                    <div>
                        <h1>Name: {dog.name}</h1>
                    </div>
                    <div>
                        <h3>Life Span: {dog.life_span}</h3>
                    </div>
                    <div>
                        <p>Weight: {dog.weight}</p>
                    </div>
                    <div>
                        <p>Height: {dog.height}</p>
                    </div>
                    <div>
                        <p>Temperament: {Array.isArray(dog.temperaments) ? dog.temperaments.map((e) => e.name + ', ') : dog.temperaments}</p>
                    </div>
                </div> : <p>Wait for changes</p>
            }
            <div className={Style.buttonHomePage}>
                <Link to= '/dogs'>
                    <button className={Style.buttonHome}>Back to the main page</button>
                </Link>
            </div> 
        </div>
    )

}