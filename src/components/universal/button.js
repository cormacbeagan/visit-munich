import React, { useRef } from 'react';
import '../../styles/button.css';

function Button(props) {
    const { children, onClick } = props
    
    return (
        <button 
            onClick={onClick} 
            className="btn-universal">
            {children}
        </button>
    )
}

export default Button;
