import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { connect } from 'react-redux';
import Button from '../universal/button';
import Loading from '../universal/loading';
import { FiExternalLink } from 'react-icons/fi';
import styled from 'styled-components';
dayjs.extend(advancedFormat);
const myId = process.env.REACT_APP_MY_ID;

const TextDiv = styled.div`
  margin: 10px;
  color: var(--white);
  h3 {
    font-size: 24px;
    color: var(--lightPink);
  }
`;

const TimeDiv = styled.div`
  position: absolute;
  bottom: 7rem;
  right: 2rem;
  p {
    margin: 0;
    color: var(--lightPink);
  }
  span {
    color: #cecbcb;
  }
`;

const BottomDiv = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
`;

function DisplayText(props) {
  const { data, auth, handleEditMode } = props;
  const history = useHistory();
  const link = useRef();

  const handleEdit = () => {
    if (history.location.pathname.includes('/wall/')) {
      handleEditMode();
    } else {
      history.push(`/wall/${data.id}`);
    }
  };

  if (data.authorFirstName) {
    return (
      <TextDiv>
        <h3>{data.name}</h3>
        <p>{data.description}</p>
        <TimeDiv>
          {data.updatedAt ? (
            <p>
              Updated{' '}
              <span>
                {dayjs(data.updatedAt.toDate()).format('ddd Do MMM YYYY')}
              </span>
            </p>
          ) : (
            <p>
              Created{' '}
              <span>
                {dayjs(data.createdAt.toDate()).format('ddd Do MMM YYYY')}
              </span>
            </p>
          )}
        </TimeDiv>
        <BottomDiv>
          {/* //todo make a Link component for external links  */}
          <Button
            children={
              <div>
                directions <FiExternalLink style={{ marginBottom: '-2px' }} />
              </div>
            }
            onClick={() => link.current.click()}
          />

          <a
            ref={link}
            href={`https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lng}`}
            target="_blank"
            rel="noreferrer"
            style={{ display: 'none' }}
          >
            google maps
          </a>
          {/* //todo to get rid of this nonsense */}
          {(auth.uid === myId || auth.uid === data.authorId) && (
            <Button onClick={handleEdit} children={'Edit'} />
          )}
        </BottomDiv>
      </TextDiv>
    );
  } else {
    return <Loading />;
  }
}

DisplayText.propTypes = {
  auth: PropTypes.object,
  handleEditMode: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(DisplayText);
