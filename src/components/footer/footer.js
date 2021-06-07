import styled from "styled-components";

const FooterStyles = styled.footer`
  position: fixed;
  margin: 0 auto;
  padding: 5px 0 10px 0;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 20px;
  width: 50%;
  background: var(--darkBrown);
  z-index: 1000;
  border-radius: 7px;
  color: white;
  text-align: center;
  a {
    margin: 0 10px;
    color: white;
    font-size: 15px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Footer() {
  return (
    <FooterStyles>
      <a href="/about">Datenschutz</a>
      <a href="mailto:cor@macbeagan.me">Contact</a>
    </FooterStyles>
  );
}
