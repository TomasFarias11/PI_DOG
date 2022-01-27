import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {postDog, getTemperaments} from '../actions/index.js';
import { useDispatch, useSelector} from 'react-redux';
import Style from "./DogCreated.module.css";



const validate = (input) =>  {
    let errors = {};
    if (!input.name) {
        errors.name = "Name requiered";
    } else if (!input.weight) {
        errors.weight = "Weight required";
    } else if (input.weight && Number(input.weight.split(' - ')[0]) > Number(input.weight.split(' - ')[1])) { 
        errors.weight = "Min is bigger than max";
    } else if (!input.height) {
        errors.height = "Height required";
    } else if (input.height && Number(input.height.split(' - ')[0]) > Number(input.height.split(' - ')[1])) { 
        errors.height = "Min is bigger than max";
    } else if (!input.life_span) {
        errors.life_span = "Life Span requiered";
    }
    return errors;
}

export default function DogCreated () {
    const dispatch = useDispatch();
    const history = useHistory();
    const temperament = useSelector((state) => state.temperaments);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        weight: "",
        height: "",
        life_span: "" + " years",
        temperaments: [],
        createdInDb: true,
        // image: ""
    })

    useEffect(() => {
        dispatch(getTemperaments());
    }, []);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value,
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }


    // const handleCheckBox = (e) => {
    //     if (e.target.checked) {
    //         setInput({
    //             ...input,
    //             temperaments: input.temperaments.concat(e.target.value)
    //         })
    //     }
    // }

    const handleSelect = (e) => {
        setInput({
            ...input,
            temperaments: input.temperaments.concat(e.target.value)
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        let errors = Object.keys(validate(input))
        if (errors.length !== 0) {
            alert('Need to correct all the errors')
        } else {
            dispatch(postDog(input))
            alert("Dog Created!")
            setInput({
                name: "",
                weight: "",
                height: "",
                life_span: "" + ' years',
                temperaments: [],
                createdInDb: true,
                // image: "",
            })
            history.push('/dogs')
        }
    }

    return (
        <div>
            <div>
                <h1 className={Style.titleCreateDog}>Create your own dog!</h1>
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className={Style.box}>
                <div>
                    <label>Name:</label>
                </div>
                    <input type="text" value = {input.name} name="name" onChange={(e) => handleChange(e)} placeholder='name...'/>
                    {errors.name && (
                        <div>
                            <p className="error">{errors.name}</p>
                        </div>
                    )}
                <div>
                    <div>
                        <label>Weight:</label>
                    </div>
                    <input type="text" value = {input.weight} name="weight" onChange={(e) => handleChange(e)} placeholder='min - max'/>
                    {errors.weight && (
                        <div>
                            <p className="error">{errors.weight}</p>
                        </div>
                    )}
                </div>
                <div>
                    <div>
                        <label>Height:</label>
                    </div>
                    <input type="text" value = {input.height} name="height" onChange={(e) => handleChange(e)} placeholder='min - max'/>
                    {errors.height && (
                        <div>
                            <p className="error">{errors.height}</p>
                        </div>
                    )}
                </div>
                <div>
                    <div>
                        <label>Life Span:</label>
                    </div>
                    <input type="text" value = {input.life_span} name="life_span" onChange={(e) => handleChange(e)} placeholder='min - max years'/>
                    {errors.life_span && (
                        <div>
                            <p className="error">{errors.life_span}</p>
                        </div>
                    )}
                </div>
                {/* <div>
                    <label>image:</label>
                    <input type="text" name="image-dog"/>
                </div> */}
                
                <div>
                    <select onChange={(e) => handleSelect(e)} className = {Style.temps}>
                        {temperament.map((e) => { 
                            return (
                                <option value={e.name}>{e.name}</option>
                            )
                        })}
                    </select>
                    
                    <ul className={Style.listedTemps}>
                        <li>{input.temperaments.map((e) => e + " ,")}</li>
                    </ul>
                    
                </div> 
                <button  className = {Style.buttonCreateDog} type="submit">Create dog</button>
            </form>
            <div >
                <Link to="/dogs"><button className={Style.buttonToHome}>Back to HomePage</button></Link>
            </div>
        </div>
    )

}