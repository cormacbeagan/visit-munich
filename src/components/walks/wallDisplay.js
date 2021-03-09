import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import Thumbnail from '../universal/thumbnail';
import Loading from '../universal/loading';
import BoxWrapper from '../universal/boxWrapper';
import DisplayText from './displayText';
import FlexRow from '../Styles/FlexRow';
import FlexColumn from '../Styles/FlexColumn';
import styled from 'styled-components';
import ImgCont from '../Styles/ImgCont';
dayjs.extend(advancedFormat);

const InfoBox = styled.div`
  margin: 1rem;
  max-width: 24rem;
  overflow: hidden;
  flex-grow: 1;
  p {
    color: #dfbaaa;
    font-weight: 600;
  }
  span {
    color: #cecbcb;
  }
`;

function WallDisplay({ project, handleEdit }) {
  if (project) {
    return (
      <div>
        <FlexRow>
          <BoxWrapper>
            <DisplayText data={project} handleEditMode={handleEdit} />
          </BoxWrapper>
        </FlexRow>
        <FlexRow>
          <InfoBox>
            <p>
              Latitude: <br />
              <span>{project.lat}</span>
            </p>
            <p>
              Longitude: <br />
              <span>{project.lng}</span>
            </p>
          </InfoBox>
          <InfoBox>
            <p>
              Posted by:{' '}
              <span>{`${project.authorFirstName} ${project.authorLastName}`}</span>
            </p>
            <p>
              Posted:{' '}
              <span>
                {dayjs(project.createdAt.toDate()).format('ddd Do MMM YYYY')}
              </span>
            </p>
            {project.updatedAt && (
              <p>
                Last updated:{' '}
                <span>
                  {dayjs(project.updatedAt.toDate()).format('ddd Do MMM YYYY')}
                </span>
              </p>
            )}
          </InfoBox>
        </FlexRow>
        <FlexColumn>
          <Thumbnail src={project.image} />
          <ImgCont>
            {project.images.map(img => {
              return (
                <div key={img}>
                  <Thumbnail src={img} />
                </div>
              );
            })}
          </ImgCont>
        </FlexColumn>
      </div>
    );
  } else {
    return <Loading />;
  }
}

WallDisplay.propTypes = {
  handleEdit: PropTypes.func,
  project: PropTypes.object,
};

export default WallDisplay;
