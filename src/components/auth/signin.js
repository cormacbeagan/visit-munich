import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { resetPassword, signIn } from '../../store/actions/authActions';
import Button from '../universal/button';
import Input from '../universal/input';

const initialState = {
  email: '',
  password: '',
};

function SignIn(props) {
  const { signIn, authError, auth, authMsg, resetPassword } = props;
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
    signIn(formData);
  };

  const handleChange = (type, value) => {
    setFormData(prev => ({ ...prev, [type]: value }));
  };

  const handleReset = () => {
    if (resetting) {
      resetPassword(formData.email);
      setFormData(initialState);
    } else {
      setResetting(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h3 style={heading}>Sign In</h3>
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
        <div>
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
        <div className="red-text center">
          {authError ? <p style={errorStyle}>{authError}</p> : null}
          {msg ? <p style={errorStyle}>{msg}</p> : null}
        </div>
      </form>
    </div>
  );
}

SignIn.propTypes = {
  auth: PropTypes.object,
  authError: PropTypes.string,
  authMsg: PropTypes.string,
  resetPassword: PropTypes.func,
  signIn: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    authMsg: state.auth.authMsg,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds)),
    resetPassword: email => dispatch(resetPassword(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const formStyle = {
  margin: '150px auto',
  maxWidth: '600px',
  background: '#333',
  padding: '20px',
};

const heading = {
  color: '#333',
  marginLeft: '90px',
};

const errorStyle = {
  color: '#ffacac',
  fontSize: '20px',
  textAlign: 'center',
};
