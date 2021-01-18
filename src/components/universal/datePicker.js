import React, { useState, useEffect, useRef } from 'react';
import '../../styles/datePicker.css';

let oneDay = 60 * 60 *24 * 1000;
let todayTimestamp = Date.now() - (Date.now() % oneDay) + (new Date().getTimezoneOffset() * 1000 * 60);


function DatePicker({ onChange, id, preselected, float }) {
    const [ showDatePicker, setShowDatePicker ] = useState(false);
    const input = useRef();
    const div = useRef();
    const [ picked, setPicked ] = useState(false);

    useEffect(() => {
        window.addEventListener('click', addBackDrop);

        return () => {
            window.removeEventListener('click', addBackDrop);
        }
    }, [])

    const addBackDrop = (e) => {
        if(!div.current) return
        if(!(div.current.contains(e.target))) {
            setShowDatePicker(false);
        } else if (div.current.contains(e.target)) {
            setShowDatePicker(true)
        }
    }

    useEffect(() => {
        if(preselected && !picked && !showDatePicker){
            div.current.click()
        }
    })

    useEffect(() => {
        if(preselected) {
            const date = new Date(preselected)
            const year = date.getFullYear();
            const month = date.getMonth();
            setDateStamp({
            year,
            month,
            selectedDay: preselected,
            monthDetails:  getMonthDetails(year, month)
            })
        }
    }, [preselected])

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



    const getDayDetails = (args) => {
        let date = args.index - args.firstDay;
        let day = args.index % 7;
        let prevMonth = args.month - 1;
        let prevYear = args.year;
        if(prevMonth < 0) {
            prevMonth = 11;
            prevYear --;
        }
        let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
        let _date = (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) +1;
        let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
        let timestamp = new Date(args.year, args.month, _date).getTime();
        return {
            date: _date,
            day,
            month, 
            timestamp,
            dayString: daysMap[day]
        }
    }

    const getNumberOfDays = (year, month) => {
        return 40 - new Date(year, month, 40).getDate();
    }

    const getMonthDetails = (year, month) => {
        let firstDay = (new Date(year, month)).getDay();
        let numberOfDays = getNumberOfDays(year, month);
        let monthArray = [];
        let rows = 6;
        let currentDay = null;
        let index = 0;
        let cols = 7;
        
        for (let row = 0; row < rows; row++) {
            for (let col=0; col < cols; col++) {
                currentDay = getDayDetails({
                    index,
                    numberOfDays,
                    firstDay,
                    year, 
                    month
                })
                monthArray.push(currentDay);
                index++
            }
        }
        return monthArray;
    }

    const [ dateStamp, setDateStamp ] = useState({
        year,
        month,
        selectedDay: preselected || todayTimestamp,
        monthDetails:  getMonthDetails(year, month),
    })

    const isCurrentDay = (day) => {
        return day.timestamp === todayTimestamp;
    }

    const isSelectedDay = (day) => {
        return day.timestamp === dateStamp.selectedDay;
    }

    const getDateFromDateString = (dateValue) => {
        let dateData = dateValue.split('-').map(d => parseInt(d, 10));
        if(dateData.length < 3) return null;
        let year = dateData[0];
        let month = dateData[1];
        let date = dateData[2];
        return { year, month, date};
    }

    const getMonthStr = (month) => {
        return monthMap[Math.max(Math.min(11, month), 0)] || 'Month';
    }

    const getDateStringFromTimestamp = (timestamp) => {
        let dateObject = new Date(timestamp)
        let month = dateObject.getMonth() +1;
        let date = dateObject.getDate();
        return dateObject.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date)
    }

    const setDate = (dateData) => {
        let selectedDay = new Date(dateData.year, dateData.month - 1, dateData.date).getTime();
        setDateStamp((prev) => ({...prev, selectedDay: selectedDay}))
        if(onChange) {
            onChange(selectedDay);
        }
    }

    const updateDateFromInput = () => {
        let dateValue = input.current.value;
        let dateData = getDateFromDateString(dateValue);
        if(dateData !== null){
            setDate(dateData);
            setDateStamp((prev) => ({
                ...prev,
                year: dateData.year,
                month: dateData.month - 1,
                monthDetails: getMonthDetails(dateData.year, dateData.month -1),
            }))
        }
    }

    const setDateToInput = (timestamp) => {
        let dateString = getDateStringFromTimestamp(timestamp); 
        input.current.value = dateString;
    }

    const onDateClick = (day) => {
        setDateStamp((prev) => ({...prev, selectedDay: day.timestamp}))
        setDateToInput(day.timestamp);
        if(onChange) {
            onChange(day.timestamp);
        }
        setShowDatePicker(false)
        setPicked(true)
    }

    const setYear = (offset) => {
        let year = dateStamp.year + offset;
        let month = dateStamp.month;
        setDateStamp((prev) => ({
            ...prev, 
            year, 
            monthDetails: getMonthDetails(year, month)
        }))
    }

    const setMonth = (offset) => {
        let year = dateStamp.year;
        let month = dateStamp.month + offset;
        if(month === -1) {
            month = 11;
            year --;
        } else if (month === 12) {
            month = 0;
            year ++;
        }
        setDateStamp((prev) => ({
            ...prev,
            year,
            month, 
            monthDetails: getMonthDetails(year, month),
        }))
    }

    const renderCalender = () => {
        let days = dateStamp.monthDetails.map((day, index) => {
            return (
                <div className={'c-day-container ' 
                    + (day.month !== 0 ? ' disabled' : '') 
                    + (isCurrentDay(day) ? ' highlight' : '') 
                    + (isSelectedDay(day) ? ' highlight-green' : '')}
                    key={index}>
                    <div className='cdc-day'>
                        <span onClick={() => onDateClick(day)}>
                            {day.date}
                        </span>
                    </div>
                </div>
            )
        })
        return (
            <div className='c-container'>
                <div className='cc-head'>
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d, i) => <div key={i} className='cch-name'>{d}</div>)}
                </div>
                <div className='cc-body'>
                    {days}
                </div>
            </div>
        )
    }

const containerClass = `mdp-container ${float}`
/* jsx display */
    return (
        <div className='MyDatePicker' ref={div}>
            <div className='mdp-input' id={id} onClick={addBackDrop}>
                <input type='date' ref={input} onChange={updateDateFromInput} onClick={(e) => e.preventDefault()}/>
            </div>
            {showDatePicker ? (
                <div className={containerClass}>
                    <div className='mdpc-head'>
                        <div className='mdpch-button'>
                            <div className='mdpchb-inner' onClick={() => setYear(-1)}>
                                <span className='mdpchbi-left-arrows'></span>
                            </div>
                        </div>
                        <div className='mdpch-button'>
                            <div className='mdpchb-inner' onClick={() => setMonth(-1)}>
                                <span className='mdpchbi-left-arrow'></span>
                            </div>
                        </div>
                        <div className='mdpch-container'>
                            <div className='mdpchc-year'>{dateStamp.year}</div>
                            <div className='mdpchc-month'>{getMonthStr(dateStamp.month)}</div>
                        </div>
                        <div className='mdpch-button'>
                            <div className='mdpchb-inner' onClick={() => setMonth(1)}>
                                <span className='mdpchbi-right-arrow'></span>
                            </div>
                        </div>
                        <div className='mdpch-button'>
                            <div className='mdpchb-inner' onClick={() => setYear(1)}>
                                <span className='mdpchbi-right-arrows'></span>
                            </div>
                        </div>
                    </div>
                    <div className='mdpc-body'>
                        {renderCalender()}
                    </div>
                </div>
            ) : ''}
        </div>
    )
}

export default DatePicker;
