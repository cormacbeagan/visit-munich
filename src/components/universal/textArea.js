import React, { useEffect, useRef } from 'react';

function TextArea(props) {
    const { onChange, type, value, id, name, required } = props
    const input = useRef()

    useEffect(() => {
        //if(input.current.value) input.current.focus()
    }, [])

    const handleChange = (e) => {
        onChange(id, e.target.value)
    }

    const handleFocus = (e) => {
        const div = e.target
        div.style.marginTop = '36px'
        div.style.borderColor = '#333'
    }

    return (
            <div style={divStyle}>
               {/*} <label 
                    style={labelStyle} 
                    htmlFor={id} 
                    onClick={() => input.current.focus()}>
                    {name}
                </label>*/}
                <textarea
                    ref={input} 
                    style={inputStyle} 
                    type={type} id={id} 
                    onChange={handleChange} 
                    value={value || 'Text: '} 
                    onFocus={() => {
                        if(input.current.value === 'Text: ') {
                            input.current.value = ''}}
                        }
                    required={required}
                >{value}</textarea>
            </div>
    )
}

export default TextArea;

const divStyle = {
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
    maxWidth: '280px',
}



const inputStyle = {
    margin: '5px',
    padding: '10px',
    outline: 'none',
    fontSize: '18px',
    color: '#bdbdbd',
    backgroundColor: '#464646',
    border: 'none',
    borderBottom: '2px solid #787879',
    transition: 'all 400ms ease',
    width: '90%',
    fontFamily: 'Arial, Helvetica, sans-serif',
    width: '240px',
    height: '90px',
    maxWidth: '280px',
    maxHeight: '175px',
    boxShadow: '0 30px 50px rgba(0, 0, 0, 0.3)'

}
