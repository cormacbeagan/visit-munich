import PropTypes from 'prop-types'
import { useState, useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import Button from '../universal/button'
import { useDimensionSetter } from '../../hooks/useDimensionSetter'
import { FiExternalLink } from 'react-icons/fi'
dayjs.extend(advancedFormat)

function Concert(props) {
    const { data, handleBackToMap } = props
    const [hover, setHover] = useState(false)
    const [width, height] = useDimensionSetter()
    const [padding, setPadding] = useState('40px')
    const link = useRef()

    useEffect(() => {
        if (width > 800) {
            setPadding('40px')
        } else {
            setPadding('20px')
        }
    }, [width])

    const handleBack = () => {
        handleBackToMap(data.id)
    }
    const containerStyle = {
        backgroundColor: '#a7a7a733',
        minHeight: '80px',
        width: '76%',
        margin: '20px auto',
        padding: padding,
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
        color: '#e2e2e2',
    }

    return (
        <div style={containerStyle}>
            <h3 style={{ ...lowlight, ...noMargin }}>
                {dayjs(data.start.dateTime || data.start.date).format(
                    'ddd Do MMM YYYY'
                )}
            </h3>
            <h2 style={lowlight}>
                Name:{' '}
                <span style={highlight}>
                    {data.displayName.replace(/ *\([^)]*\) */g, '')}
                </span>
            </h2>
            <p style={{ ...noMargin, ...lowlight }}>
                Venue: <span style={highlight}>{data.venue.displayName}</span>
            </p>
            {data.status !== 'ok' && (
                <p style={lowlight}>
                    Status: <span style={highlight}>{data.status}</span>
                </p>
            )}
            <div style={flexDiv}>
                <p style={{ ...bigP, ...noMargin, ...lowlight }}>Bands: </p>
                {data.performance.map(band => {
                    return (
                        <div style={bandDiv} key={band.id}>
                            <div style={flexDiv}>
                                <p
                                    style={{
                                        ...highlight,
                                        ...bigP,
                                        ...noMargin,
                                    }}
                                >
                                    {band.displayName}
                                </p>
                                <a
                                    href={band.artist.uri}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    <img
                                        src='/images/sk-badge-pink.png'
                                        alt='Sonkick Logo'
                                        style={smallLogo}
                                    />
                                </a>
                                <a
                                    href={`https://open.spotify.com/search/${band.displayName}`}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    <img
                                        src='/images/Spotify_Icon_RGB_Green.png'
                                        alt='Spotify Logo'
                                        style={smallLogo}
                                    />
                                </a>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div style={btnDiv}>
                <div
                    onMouseEnter={() => setHover(true)}
                    onMouseOver={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onMouseOut={() => setHover(false)}
                >
                    <Button
                        children={
                            <div style={linkStyle}>
                                {!hover ? (
                                    <div>
                                        Details{' '}
                                        <FiExternalLink
                                            style={{ marginBottom: '-2px' }}
                                        />
                                    </div>
                                ) : (
                                    <img
                                        src='/images/by-songkick-pink.svg'
                                        alt='Sonkick Logo'
                                        style={skButton}
                                    />
                                )}
                            </div>
                        }
                        onClick={() => link.current.click()}
                    />
                    <a
                        href={data.uri}
                        ref={link}
                        target='_blank'
                        rel='noreferrer'
                        style={{ display: 'none' }}
                    >
                        Back to map
                    </a>
                </div>
                <Button onClick={handleBack} children={'Back'} />
            </div>
        </div>
    )
}

Concert.propTypes = {
    data: PropTypes.object,
    handleBackToMap: PropTypes.func,
}

export default Concert

const highlight = {
    color: '#cecbcb',
}

const lowlight = {
    color: '#dfbaaa',
    fontWeight: '600',
}

const noMargin = {
    margin: '0',
}

const bigP = {
    fontSize: '18px',
}

const flexDiv = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
}

const smallLogo = {
    margin: '0 8px',
    cursor: 'pointer',
    height: '20px',
    width: '20px',
}

const skButton = {
    left: '20px',
    height: '25px',
    width: '75px',
    cursor: 'pointer',
}

const bandDiv = {
    marginLeft: '10px',
}

const btnDiv = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
}

const linkStyle = {
    color: '#e2e2e2',
    width: '95px',
    maxHeight: '18px',
    overflow: 'hidden',
}
