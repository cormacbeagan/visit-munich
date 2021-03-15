import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useSelector } from 'react-redux';
import Button from '../universal/button';
import Loading from '../universal/loading';
import styled from 'styled-components';
import ExtLink from '../universal/ExtLink';
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

export default function DisplayText(props) {
  const { data, handleEditMode } = props;
  const history = useHistory();
  const auth = useSelector(state => state.firebase.auth);

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
          <ExtLink
            href={`https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lng}`}
          >
            directions
          </ExtLink>
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
  handleEditMode: PropTypes.func,
  data: PropTypes.object,
};
