import React from 'react';
import HomeEntry from './homeEntry';

function HomeBox({ data, url }) {

        return (
            <div style={displayDiv} >
                <HomeEntry
                    data={data}
                    url={url}
                />
            </div>
    )
}

export default HomeBox;

const displayDiv = {
    position: 'relative',
    height: '300px',
    width: '300px',
    margin: '10px',
    backgroundColor: '#51738aeb',
    borderRadius: '20px',
    border: '3px solid #395f78',
    boxShadow: '0 0 40px rgba(0, 0, 0, 0.3)',
}
