import styled, { css } from "styled-components";
import { transparentize } from "polished";
import { Link } from "react-router-dom";

export const Container = styled.div`
  // max-width: ${(props) => props.theme.containerWidth};
  // margin-left: auto;
  // margin-right: auto;
  padding: 0 24px;
`;

export const FlatButtonStyles = css`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  transition: background-color 0.15s;
  border: none;
  cursor: pointer;
  background: #ffffff;

  &:hover {
    background: ${(props) => transparentize(0.7, props.theme.primary)};
  }
`;

export const FlatButton = styled.button`
  ${FlatButtonStyles}
`;

export const FlatButtonLink = styled(Link)`
  ${FlatButtonStyles}
`;
