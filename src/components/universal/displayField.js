import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment'
import Button from '../universal/button';

function DisplayField({ data }) {
    const history = useHistory()
    console.log(data)
    if(data){
        return (
            <div style={boxText}>
                <h5 style={{color: '#f24847db'}}>{data.name}</h5>
                <div style={{marginLeft: '-5px'}}>
                   {/*  <Button children={<a href={`https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lng},${data.name}`} 
                    target='_blank'
                    rel="noreferrer" 
                    style={{color:'white'}}
                    >Directions</a>} /> only works when you click the text, need to pass a function to onclick*/}
                    <br/>
                    <Button children={'all concerts'} onClick={() => history.push(`/concerts`)}/>
                    <Button children={'venue concerts'} onClick={() => history.push(`/venue/${data.coords}`)}/>
                    <a href={data.uri}
                    target='_blank'
                    rel="noreferrer" >
                        <img 
                        src="/images/sk-badge-pink.png" 
                        alt="Sonkick Logo" 
                        height="25px" width="25px" 
                        style={{position: 'absolute', top: '30px', right: '30px', cursor: 'pointer'}}/>
                    </a>
                </div>
            </div>
        )
    }else{
        return null;
    }
}

const boxText = {
    margin: '10px',
    color: 'white',
    contain: 'items',
}

export default DisplayField;
