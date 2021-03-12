import PropTypes from 'prop-types';
import { useState } from 'react';
import DatePicker from '../universal/datePicker';
import Button from '../universal/button';
import styled from 'styled-components';

const OuterDiv = styled.div`
  width: 100%;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 88;
  min-height: 60px;
  height: auto;
  background: var(--middleBlue);
`;

const DateCont = styled.div`
  max-width: 800px;
  margin: 5px auto;
  margin-top: 20px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
`;

function DateForm({ handleDates, name }) {
  const [preselected, setPreselected] = useState();
  const [dates, setDates] = useState({
    arrival: '',
    departure: '',
  });

  const onChangeOne = timestamp => {
    setPreselected(timestamp);
    setDates(prev => ({ ...prev, arrival: new Date(timestamp) }));
  };

  const onChangeTwo = timestamp => {
    setDates(prev => ({ ...prev, departure: new Date(timestamp) }));
  };

  const handleSubmit = () => {
    const today = Date.now();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (
      !(dates.arrival instanceof Date) ||
      !(dates.departure instanceof Date)
    ) {
      alert('Invalid input');
      return;
    } else if (dates.departure < dates.arrival) {
      alert('Departure before arrival!');
      return;
    } else if (!(dates.arrival > yesterday)) {
      alert('Dates have to be in the future');
      return;
    }
    handleDates(dates);
  };

  return (
    <div>
      <OuterDiv>
        <DateCont>
          <div style={{ marginTop: '10px' }}>
            <DatePicker
              onChange={onChangeOne}
              float={'float-left'}
              id={'arrival'}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <DatePicker
              onChange={onChangeTwo}
              float={'float-right'}
              preselected={preselected}
              id={'departure'}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <Button children={name} onClick={handleSubmit} />
          </div>
        </DateCont>
      </OuterDiv>
    </div>
  );
}

DateForm.propTypes = {
  handleDates: PropTypes.func,
  name: PropTypes.string,
};

export default DateForm;
