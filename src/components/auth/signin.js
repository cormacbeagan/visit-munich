import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { resetPassword, signIn } from '../../store/actions/authActions';
import Button from '../universal/button';
import Input from '../universal/input';
import { HeadingStyle } from '../Styles/CreateStyles';
import { ErrorStyle, SignForm } from '../Styles/SignStyles';

const initialState = {
  email: '',
  password: '',
};

export default function SignIn() {
  const auth = useSelector(state => state.firebase.auth);
  const authError = useSelector(state => state.auth.authError);
  const authMsg = useSelector(state => state.auth.authMsg);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [resetting, setResetting] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    setMsg(authMsg);
    setTimeout(() => {
      setMsg('');
    }, 2000);
  }, [authMsg]);

  if (auth.uid) return <Redirect to="/" />;

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(signIn(formData));
  };

  const handleChange = (type, value) => {
    setFormData(prev => ({ ...prev, [type]: value }));
  };

  const handleReset = () => {
    if (resetting) {
      dispatch(resetPassword(formData.email));
      setFormData(initialState);
    } else {
      setResetting(true);
    }
  };

  return (
    <div>
      <HeadingStyle>Sign In</HeadingStyle>
      <SignForm onSubmit={handleSubmit}>
        <div>
          <Input
            type={'email'}
            id={'email'}
            name={'Email'}
            onChange={handleChange}
            value={formData.email}
          />
          {!resetting && (
            <Input
              type={'password'}
              id={'password'}
              name={'Password'}
              onChange={handleChange}
              value={formData.password}
            />
          )}
        </div>
        <div className="btn-div-sign">
          {!resetting && <Button children={'login'} type={'submit'} />}
          <Button
            type="button"
            children={'Reset Password'}
            onClick={handleReset}
          />
          {resetting && (
            <Button
              type="button"
              children={'Back'}
              onClick={() => {
                setFormData(initialState);
                setResetting(false);
              }}
            />
          )}
        </div>
        <div>
          {authError ? <ErrorStyle>{authError}</ErrorStyle> : null}
          {msg ? <ErrorStyle>{msg}</ErrorStyle> : null}
        </div>
      </SignForm>
    </div>
  );
}
