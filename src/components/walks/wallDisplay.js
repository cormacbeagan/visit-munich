import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import Thumbnail from '../universal/thumbnail';
import Loading from '../universal/loading';
import BoxWrapper from '../universal/boxWrapper';
import DisplayText from './displayText';
import {
  FlexColumn,
  FlexRow,
  ImgCont,
  InfoBox,
  ThumbDiv,
} from '../Styles/EditStyles';
dayjs.extend(advancedFormat);

function WallDisplay({ project, handleEdit }) {
  if (project) {
    return (
      <div>
        <FlexRow>
          <BoxWrapper>
            <DisplayText data={project} handleEditMode={handleEdit} />
          </BoxWrapper>
        </FlexRow>
        <FlexColumn>
          <InfoBox>
            <p>
              Latitude:
              <span>{project.lat}</span>
            </p>
            <p>
              Longitude:
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
        </FlexColumn>
        <FlexColumn>
          <ThumbDiv>
            <div>
              <h2>Teaser</h2>
            </div>
            <Thumbnail src={project.image} />
          </ThumbDiv>
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
