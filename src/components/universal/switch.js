import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import '../../styles/button.css'

function Switch(props) {
    const { onClick, switched } = props
    const checkBox = useRef()
    useEffect(() => {
        if (switched) {
            checkBox.current.checked = switched
        }
    }, [])

    const handleChange = e => {
        onClick(e.target.checked)
    }

    return (
        <label className='switch' aria-label='dark mode button'>
            <input type='checkbox' onChange={handleChange} ref={checkBox} />
            <span className='slider round'></span>
        </label>
    )
}

Switch.propTypes = {
    onClick: PropTypes.func.isRequired,
    switched: PropTypes.bool,
}

export default Switch
