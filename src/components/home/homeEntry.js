import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../universal/button';
import { connect } from 'react-redux';
import BlogTextDisplay from './blogTextDisplay';

function HomeEntry({ data, auth, url }) {
    const history = useHistory()
    const link = useRef()
    let button = null;
    if(data.id) {
        if(data.link) {
            const check = data.link.includes('http')
            if(check) {
                button = (<div>
                            <Button children={data.linkText} onClick={() => link.current.click()}/>
                            <a href={data.link} 
                                ref={link}
                                rel="noreferrer" 
                                style={{display:'none'}}
                                target='_blank'></a>
                            </div>)
            } else {
                button = <Button children={data.linkText} onClick={() => history.push(data.link)} />
            }
        }

    const handleEdit = () => {
        if(url === '/editblog'){
            history.push(`/editblog/${data.id}`)
        } else if (url === '/tips') {
            history.push(`/edittip/${data.id}`)
        }
    }
        return (
            <div style={boxText}>
                <h2 style={boxHeading}>{data.name}</h2>
                <h3 style={boxSubHeading}>{data.subtitle}</h3>
                <div style={boxDiv}>
                    <BlogTextDisplay data={data}/>
                    <div style={divBottom}>
                        {button}                        
                        {auth.uid && <Button onClick={handleEdit} children={'Edit'} />}
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps)(HomeEntry);

const boxText = {
    margin: '10px',
    color: '#ffffff',
    contain: 'items',
}

const boxHeading = {
    color: '#243443', 
    maxWidth: '220px',
}

const boxSubHeading = {
    color: '#dfbaaa', 
    maxWidth: '220px',
}

const boxDiv = {
    marginLeft: '5px'
}

const divBottom = {
    position: 'absolute', 
    bottom: '15px', 
    right: '15px',
    display: 'flex',
    flexDirection: 'row',
}