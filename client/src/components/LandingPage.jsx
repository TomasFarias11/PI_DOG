import React from 'react';
import {Link} from 'react-router-dom';
import Style from './LandingPage.module.css';
import Video from '../resources/video.mp4';

export default function LandingPage () {
    return (
        <div>
            <video id="video.mp4" autoPlay loop muted className={Style.vid}>
                <source src={Video} type='video/mp4'/>
                <source src={Video} type='video/ogg'/>
                Your browser does not support the video tag.
            </video>
            <h1 className={Style.MainTitle}>Welcome to my Doggy Page!</h1>
            <Link to="/dogs">
                <button className={Style.buttonMain}>Log into the main page!</button>
            </Link>
        </div>
    )
}