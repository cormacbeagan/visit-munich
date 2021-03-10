import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { createTip } from '../../store/actions/tipActions.js';
import Button from '../universal/button';
import GetCoords from '../universal/GetCoords.js';
import Input from '../universal/input';
import TextArea from '../universal/textArea';
import { CreateForm, HeadingStyle } from '../Styles/CreateStyles';

const initialState = {
  name: '',
  subtitle: '',
  textInput: '',
  link: '',
  linkText: '',
  lat: '',
  lng: '',
  image: '/images/Easy-schlachthof.jpg',
};

function CreateTip(props) {
  const { createTip, auth } = props;
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
      createTip(formData);
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
      <HeadingStyle>Create Tip</HeadingStyle>
      <CreateForm onSubmit={handleSubmit}>
        <div>
          <Input
            type={'text'}
            id={'name'}
            name={'Name'}
            onChange={handleChange}
            value={formData.name}
            required={true}
          />
          <Input
            type={'text'}
            id={'subtitle'}
            name={'Subtitle'}
            onChange={handleChange}
            value={formData.subtitle}
            required={true}
          />
          <TextArea
            type={'textarea'}
            id={'textInput'}
            name={'Tip'}
            onChange={handleChange}
            value={formData.textInput}
          />
          <Input
            type={'text'}
            id={'link'}
            name={'Link'}
            onChange={handleChange}
            value={formData.link}
          />
          <Input
            type={'text'}
            id={'linkText'}
            name={'Link text'}
            onChange={handleChange}
            value={formData.linkText}
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
          <Button children={'cancel'} onClick={() => history.push('/tips')} />
        </div>
      </CreateForm>
    </div>
  );
}

CreateTip.propTypes = {
  auth: PropTypes.object,
  createTip: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createTip: tip => dispatch(createTip(tip)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTip);
