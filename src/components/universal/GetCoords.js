import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { location } from '../universal/mapData';
import { mapStyleLight } from '../universal/mapData';
import Button from './button';
import Map from './map';
const initState = { lat: 0, lng: 0, set: false, id: 1 };

const ButtonsDiv = styled.div`
  position: fixed;
  top: 100px;
  right: 50px;
  z-index: 99;
`;

export default function GetCoords({ passCoords, oldCoords }) {
  const [showMap, setShowMap] = useState(false);
  const [coords, setCoords] = useState(initState);

  useEffect(() => {
    if (oldCoords) {
      setCoords({ lat: oldCoords.lat, lng: oldCoords.lng, set: true, id: 1 });
    }
  }, [oldCoords]);

  const handleCoords = e => {
    setCoords({ lat: e.lat, lng: e.lng, set: true, id: 1 });
  };

  const handlePass = () => {
    passCoords(coords);
    setShowMap(false);
  };
  return (
    <div>
      <Button
        type="button"
        onClick={() => {
          setShowMap(true);
        }}
      >
        pick location on Map
      </Button>
      {showMap && (
        <div>
          <Map
            projects={[coords]}
            location={location}
            zoomLevel={12}
            color={'#b81b16'}
            mapStyle={mapStyleLight}
            getCoords={handleCoords}
            handleInfo={a => console.log(a)}
          />
          <ButtonsDiv>
            {coords.set && (
              <Button type="button" onClick={handlePass}>
                Set Coords
              </Button>
            )}
            <Button
              type="button"
              onClick={() => {
                setShowMap(false);
                setCoords(initState);
              }}
            >
              Back
            </Button>
          </ButtonsDiv>
        </div>
      )}
    </div>
  );
}
