import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ColumnSlider from '../universal/columnSlider';
import IconSlider from './iconSlider';

const DisplayCont = styled.div`
  position: relative;
  height: 295px;
  width: 260px;
  margin: 10px;
  background: var(--lightBlue);
  border-radius: 20px;
  border: 3px solid #395f78;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
  text-align: center;
  padding: 0px 20px 5px 20px;
  overflow: hidden;
`;

const RowStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  a {
    color: white;
    text-decoration: none;
    font-size: 24px;
    margin: 4px;
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

function ScrollBox({ data }) {
  return (
    <DisplayCont>
      <RowStyle>
        <Link to={data[0].cloudcover ? '/weather' : '/live'}>
          {data[0].cloudcover ? 'Weather' : 'Concerts'}
        </Link>
      </RowStyle>
      <ColumnSlider>
        <IconSlider data={data} />
      </ColumnSlider>
    </DisplayCont>
  );
}

ScrollBox.propTypes = {
  data: PropTypes.array,
};

export default ScrollBox;
