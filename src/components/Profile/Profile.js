import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { useParams } from 'react-router';
import { compose } from 'redux';
import styled from 'styled-components';
import HomeEntry from '../home/homeEntry';
import BoxWrapper from '../universal/boxWrapper';
import DisplayText from '../walks/displayText';

let idToPass;

const ProfileContainer = styled.div`
  margin: auto;
  display: grid;
  grid-template-rows: auto auto auto;
  flex-wrap: wrap;
  max-width: 800px;
  h1 {
    font-size: 3rem;
    text-align: center;
    margin: 2rem;
  }
`;

const InfoCard = styled.div`
  margin: auto;
  padding: 1rem 2rem;
  width: 80%;
  background: var(--offWhite);
  color: var(--darkBlue);
  border-radius: 5px;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.2);
  h2 {
    color: var(--darkBrown);
    margin: 1rem 0 5px 0;
  }
  p {
    margin: 1rem 0px;
  }
`;

const SectionStyles = styled.section`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  border-bottom: 4px solid var(--darkBrown);
`;

const BoxDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

function Profile(props) {
  const { blogs, projects, tips, user } = props;
  const { id } = useParams();
  idToPass = id;
  return (
    <ProfileContainer>
      <h1>Profile Page</h1>
      <InfoCard>
        <h2>
          Hi {user.firstName} {user.lastName}
        </h2>
        <p>These are your Visit Munich contributions</p>
        <p>
          You have made {tips?.length + projects?.length + blogs?.length}{' '}
          entries, to add photos or update them just click on the edit button.
        </p>
      </InfoCard>
      {tips?.length > 0 && (
        <SectionStyles>
          <InfoCard>
            <h2>Tips</h2>
            <p>
              These are the tips which you have created. You can add more by
              going to create tip, or edit them by clicking the edit button
            </p>
          </InfoCard>
          <BoxDiv>
            {tips.map(item => (
              <BoxWrapper key={item.id}>
                <HomeEntry data={item} url={'/tips'} />
              </BoxWrapper>
            ))}
          </BoxDiv>
        </SectionStyles>
      )}
      {projects?.length > 0 && (
        <SectionStyles>
          <InfoCard>
            <h2>Walls</h2>
            <p>
              These are the Walls which you have created. You can add photos,
              and edit each entry by clicking on the edit button.
            </p>
          </InfoCard>
          <BoxDiv>
            {projects.map(item => (
              <BoxWrapper key={item.id}>
                <DisplayText data={item} />
              </BoxWrapper>
            ))}
          </BoxDiv>
        </SectionStyles>
      )}
      {blogs?.length > 0 && (
        <SectionStyles>
          <InfoCard>
            <h2>Blogs</h2>
            <p>These boxes appear on the front page of the website.</p>
          </InfoCard>
          <BoxDiv>
            {blogs.map(item => (
              <BoxWrapper key={item.id}>
                <HomeEntry data={item} url={'/editblog'} />
              </BoxWrapper>
            ))}
          </BoxDiv>
        </SectionStyles>
      )}
    </ProfileContainer>
  );
}

const mapStateToProps = state => {
  console.log(state);
  const allBlogs = state.firestore.ordered.blogs;
  const blogs = allBlogs?.filter(item => item.authorId === idToPass);
  const allProjects = state.firestore.ordered.projects;
  const projects = allProjects?.filter(item => item.authorId === idToPass);
  const allTips = state.firestore.ordered.tips;
  const tips = allTips?.filter(item => item.authorId === idToPass);
  return {
    blogs: blogs || null,
    projects: projects || null,
    tips: tips || null,
    user: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects' },
    { collection: 'blogs' },
    { collection: 'tips' },
  ])
)(Profile);
