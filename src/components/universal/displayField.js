import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment'
import Button from '../universal/button';

function DisplayField({ data }) {
    const history = useHistory()
    if(data){
        return (
            <div style={boxText}>
                <h5 style={boxHeading}>{data.name}</h5>
                <div style={boxDiv}>
                    <br/>
                    <Button children={'venue concerts'} onClick={() => history.push(`/venue/${data.coords}`)}/>
                    <a href={data.uri}
                    target='_blank'
                    rel="noreferrer" >
                        <img 
                        src="/images/sk-badge-pink.png" 
                        alt="Sonkick Logo" 
                        
                        style={logoStyle}/>
                    </a>
                    <div style={divBottom}>
                    <Button children={<a href={`https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lng},${data.name}`} 
                    target='_blank'
                    rel="noreferrer" 
                    style={{color:'white'}}
                    >Directions</a>} />
                    </div>
                </div>
            </div>
        )
    }else{
        return null;
    }
}


export default DisplayField;
// add a redux connection and list a couple of concerts per venue!!

const boxText = {
    margin: '10px',
    color: 'white',
    contain: 'items',
}

const boxHeading = {
    color: '#f24847db', 
    maxWidth: '220px',
}

const boxDiv = {
    marginLeft: '-5px'
}

const logoStyle = {
    height: '25px', 
    width: '25px', 
    position: 'absolute', 
    top: '30px', 
    right: '30px', 
    cursor: 'pointer'
}

const divBottom = {
    position: 'absolute', 
    bottom: '30px', 
    left: '20px'
}
