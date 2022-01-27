import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getDogsByName} from '../actions/index.js';
import Style from "./SearchBar.module.css";
 
export default function SearchBar () {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getDogsByName(name))
    }

    return (
        <div className={Style.divClass}>
            <form>
                <input className={Style.searchStyle} type='text' name="dogs" placeholder="Search dog" onChange = {(e) => handleInputChange(e)}/>
                <input className={Style.buttonStyle} type="submit" onClick={(e) => handleSubmit(e)}/>
            </form>
            

        </div>
    )
}