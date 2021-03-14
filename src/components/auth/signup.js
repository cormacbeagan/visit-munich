import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/actions/authActions';
import Input from '../universal/input';
import Button from '../universal/button';
import { HeadingStyle } from '../Styles/CreateStyles';
import { ErrorStyle, SignForm } from '../Styles/SignStyles';
import Loading from '../universal/loading';

const initialState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

export default function SignUp() {
  const [formData, setFormData] = useState(initialState);
  const auth = useSelector(state => state.firebase.auth);
  const authError = useSelector(state => state.auth.authError);
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (authError) {
      setLoader(false);
      setErrorMsg(authError);
      setTimeout(() => {
        setErrorMsg('');
      }, 2000);
    }
  }, [authError]);

  if (auth.uid) return <Redirect to="/" />;

  const handleChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(signUp(formData));
    setLoader(true);
  };
  return (
    <div>
      <HeadingStyle>Sign Up</HeadingStyle>
      <SignForm onSubmit={handleSubmit}>
        <Input
          type={'text'}
          id={'firstName'}
          name={'First Name'}
          onChange={handleChange}
          value={formData.firstName}
        />
        <Input
          type={'text'}
          id={'lastName'}
          name={'Last Name'}
          onChange={handleChange}
          value={formData.lastName}
        />
        <Input
          type={'email'}
          id={'email'}
          name={'Email'}
          onChange={handleChange}
          value={formData.email}
        />
        <Input
          type={'password'}
          id={'password'}
          name={'Password'}
          onChange={handleChange}
          value={formData.password}
        />
        <div className="btn-div-sign">
          <Button children={'sign up'} />
        </div>
        <div>
          {errorMsg ? <ErrorStyle>{errorMsg}</ErrorStyle> : null}
          {loader && <Loading />}
        </div>
      </SignForm>
    </div>
  );
}
