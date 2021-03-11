import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/actions/authActions';
import Input from '../universal/input';
import Button from '../universal/button';

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

  if (auth.uid) return <Redirect to="/" />;

  const handleChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(signUp(formData));
  };
  return (
    <div>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h3 style={heading}>Sign Up</h3>
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
        <Button children={'sign up'} />
        <div style={{ color: 'red', textAlign: 'center' }}>
          {authError ? <p style={errorStyle}>{authError}</p> : null}
        </div>
      </form>
    </div>
  );
}

const formStyle = {
  margin: '150px auto',
  maxWidth: '600px',
  background: 'var(--offWhite)',
  padding: '20px',
  borderRadius: '5px',
};

const heading = {
  marginLeft: '100px',
  fontSize: '24px',
  color: '#333',
};

const errorStyle = {
  color: '#ffacac',
  fontSize: '20px',
  textAlign: 'center',
};
