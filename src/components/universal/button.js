import React from 'react';

function Button(props) {
    const { children, onClick } = props
    return (
        <button 
            onClick={onClick} 
            className="btn grey darken-2 z-depth-0" 
            style={buttonStyle}>
            {children}
        </button>
    )
}

export default Button;

const buttonStyle = {
    margin: '5px', 
    padding: 'auto 15px', 
    verticalAlign: 'center', 
    color: 'white', 
    boxShadow: '0 20px 8px rgba(0,0,0,0.6)!important',
}