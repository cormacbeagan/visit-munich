import PropTypes from 'prop-types'
import { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { connect } from 'react-redux'
import Button from '../universal/button'
import Loading from '../universal/loading'
import { FiExternalLink } from 'react-icons/fi'
dayjs.extend(advancedFormat)

function DisplayText(props) {
    const { data, auth, handleEditMode } = props
    const history = useHistory()
    const link = useRef()
    let url

    const handleEdit = () => {
        if (history.location.pathname.includes('/wall/')) {
            handleEditMode()
        } else {
            history.push(`/wall/${data.id}`)
        }
    }

    if (data.authorFirstName) {
        return (
            <div style={boxText}>
                <h3 style={heading}>{data.name}</h3>
                <p>{data.description}</p>
                <div style={timeStyle}>
                    {data.updatedAt ? (
                        <p style={highlight}>
                            Updated{' '}
                            <span style={lowlight}>
                                {dayjs(data.updatedAt.toDate()).format(
                                    'ddd Do MMM YYYY'
                                )}
                            </span>
                        </p>
                    ) : (
                        <p style={highlight}>
                            Created{' '}
                            <span style={lowlight}>
                                {dayjs(data.createdAt.toDate()).format(
                                    'ddd Do MMM YYYY'
                                )}
                            </span>
                        </p>
                    )}
                </div>
                <div style={divBottom}>
                    <Button
                        children={
                            <div>
                                directions{' '}
                                <FiExternalLink
                                    style={{ marginBottom: '-2px' }}
                                />
                            </div>
                        }
                        onClick={() => link.current.click()}
                    />
                    <a
                        ref={link}
                        href={`https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lng}`}
                        target='_blank'
                        rel='noreferrer'
                        style={{ display: 'none' }}
                    >
                        google maps
                    </a>
                    {auth.uid && (
                        <Button onClick={handleEdit} children={'Edit'} />
                    )}
                </div>
            </div>
        )
    } else {
        return <Loading />
    }
}

DisplayText.propTypes = {
    auth: PropTypes.object,
    handleEditMode: PropTypes.func,
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps)(DisplayText)

const boxText = {
    margin: '10px',
    color: '#cecbcb',
}

const heading = {
    color: '#243443',
}

const lowlight = {
    color: '#243443',
}

const highlight = {
    margin: '0',
    color: '#cecbcb',
}

const divBottom = {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
}

const timeStyle = {
    position: 'absolute',
    bottom: '70px',
    right: '20px',
}
