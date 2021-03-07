import PropTypes from 'prop-types';
import { useState } from 'react';
import Carousel from './carousel';

function DisplayImage({ data }) {
  const [display, setDisplay] = useState({ display: 'none' });
  const [hover, setHover] = useState(false);

  const handleModal = () => {
    setDisplay({ display: 'block' });
  };

  const closeModal = () => {
    setDisplay({ display: 'none' });
  };

  return (
    <div>
      <div>
        <Carousel
          id={data.id}
          closeModal={closeModal}
          data={data}
          display={display}
        />
      </div>
      <button onClick={handleModal} style={imageDiv}>
        <img
          onMouseEnter={() => setHover(!hover)}
          onMouseLeave={() => setHover(!hover)}
          style={hover ? imageHoverStyle : imageStyle}
          src={data.image}
          alt="Wall Thumbnail"
        />
      </button>
    </div>
  );
}

DisplayImage.propTypes = {
  data: PropTypes.object,
};

export default DisplayImage;

const imageDiv = {
  alignItems: 'center',
  width: '300px',
  height: '300px',
  overflow: 'hidden',
  background: 'grey',
  backgroundPosition: 'center center',
  backgroundSize: '305px 305px',
  bagroundRepeat: 'no-repeat',
  borderRadius: '20px',
};

const imageStyle = {
  height: '300px',
  width: '300px',
  objectFit: 'cover',
  transition: 'opacity 0.2s ease',
};

const imageHoverStyle = {
  cursor: 'pointer',
  height: '302px',
  width: '302px',
  objectFit: 'cover',
  opacity: '0.8',
  transition: 'all 400ms ease',
};
