import React, { useState, useEffect, useRef } from 'react';
import Button from './button';

const date = new Date()
const day = date.getDate()
const month = date.getMonth('mm')+1
const year = date.getFullYear('YYYY')
const today = `${year}-${month < 10 ? '0'+ month : month}-${day < 10 ? '0'+ day : day}`
const initialState = {
    arrival: today,
    departure: '', 
}

function Input({handleSubmit}) {
    const [ formData, setFormData ] = useState(initialState);
    const arrival = useRef();
    
    const arrivalDate = new Date(formData.arrival);
    const maxDate = new Date(arrivalDate.getFullYear(), arrivalDate.getMonth(), arrivalDate.getDate()+7)
    const maxDay = maxDate.getDate()
    const maxMonth = maxDate.getMonth('mm')+1
    const maxYear = maxDate.getFullYear('YYYY')
    const maxInputDate = `${maxYear}-${maxMonth < 10 ? '0'+ maxMonth : maxMonth}-${maxDay < 10 ? '0'+ maxDay : maxDay}`
    
    useEffect(() => {
       // console.log(maxInputDate)
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
        <div className="row" style={inputMarg}>
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
                
                <label className="active">Arrival: </label>
              </div>
              <div className="input-field col s4">
                <input type="date" name="departure" 
                    value={formData.departure} 
                    onChange={handleChange} 
                    min={formData.arrival} 
                    max={maxInputDate}


                    />
                <label className="active">Departure: </label>
              </div>
                <div className="col s4 center" style={buttonMarg}>
                    <Button children={'search'}/>
                </div>
            </form>
        </div>
    )
}

export default Input;

const buttonMarg = {marginTop: '15px'}

const inputMarg = {paddingTop: '20px'}