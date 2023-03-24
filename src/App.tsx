import * as React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Container } from "./components/Utils";

declare module "styled-components" {
  export interface DefaultTheme {
    primary: string;
    containerWidth: string;
    breakpoints: {
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
  }
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const Header = styled.div`
  position: relative;
  height: 64px;
  background-color: #ffce50;
`;

export const HeaderContainer = styled(Container)`
  color: white;
  display: flex;
  align-items: center;
  padding: 0 24px;
  font-weight: 600;
  font-size: 1.5rem;
  height: 100%;
`;

export const App: React.FC = () => {
  return (
    <React.StrictMode>
      <ThemeProvider
        theme={{
          primary: "#e3b44e",
          containerWidth: "900px",
          breakpoints: {
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
            xxl: 1400,
          },
        }}
      >
        <GlobalStyle />
        <Header>
          <HeaderContainer>
            <FontAwesomeIcon icon={faCalendar} />
            <div style={{ marginLeft: 12 }}>Student schedule</div>
          </HeaderContainer>
        </Header>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
};
