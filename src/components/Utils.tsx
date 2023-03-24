import styled from "styled-components";

export const Container = styled.div`
  max-width: ${(props) => props.theme.containerWidth};
  margin-left: auto;
  margin-right: auto;
  padding: 0 24px;
`;
