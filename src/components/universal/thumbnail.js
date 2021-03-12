import PropTypes from 'prop-types';
import styled from 'styled-components';

const ThumbnailStyle = styled.img`
  width: 80px;
  height: 80px;
  overflow: hidden;
  margin: 4px;
`;
function Thumbnail(props) {
  const { src } = props;
  return <ThumbnailStyle src={src} alt="Thumbnail" />;
}

Thumbnail.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Thumbnail;
