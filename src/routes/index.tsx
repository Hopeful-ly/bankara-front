import { motion } from "framer-motion";
import styled from "styled-components";

export const TabWrapper = styled(motion.div)`
  height: 100%;
  /* width: 100%; */
  overflow-y: auto;

  transition: all 0.2s;
  ${({ theme }) => !theme.md && "padding-left: 110px;"}
`;
export const LeftPadWrapper = styled.div`
  padding-left: 40px;
`;
