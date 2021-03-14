import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  return (
    <div>
      <ImgStyle src={data.image} alt="Wall Thumbnail" />
    </div>
  );
}

DisplayImage.propTypes = {
  data: PropTypes.object,
};

export default DisplayImage;
