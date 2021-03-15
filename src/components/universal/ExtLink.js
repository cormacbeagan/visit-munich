import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import styled from 'styled-components';
import '../../styles/button.css';

const ExtLinkStyles = styled.a`
  position: relative;
  cursor: pointer;
  margin: 5px;
  padding: 10px 15px;
  color: #e2e2e2;
  background: #616161;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 400;
  border-radius: 4px;
  box-shadow: 10px 8px 40px rgba(0, 0, 0, 0.3);
  &:hover {
    top: 0px;
    left: 0px;
    background-color: #61616194;
    transition: background-color 200ms ease;
    text-decoration: underline;
  }
  &:focus {
    background-color: #777c84;
    transition: all 400ms ease;
    text-decoration: underline;
  }
  &:active {
    top: 1px;
    left: 1px;
  }
`;
const ExtLink = React.forwardRef((props, ref) => {
  const { children, href } = props;

  return (
    <ExtLinkStyles ref={ref} href={href} target="_blank" rel="noreferrer">
      <>
        {children} <FiExternalLink style={{ marginBottom: '-2px' }} />
      </>
    </ExtLinkStyles>
  );
});

export default ExtLink;
