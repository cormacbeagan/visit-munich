import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../universal/button';
import { useSelector } from 'react-redux';
import { FiExternalLink } from 'react-icons/fi';
import Loading from '../universal/loading';
const myId = process.env.REACT_APP_MY_ID;

export default function HomeEntry(props) {
  const { data, url, handleEditMode } = props;
  const auth = useSelector(state => state.firebase.auth);
  const history = useHistory();
  const link = useRef();
  let button = null;

  if (data.authorFirstName) {
    if (data.link) {
      const check = data.link.includes('http');
      if (check) {
        button = (
          <div>
            <Button
              children={
                <div>
                  {data.linkText}{' '}
                  <FiExternalLink style={{ marginBottom: '-2px' }} />
                </div>
              }
              onClick={() => link.current.click()}
            />
            <a
              href={data.link}
              ref={link}
              rel="noreferrer"
              style={{ display: 'none' }}
              target="_blank"
            >
              {data.linkText}
            </a>
          </div>
        );
      } else {
        button = (
          <Button
            children={data.linkText}
            onClick={() => history.push(data.link)}
          />
        );
      }
    }

    const handleEdit = () => {
      if (url === '/editblog') {
        history.push(`/editblog/${data.id}`);
      } else if (url === '/tips') {
        history.push(`/edittip/${data.id}`);
      } else {
        handleEditMode();
      }
    };
    return (
      <div style={boxText}>
        <h2 style={boxHeading}>{data.name}</h2>
        <h3 style={boxSubHeading}>{data.subtitle}</h3>
        <div style={boxDiv}>
          <div style={{ marginLeft: '-5px' }}>
            <p style={label}>{data.textInput}</p>
          </div>
          <div style={divBottom}>
            {button}
            {(auth.uid === myId || auth.uid === data.authorId) && (
              <Button onClick={handleEdit} children={'Edit'} />
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
}

HomeEntry.propTypes = {
  data: PropTypes.object,
  handleEditMode: PropTypes.func,
  url: PropTypes.string,
};

const boxText = {
  margin: '10px',
  color: '#ffffff',
  contain: 'items',
};

const boxHeading = {
  color: '#243443',
  maxWidth: '220px',
};

const boxSubHeading = {
  color: '#dfbaaa',
  maxWidth: '220px',
};

const boxDiv = {
  marginLeft: '5px',
};

const divBottom = {
  position: 'absolute',
  bottom: '15px',
  right: '15px',
  display: 'flex',
  flexDirection: 'row',
};

const label = {
  margin: '0',
  color: 'white',
};
