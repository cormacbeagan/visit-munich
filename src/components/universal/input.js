import React, { useState, useEffect, Fragment } from 'react';
import Button from './button';

// need to make today's date and put it in as the initial state!

const initialState = {
    arrival: '',
    departure: '', // this needs to always at least the arrival date

}

function Input({handleSubmit}) {
    const [ formData, setFormData ] = useState(initialState);

    const handleChange = (event) => {
        event.persist();
        setFormData((prev) => ({...prev, [event.target.name]: event.target.value}));
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        handleSubmit(formData)

        //setFormData(initialState);
    }
    return (
        <div className="row" style={{paddingTop: '20px'}}>
            <form onSubmit={onSubmit} className="col s12">
              <div className="input-field col s4">
                <input type="date" name="arrival" value={formData.arrival} onChange={handleChange} />
                <label>Arrival: </label>
              </div>
              <div className="input-field col s4">
                <input type="date" name="departure" value={formData.departure} onChange={handleChange} />
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