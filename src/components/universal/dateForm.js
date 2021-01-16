import React, { useState } from 'react';
import DatePicker from '../universal/datePicker';
import Button from '../universal/button';


function DateForm({handleDates}) {
    const [ preselected, setPreselected ] = useState();
    const [ dates, setDates ] = useState({
        arrival: '',
        departure: '',
    });


    const onChangeOne = (timestamp) => {
        setPreselected(timestamp)
        setDates(prev => ({...prev, arrival: new Date(timestamp)}))
    }

    const onChangeTwo = (timestamp) => {
        setDates(prev => ({...prev, departure: new Date(timestamp)}))
    }

    const handleSubmit = () => {
        const today = Date.now()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() -1)
        if(!(dates.arrival instanceof Date) || !(dates.departure instanceof Date)){
            alert('Invalid input')
            return
        }else if(dates.departure < dates.arrival){
            alert('Departure before arrival!')
            return
        } else if (!(dates.arrival > yesterday)) {
            alert('Dates have to be in the future')
            return
        }
        handleDates(dates)
    }




    return (
            <div >
                <div style={divStyle}>
                  <div style={formStyle}>
                    <DatePicker onChange={onChangeOne} float={'float-left'} id={'one'}/>
                    <DatePicker onChange={onChangeTwo} float={'float-right'} preselected={preselected} id={'two'}/>
                    <Button children={'submit'} onClick={handleSubmit} />
                  </div>
                </div>
            </div>
    )
}

export default DateForm;

const divStyle = {
    position: 'fixed',
    top: '80px',
    left: '0',
    right: '0',
    zIndex: '98',
    backgroundColor: '#395f78', 
    minHeight: '60px',  
  
}

const formStyle = {
    maxWidth: '800px',
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
}