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
  margin: 2rem auto;
  display: grid;
  grid-template-rows: auto auto auto;
  flex-wrap: wrap;
  width: 90%auto;
  max-width: 800px;
  h1 {
    color: var(--white);
    font-size: 3rem;
    text-align: center;
    margin: 2rem 0;
  }
`;

const InfoCard = styled.div`
  margin: auto;
  padding: 1rem 2rem;
  width: 90%;
  background: var(--white);
  color: var(--darkBlue);
  border-radius: 5px;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.2);
  h2 {
    color: var(--darkBrown);
    margin: 1rem 0 5px 0;
    @media only screen and (max-width: 480px) {
      padding: 0 0.5rem;
    }
  }
  p {
    margin: 1rem 0px;
    @media only screen and (max-width: 480px) {
      padding: 0 0.5rem;
    }
  }
  @media only screen and (max-width: 480px) {
    padding: 1rem 0.5rem;
  }
`;

const SectionStyles = styled.section`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  margin: 2rem 0;
  border-top: 4px solid var(--lightBlue);
  @media only screen and (max-width: 480px) {
    width: auto;
    margin: 2rem auto;
    box-sizing: border-box;
  }
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
    <div>
      <ProfileContainer>
        <h1>Profile Page</h1>
        <InfoCard>
          <h2>
            Hi {user.firstName} {user.lastName}
          </h2>
          <p>These are your Visit Munich contributions</p>
          <p>
            You have made {tips?.length + projects?.length + blogs?.length}{' '}
            entries, don't forget to keep them updated.
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
              <BoxDiv>
                {tips.map(item => (
                  <BoxWrapper key={item.id}>
                    <HomeEntry data={item} url={'/tips'} />
                  </BoxWrapper>
                ))}
              </BoxDiv>
            </InfoCard>
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
              <BoxDiv>
                {projects.map(item => (
                  <BoxWrapper key={item.id}>
                    <DisplayText data={item} />
                  </BoxWrapper>
                ))}
              </BoxDiv>
            </InfoCard>
          </SectionStyles>
        )}
        {blogs?.length > 0 && (
          <SectionStyles>
            <InfoCard>
              <h2>Blogs</h2>
              <p>These boxes appear on the front page of the website.</p>
              <BoxDiv>
                {blogs.map(item => (
                  <BoxWrapper key={item.id}>
                    <HomeEntry data={item} url={'/editblog'} />
                  </BoxWrapper>
                ))}
              </BoxDiv>
            </InfoCard>
          </SectionStyles>
        )}
      </ProfileContainer>
    </div>
  );
}

const mapStateToProps = state => {
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
