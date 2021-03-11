import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import Button from '../universal/button';
import GetCoords from '../universal/GetCoords.js';
import Input from '../universal/input';
import TextArea from '../universal/textArea';
import { CreateForm, HeadingStyle } from '../Styles/CreateStyles';
import useCreateEntry from '../../hooks/useCreateEntry.js';

const initialState = {
  name: '',
  subtitle: '',
  textInput: '',
  link: '',
  linkText: '',
  lat: '',
  lng: '',
  image: '/images/Easy-schlachthof.jpg',
  collection: 'tips',
};

export default function CreateTip() {
  const auth = useSelector(state => state.firebase.auth);
  const history = useHistory();
  const { formData, handleChange, handleSubmit, handleCoords } = useCreateEntry(
    initialState
  );

  if (!auth.uid) return <Redirect to="/signin" />;

  return (
    <div>
      <HeadingStyle>Create Tip</HeadingStyle>
      <CreateForm
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
      >
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
            name={'Link URL'}
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
