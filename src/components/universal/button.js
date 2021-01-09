import React from 'react';

function Button(props) {
    const { children, onClick } = props
    return (
        <button 
            onClick={onClick} 
            className="btn grey darken-2 z-depth-0" 
            style={{margin: '5px', padding: 'auto 15px', verticalAlign: 'center', color: 'white'}}>
            {children}
        </button>
    )
}

export default Button;