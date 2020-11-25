import React, { useState, useEffect, Fragment } from 'react';
import Map from './map';
import Display from './display';
import { location, grafData } from './mapData';


const zoomLevel = 12;

function Walks(props) {
    const [ displayData, setDisplayData ] = useState({})

    const handleInfo = (id) => {
        if(id) {
            const index = id -= 1
            setDisplayData(grafData[index])        
        }
    }

    return (
            <div style={container}> 
                <div style={boxes}>
                    <div style={map}>
                        <Map
                        handleInfo={handleInfo}
                        location={location}
                        zoomLevel={12}
                        grafData={grafData}
                        />
                    </div>
                    <div>
                        <h2 style={boxHeading}>Street Art</h2>
                        <Display 
                            type={'image'}
                            data={displayData}
                            />
                        <Display 
                            type={'text'}
                            data={displayData}
                            />
                    </div>
                </div>
            </div>
    )
}

const container = {
    margin: '50px',
    maxHeight: '1000px',
    maxWidth: 'cover',
    contain: 'items',
    display: 'contain',
};

const boxes = {
    display: 'flex',
    flexDirection: 'row',
    align: 'baseline',
}

const map = {

};

const boxHeading = {
    fontSize: '1.5rem',
    padding: '20px',
    paddingLeft: '10px',
    textAlign: 'center',
  };



export default Walks;

