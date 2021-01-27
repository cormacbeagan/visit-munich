import React, { useEffect, useRef } from 'react';

function Input(props) {
    const { onChange, type, value, id, name, required } = props
    const input = useRef()

    useEffect(() => {
        if(input.current.value) input.current.focus()
    }, [])

    const handleChange = (e) => {
        onChange(id, e.target.value)
    }


    const handleFocus = (e) => {
        const div = e.target
        div.style.marginTop = '36px'
    }

    return (
        <div>
            <div style={divStyle}>
                <label 
                    style={labelStyle} 
                    htmlFor={id} 
                    onClick={() => input.current.focus()}>
                    {name}
                </label>
                <input
                    ref={input} 
                    style={inputStyle} 
                    type={type} id={id} 
                    onChange={handleChange} 
                    onFocus={handleFocus}
                    value={value} 
                    required={required}
                    autoComplete='off'
                />
            </div>
        </div>
    )
}

export default Input;

const divStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
    maxWidth: '900px',
}

const labelStyle = {
    marginLeft: '5px',
    marginBottom: '-36px',
    zIndex: '1',
    color: '#787879',
    //color: '#e8e8e8',
}

const inputStyle = {
    margin: '5px',
    outline: 'none',
    lineHeight: '36px',
    fontSize: '24px',
    color: '#bdbdbd',
    backgroundColor: 'inherit',
    border: 'none',
    borderBottom: '2px solid #787879',
    transition: 'all 400ms ease',
    width: '90%'
}
