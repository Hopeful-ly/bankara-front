import { motion } from "framer-motion";
import styled, { createGlobalStyle } from "styled-components";

export const Wrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.bgSecondary};
`;

export const SideBarWrapper = styled.div`
  width: min-content;
  display: inline-flex;
  justify-content: flex-start;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  align-items: center;
  overflow: hidden;
`;
export const SideBarItemBox = styled(motion.div)<{ $active?: boolean }>`
  width: 70px;
  height: 70px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.bgPrimary : theme.colors.primary};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.bgPrimary};
`;
export const GlobalStyles = createGlobalStyle`
:root {
    overflow: hidden;
    // IE
    /* scrollbar-face-color: ${({ theme }) => theme.colors.primary};
    scrollbar-shadow-color: ${({ theme }) => theme.colors.secondary};
    scrollbar-highlight-color: ${({ theme }) => theme.colors.secondary}; */
    // FireFox
    /* scrollbar-color: ${({ theme }) => theme.colors.primary} ${({ theme }) =>
  theme.colors.secondary} !important;
    scrollbar-width: thin !important; */
}
  
body, ${Wrapper} {
  // display: initial !important;
  background: ${({ theme }) => theme.colors.bgSecondary};
  color: var(--text_color);
  font-family: dana, roboto;
  overflow-x: hidden;
}

`;

export const SideBarItemWrapper = styled.div`
  width: 100px;
  height: 100px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;
