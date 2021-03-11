import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import Button from '../universal/button';
import GetCoords from '../universal/GetCoords';
import Input from '../universal/input';
import TextArea from '../universal/textArea';
import { CreateForm, HeadingStyle } from '../Styles/CreateStyles';
import useCreateEntry from '../../hooks/useCreateEntry';

const initialState = {
  name: '',
  description: '',
  lat: '',
  lng: '',
  image: '/images/Easy-schlachthof.jpg',
  collection: 'projects',
};

export default function CreateWall() {
  const history = useHistory();
  const auth = useSelector(state => state.firebase.auth);
  const { formData, handleChange, handleSubmit, handleCoords } = useCreateEntry(
    initialState
  );

  if (!auth.uid) return <Redirect to="/signin" />;

  return (
    <div>
      <HeadingStyle>Create Wall</HeadingStyle>
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
