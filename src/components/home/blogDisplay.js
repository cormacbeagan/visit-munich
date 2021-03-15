import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import HomeEntry from './homeEntry';
import BoxWrapper from '../universal/boxWrapper';
import Loading from '../universal/loading';
import { FlexColumn, FlexRow, InfoBox } from '../Styles/EditStyles';
dayjs.extend(advancedFormat);

function BlogDisplay(props) {
  const { blog, handleEdit } = props;
  if (blog) {
    return (
      <div>
        <FlexRow>
          <BoxWrapper>
            <HomeEntry data={{ ...blog, id: 1 }} handleEditMode={handleEdit} />
          </BoxWrapper>
        </FlexRow>
        <FlexColumn>
          <InfoBox>
            <p>
              Link URL: <span>{blog.link}</span>
            </p>
            <p>
              Link Text: <span>{blog.linkText}</span>
            </p>
          </InfoBox>
          <InfoBox>
            <p>
              Position: <span>{Number(blog.rank) + 1}</span>
            </p>
            <p>
              Posted by:{' '}
              <span>{`${blog.authorFirstName} ${blog.authorLastName}`}</span>
            </p>
          </InfoBox>
          <InfoBox>
            <p>
              Posted:{' '}
              <span>
                {dayjs(blog.createdAt.toDate()).format('ddd Do MMM YYYY')}
              </span>
            </p>
            {blog.updatedAt && (
              <p>
                Last updated:{' '}
                <span>
                  {dayjs(blog.updatedAt.toDate()).format('ddd Do MMM YYYY')}
                </span>
              </p>
            )}
          </InfoBox>
        </FlexColumn>
      </div>
    );
  } else {
    return <Loading />;
  }
}

BlogDisplay.propTypes = {
  blog: PropTypes.object,
  handleEdit: PropTypes.func,
};

export default BlogDisplay;
