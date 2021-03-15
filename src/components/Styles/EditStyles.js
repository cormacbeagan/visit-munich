import styled from 'styled-components';

const ContainerStyles = styled.div`
  margin: 12rem auto 5rem auto;
  width: 88%;
  max-width: 100rem;
  padding: 5%;
  background: var(--darkBrown);
  border-radius: 5px;
  color: #f3f3f3;
  box-shadow: 0 10rem 8rem rgba(0, 0, 0, 0.3);
  @media only screen and (max-width: 380px) {
    padding: 5% 0;
    margin: 12rem 0 5rem 0;
    width: 100%;
  }
`;

const FlexColumn = styled.div`
  background: #464646;
  margin: 5rem auto;
  padding: 2rem;
  max-width: 75rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  box-shadow: 0 100px 80px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  &.editing {
    background: var(--offWhite);
  }
  @media only screen and (max-width: 480px) {
    padding: 2rem 1rem;
    margin: 5rem 1rem;
  }
`;

const FlexRow = styled.div`
  background: var(--middleBrown);
  margin: 5rem auto;
  padding: 2rem;
  max-width: 75rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  box-shadow: 0 30px 50px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  &.editing {
    background: rgb(215, 215, 215);
  }
  @media only screen and (max-width: 480px) {
    padding: 2rem 1rem;
    margin: 5rem 1rem;
  }
`;

const ImgCont = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const TopBtns = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-bottom: 1rem;
  @media only screen and (max-width: 480px) {
    justify-content: center;
  }
`;

const BottomBtns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  .bot-btns-inner {
    text-align: right;
  }
  .edit-btns-center {
    text-align: center;
  }
`;

const ImageBtn = styled.button`
  margin-left: 1rem;
  display: block;
  color: white;
  &:hover,
  &:focus {
    color: var(--hgGreen);
  }
`;

const ThumbDiv = styled.div`
  margin: 1rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  h2 {
    margin: 2rem auto 0 auto;
  }
  p {
    margin: 0;
    width: 150px;
  }
  &.editing {
    color: var(--darkBlue);
    h2 {
      margin: 0;
    }
  }
`;

const InfoBox = styled.div`
  margin: 1rem;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  p {
    color: #dfbaaa;
    font-weight: 600;
  }
  span {
    color: #cecbcb;
  }
  @media (max-width: 640px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export {
  FlexColumn,
  FlexRow,
  ImgCont,
  TopBtns,
  BottomBtns,
  ImageBtn,
  ThumbDiv,
  ContainerStyles,
  InfoBox,
};
