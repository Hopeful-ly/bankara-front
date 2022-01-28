import { motion } from "framer-motion";
import styled, { createGlobalStyle, css } from "styled-components";

export const Wrapper = styled.div`
  overflow-y: visible;
  overflow-x: hidden;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.bgSecondary};
`;

export const SideBarWrapper = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 5;
  width: min-content;
  height: 100%;
  display: inline-flex;
  justify-content: flex-start;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  align-items: center;
  overflow: visible;
  /* overflow-y: auto; */
`;
export const SideBarItemWrapper = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;
export const SideBarItemToolTip = styled(motion.div)`
  pointer-events: none;
  user-select: none;
  z-index: 10;
  color: ${({ theme }) => theme.colors.bgPrimary};
  background-color: ${({ theme }) => theme.colors.primary};
  position: absolute;
  padding: 10px 20px;
  border-radius: 10px;
  width: max-content;
  top: 50%;
  left: 100%;
  font-weight: 500;
  font-family: Poppins;
  transform: translateY(-50%);
`;
export const SideBarItemBox = styled(motion.div)<{
  $active?: boolean;
  $disabled?: boolean;
}>`
  position: relative;
  width: 70px;
  height: 70px;
  margin: 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.bgPrimary : theme.colors.textSecondary};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.bgPrimary};
  transition: all 0.2s;
  &:hover {
    color: ${({ theme, $active }) => !$active && theme.colors.textSecondary};
    background-color: ${({ theme, $active }) =>
      !$active && theme.colors.secondary};
  }
`;
export const BlurWrapper = styled.div<{ blur: boolean }>`
  width: 100%;
  height: 100%;
  z-index: 10;
  transition: all 0.2s ease-in-out;
  ${({ blur }) =>
    blur &&
    css`
      filter: blur(3px);
      pointer-events: none;
      background: rgba(0, 0, 0, 0.1);
    `}
`;
export const PopupWrapper = styled(motion.div)`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 30;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  overflow-y: auto;
  overflow-x: visible;
`;
export const LoginInputWrapper = styled(motion.div)<{ $error?: boolean }>`
  padding: 10px;
  margin: 10px;
  width: 60%;
  text-align: center;
  display: inline-block;
  border-radius: 7px;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  position: relative;
  overflow: visible;
  border: ${({ $error, theme }) =>
    ($error ? "2px" : "0px") + " solid " + theme.colors.danger};
  transition: border ease-out;
`;
export const LoginInput = styled(motion.input)`
  height: 26px;
  position: relative;
  left: -10px;
  margin-left: 30px;
  width: 80%;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 400;
  font-family: Poppins;
  outline: none;
  font-size: 1rem;
  border: none;
`;
export const LoginInputIconWrapper = styled(motion.span)`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textSecondary};
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const FormButton = styled(motion.button)<{ active?: boolean }>`
  display: inline-block;
  padding: 10px 30px;
  outline: none;
  border: none;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.bgPrimary};
  color: ${({ theme, active }) =>
    active ? theme.colors.bgPrimary : theme.colors.textPrimary};

  font-family: Poppins;
  font-weight: 500;
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2 ease-in;
  margin: 20px;
  margin-top: 50px;
`;
export const Description = styled.p`
  font-size: 1rem;
  font-family: Poppins;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
export const PopupTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-family: Poppins;
  padding: 30px;
  text-align: center;
`;
export const Popup = styled(motion.div)`
  display: inline-flex;
  flex-direction: column;
  justify-content: start;
  align-content: center;
  align-items: center;
  border-radius: 20px;
  padding-bottom: 60px;
  height: max-content;
  width: 500px;
  background-color: ${({ theme }) => theme.colors.bgSecondary};
`;
export const GlobalStyles = createGlobalStyle`
* {
  /* overflow:auto!important; */
}
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap');
@keyframes wiggle {
  0% {
    transform: translateX(0);
  }
}
:root {
    overflow: hidden;
    // IE
    scrollbar-face-color: ${({ theme }) => theme.colors.primary};
    scrollbar-shadow-color: ${({ theme }) => theme.colors.secondary};
    scrollbar-highlight-color: ${({ theme }) => theme.colors.secondary};
    // FireFox
    scrollbar-color: ${({ theme }) => theme.colors.primary} ${({ theme }) =>
  theme.colors.secondary} !important;
    scrollbar-width: thin !important;
}
  
body,html, ${Wrapper} {
  // display: initial !important;
  width:100%;
  margin:0px!important;
  padding:0px!important;
  background: ${({ theme }) => theme.colors.bgSecondary};
  color: var(--text_color);
  font-family: dana, roboto;
  overflow-x: visible;
}

`;
