import React, { useState } from "react";
import styled from "styled-components";
import {
  Wrapper,
  SideBarWrapper,
  SideBarItemWrapper,
  SideBarItemBox,
} from "./components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxes, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { changeTab, Tab } from "src/features/tab";

const SideBarItem: React.FC<{ active?: boolean; tab?: Tab }> = ({
  active,
  children,
  tab,
}) => {
  const currentTab = useAppSelector((s) => s.tab.currentTab);
  const dispatch = useAppDispatch();
  return (
    <SideBarItemWrapper>
      <SideBarItemBox
        $active={tab === currentTab}
        onClick={() => {
          if (tab) {
            dispatch(changeTab(tab));
          }
        }}
      >
        {children}
      </SideBarItemBox>
    </SideBarItemWrapper>
  );
};

const SideBar = () => {
  return (
    <SideBarWrapper>
      <SideBarItem active>
        <FontAwesomeIcon icon={faBoxes} />
      </SideBarItem>
      <SideBarItem />
      <SideBarItem />
      <SideBarItem />
      <SideBarItem />
    </SideBarWrapper>
  );
};
function App() {
  return (
    <Wrapper>
      <SideBar />
    </Wrapper>
  );
}

export default App;
