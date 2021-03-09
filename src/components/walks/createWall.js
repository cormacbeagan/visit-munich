import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { createProject } from '../../store/actions/projectActions';
import BoxWrapper from '../universal/boxWrapper';
import Button from '../universal/button';
import GetCoords from '../universal/GetCoords';
import Input from '../universal/input';
import TextArea from '../universal/textArea';

const CreateForm = styled.form`
  margin: 2rem auto;
  max-width: 60rem;
  background: var(--offWhite);
  padding: 2rem 1rem;
  border-radius: 5px;
  box-shadow: var(--smallBs);
  @media only screen and (max-width: 480px) {
    padding: 1rem 0.5rem;
    width: 95%;
    margin: 0 auto;
    box-sizing: border-box;
  }
`;

const HeadingStyle = styled.h1`
  margin: 10rem 0 3rem 0;
  text-align: center;
  font-size: 3.5rem;
  color: var(--white);
`;

const initialState = {
  name: '',
  description: '',
  lat: '',
  lng: '',
  image: '/images/Easy-schlachthof.jpg',
};

function CreateWall(props) {
  const { createProject, auth } = props;
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();

  if (!auth.uid) return <Redirect to="/signin" />;

  const handleChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCoords = coords => {
    setFormData(prev => ({
      ...prev,
      lat: coords.lat.toString(),
      lng: coords.lng.toString(),
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const check = checkCoords(formData.lat, formData.lng);
    if (check) {
      createProject(formData);
    } else {
      alert('Invalid Geolocation');
      return;
    }
    setFormData(initialState);
    history.push(`/profile/${auth.uid}`);
  };

  const checkCoords = (lat, lng) => {
    const valLat = parseFloat(lat);
    const valLng = parseFloat(lng);
    if (
      !isNaN(valLat) &&
      valLat <= 90 &&
      valLat >= -90 &&
      !isNaN(valLng) &&
      valLng <= 180 &&
      valLng >= -180
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <HeadingStyle>Create Wall</HeadingStyle>
      <CreateForm onSubmit={handleSubmit}>
        <div>
          <Input
            type={'text'}
            id={'name'}
            name={'Wall Title'}
            onChange={handleChange}
            value={formData.name}
            required={true}
          />
          <TextArea
            type={'textarea'}
            id={'description'}
            name={'Wall description'}
            onChange={handleChange}
            value={formData.description}
            required={true}
          />
          <Input
            type={'text'}
            id={'lat'}
            name={'Latitude'}
            onChange={handleChange}
            value={formData.lat}
            required={true}
          />
          <Input
            type={'text'}
            id={'lng'}
            name={'Longditude'}
            onChange={handleChange}
            value={formData.lng}
            required={true}
          />
          <GetCoords passCoords={handleCoords} />
        </div>
        <div>
          <Button children={'create'} />
          <Button children={'cancel'} onClick={() => history.push('/walks')} />
        </div>
      </CreateForm>
    </div>
  );
}

CreateWall.propTypes = {
  auth: PropTypes.object,
  createProject: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createProject: project => dispatch(createProject(project)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateWall);
