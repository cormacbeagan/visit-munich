import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../universal/button';
import { useSelector } from 'react-redux';
import { FiExternalLink } from 'react-icons/fi';
import Loading from '../universal/loading';
import styled from 'styled-components';
const myId = process.env.REACT_APP_MY_ID;

const BoxText = styled.div`
  margin: 10px;
  color: var(--white);
  h2 {
    color: var(--darkBlue);
    max-width: 220px;
  }
  h3 {
    color: var(--lightPink);
    max-width: 220px;
  }
`;

const BottomBtns = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  display: flex;
  flex-direction: row;
`;

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
      <BoxText>
        <h2>{data.name}</h2>
        <h3>{data.subtitle}</h3>
        <p>{data.textInput}</p>
        <BottomBtns>
          {button}
          {(auth.uid === myId || auth.uid === data.authorId) && (
            <Button onClick={handleEdit} children={'Edit'} />
          )}
        </BottomBtns>
      </BoxText>
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
