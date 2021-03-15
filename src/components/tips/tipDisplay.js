import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import Thumbnail from '../universal/thumbnail';
import Loading from '../universal/loading';
import BoxWrapper from '../universal/boxWrapper';
import HomeEntry from '../home/homeEntry';
import {
  FlexColumn,
  FlexRow,
  ImgCont,
  InfoBox,
  ThumbDiv,
} from '../Styles/EditStyles';
dayjs.extend(advancedFormat);

function TipDisplay({ tip, handleEdit }) {
  if (tip) {
    return (
      <div>
        <FlexRow>
          <BoxWrapper>
            <HomeEntry data={tip} handleEditMode={handleEdit} />
          </BoxWrapper>
        </FlexRow>
        <FlexColumn>
          <InfoBox>
            <p>
              Latitude: <span>{tip.lat}</span>
            </p>
            <p>
              Longditude: <span>{tip.lng}</span>
            </p>
          </InfoBox>
          <InfoBox>
            <p>
              Link: <span>{tip.link}</span>
            </p>
            <p>
              Link Text: <span>{tip.linkText}</span>
            </p>
          </InfoBox>
          <InfoBox>
            <p>
              Posted by:{' '}
              <span>{`${tip.authorFirstName} ${tip.authorLastName}`}</span>
            </p>
            <p>
              Posted:{' '}
              <span>
                {dayjs(tip.createdAt.toDate()).format('ddd Do MMM YYYY')}
              </span>
            </p>
            {tip.updatedAt && (
              <p>
                Last updated:{' '}
                <span>
                  {dayjs(tip.updatedAt.toDate()).format('ddd Do MMM YYYY')}
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
            <Thumbnail src={tip.image} />
          </ThumbDiv>
          <ImgCont>
            {tip.images.map(img => {
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

TipDisplay.propTypes = {
  handleEdit: PropTypes.func,
  tip: PropTypes.object,
};

export default TipDisplay;
