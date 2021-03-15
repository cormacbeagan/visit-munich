import React from 'react';
import { FiArrowUpLeft, FiArrowUpRight, FiExternalLink } from 'react-icons/fi';
import styled from 'styled-components';
import '../../styles/button.css';

const LogoLinkStyles = styled.a`
  margin: 8px 10px 0 0;
  position: relative;
  justify-self: flex-end;
  height: 30px;
  width: 30px;
  cursor: pointer;
  border-radius: 100%;
  flex-grow: 0;
  &:hover,
  &:focus {
    top: 0px;
    left: 0px;
    box-shadow: var(--hgOutBs);
  }
  &:active {
    top: 1px;
    left: 1px;
  }
  img {
    height: 30px;
    width: 30px;
  }
`;

const ArrowStyle = styled.div`
  position: absolute;
  left: 35px;
  top: -10px;
`;
const LogoLink = React.forwardRef((props, ref) => {
  const { children, href } = props;

  return (
    <LogoLinkStyles ref={ref} href={href} target="_blank" rel="noreferrer">
      <>{children}</>
    </LogoLinkStyles>
  );
});

export default LogoLink;
