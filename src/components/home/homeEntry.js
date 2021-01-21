import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../universal/button';
import { connect } from 'react-redux';
import BlogTextDisplay from './blogTextDisplay';

function HomeEntry({ data, auth }) {
    const history = useHistory()

    if(data.id) {
        return (
            <div style={boxText}>
                <h2 style={boxHeading}>{data.name}</h2>
                <h3 style={boxSubHeading}>{data.subtitle}</h3>
                <div style={boxDiv}>
                    <BlogTextDisplay data={data}/>
                    <div style={divBottom}>
                        {data.link && <Button children={<a href={data.link} 
                        rel="noreferrer" 
                        style={{color:'white'}}
                        >{data.linkText}</a>} />}
                        {auth.uid && <Button onClick={() => history.push(`/editblog/${data.id}`)} children={'Edit Blog'} />}
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
    color: '#272727', 
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
    opacity: '1',
}

const label = {
    margin: '0',
    color: '#black',
}