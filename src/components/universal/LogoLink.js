import React from 'react';
import styled from 'styled-components';
import '../../styles/button.css';

const LogoLinkStyles = styled.a`
  display: block;
  margin: 5px 8px;
  position: relative;
  width: ${props => (props.size ? props.size : '30')}px;
  height: ${props => (props.size ? props.size : '30')}px;
  cursor: pointer;
  border-radius: 50%;
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
    width: ${props => (props.size ? props.size : '30')}px;
    height: ${props => (props.size ? props.size : '30')}px;
  }
`;

const LogoLink = React.forwardRef((props, ref) => {
  const { children, href, size } = props;

  return (
    <LogoLinkStyles
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      size={size}
    >
      {children}
    </LogoLinkStyles>
  );
});

export default LogoLink;
