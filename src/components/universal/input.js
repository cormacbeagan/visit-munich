import React, { useState, useEffect, useRef } from 'react';
import Button from './button';

const date = new Date()
const day = date.getDate('DD')
const month = date.getMonth('mm')+1
const year = date.getFullYear('YYYY')
const today = `${year}-${month < 10 ? '0'+month : month}-${day < 10 ? '0'+ day : day}`
const initialState = {
    arrival: today,
    departure: '', // this needs to always at least the arrival date
}

function Input({handleSubmit}) {
    const [ formData, setFormData ] = useState(initialState);
    const arrival = useRef();

    useEffect(() => {
    })

    const handleChange = (event) => {
        event.persist();
        setFormData((prev) => ({...prev, [event.target.name]: event.target.value}));
    }

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(formData)

        //setFormData(initialState);
    }
    return (
        <div className="row" style={{paddingTop: '20px'}}>
            <form onSubmit={onSubmit} className="col s12">
              <div className="input-field col s4">
               {/* <input type="text" className="datepicker"></input>*/}
                <input 
                    type="date" name="arrival" 
                    value={formData.arrival} 
                    onChange={handleChange} 
                    ref={arrival}
                    min={today}
                    />
                
                <label>Arrival: </label>
              </div>
              <div className="input-field col s4">
                <input type="date" name="departure" 
                    value={formData.departure} 
                    onChange={handleChange} 
                    min={formData.arrival} 
                    />
                <label>Departure: </label>
              </div>
                <div className="col s4 center" style={{marginTop: '15px'}}>
                    <Button children={'search'}/>
                </div>
            </form>
        </div>
    )
}

export default Input;