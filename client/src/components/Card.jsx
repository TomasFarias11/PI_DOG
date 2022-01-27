import React from 'react';
import {Link} from 'react-router-dom';
import Style from './Card.module.css';

export default function Dogcard ({name, image, temperaments, weight,id}) {

    return (
        <div className={Style.cards}>
            <Link to={`/dogs/${id}`} style={{textDecoration: 'none', color: 'black'}}>
            <div className={Style.box} background-color = 'red'>
                <div className = {Style.image}>
                    <img src={image} alt="img not found" width="367" height="200px" style={{borderRadius: '30px'}}/>
                </div>
                <div>
                    <h3>
                        {name}
                    </h3>                   
                </div>
                <div>
                    <h6>Temperaments: {temperaments}</h6>
                </div>
                <div>
                    <span className={Style.score}>Weight: {weight}</span>
                </div>
            </div>
            </Link>
        </div>
    )
}