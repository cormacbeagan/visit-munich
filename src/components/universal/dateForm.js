import PropTypes from 'prop-types'
import { useState } from 'react'
import DatePicker from '../universal/datePicker'
import Button from '../universal/button'
import { useDimensionSetter } from '../../hooks/useDimensionSetter'

function DateForm({ handleDates, name }) {
    const [width, height] = useDimensionSetter()
    const [preselected, setPreselected] = useState()
    const [dates, setDates] = useState({
        arrival: '',
        departure: '',
    })

    const onChangeOne = timestamp => {
        setPreselected(timestamp)
        setDates(prev => ({ ...prev, arrival: new Date(timestamp) }))
    }

    const onChangeTwo = timestamp => {
        setDates(prev => ({ ...prev, departure: new Date(timestamp) }))
    }

    const handleSubmit = () => {
        const today = Date.now()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        if (
            !(dates.arrival instanceof Date) ||
            !(dates.departure instanceof Date)
        ) {
            alert('Invalid input')
            return
        } else if (dates.departure < dates.arrival) {
            alert('Departure before arrival!')
            return
        } else if (!(dates.arrival > yesterday)) {
            alert('Dates have to be in the future')
            return
        }
        handleDates(dates)
    }

    const divStyle = {
        width: width,
        position: 'fixed',
        top: '60px',
        left: '0',
        right: '0',
        zIndex: '88',
        backgroundColor: '#395f78',
        minHeight: '60px',
    }

    return (
        <div>
            <div style={divStyle}>
                <div style={formStyle}>
                    <div style={{ marginTop: '10px' }}>
                        <DatePicker
                            onChange={onChangeOne}
                            float={'float-left'}
                            id={'arrival'}
                        />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <DatePicker
                            onChange={onChangeTwo}
                            float={'float-right'}
                            preselected={preselected}
                            id={'departure'}
                        />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <Button children={name} onClick={handleSubmit} />
                    </div>
                </div>
            </div>
        </div>
    )
}

DateForm.propTypes = {
    handleDates: PropTypes.func,
    name: PropTypes.string,
}

export default DateForm

const formStyle = {
    maxWidth: '800px',
    margin: '5px auto',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
}
