import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import Carousel from './carousel';

const ImgButton = styled.button`
  align-items: center;
  width: 30rem;
  height: 30rem;
  overflow: hidden;
  background: grey;
  background-position: center center;
  background-size: 305px 305px;
  background-repeat: no-repeat;
  border-radius: 2rem;
`;

const ImgStyle = styled.img`
  height: 300px;
  width: 300px;
  object-fit: cover;
  transition: all 200ms ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.001);
    opacity: 0.8;
  }
`;

function DisplayImage({ data }) {
  const [display, setDisplay] = useState({ display: 'none' });

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
      <ImgButton onClick={handleModal}>
        <ImgStyle src={data.image} alt="Wall Thumbnail" />
      </ImgButton>
    </div>
  );
}

DisplayImage.propTypes = {
  data: PropTypes.object,
};

export default DisplayImage;
