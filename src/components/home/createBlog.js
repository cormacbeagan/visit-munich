import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import useCreateEntry from '../../hooks/useCreateEntry';
import { CreateForm, HeadingStyle } from '../Styles/CreateStyles';
import Button from '../universal/button';
import Input from '../universal/input';
import TextArea from '../universal/textArea';
const myId = process.env.REACT_APP_MY_ID;

const initialState = {
  name: '',
  subtitle: '',
  textInput: '',
  link: '',
  linkText: '',
  image: '/images/Easy-schlachthof.jpg', // never used!
  collection: 'blogs',
};

export default function CreateBlog() {
  const history = useHistory();
  const auth = useSelector(state => state.firebase.auth);
  const { handleChange, handleSubmit, formData } = useCreateEntry(initialState);

  if (auth.uid !== myId) return <Redirect to="/signin" />;

  return (
    <div>
      <HeadingStyle>Create Homepage Entry</HeadingStyle>
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
            name={'Blog Text'}
            onChange={handleChange}
            value={formData.textInput}
            required={true}
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
            name={'Button Text'}
            onChange={handleChange}
            value={formData.linkText}
          />
        </div>
        <div>
          <Button children={'create'} />
          <Button children={'cancel'} onClick={() => history.push('/')} />
        </div>
      </CreateForm>
    </div>
  );
}
