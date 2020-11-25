import React, { useState, useEffect, Fragment } from 'react';


const initialState = {
    arrival: '',
    departure: '', 

}

function Input() {
    const [ formData, setFormData ] = useState(initialState);

    const handleChange = (event) => {
        event.persist();
        setFormData((prev) => ({...prev, [event.target.name]: event.target.value}));
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        //call firebase send data
        setFormData(initialState);
    }
    return (
		<Fragment>
            <form onSubmit={onSubmit}>
                <label>
                    Arrival:
                    <input type="text" name="arrival" value={formData.departure} onChange={handleChange} />
                </label>
                <label>
                    Departure:
                    <input type="text" name="departure" value={formData.departure} onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
		</Fragment>
    )
}

export default Input;