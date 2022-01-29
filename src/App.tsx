import React, { useCallback, useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import {
  Wrapper,
  SideBarWrapper,
  SideBarItemWrapper,
  SideBarItemBox,
  SideBarItemToolTip,
  BlurWrapper,
  Popup,
  PopupWrapper,
  PopupTitle,
  LoginInput,
  LoginInputWrapper,
  LoginInputIconWrapper,
  FormButton,
  ButtonWrapper,
  Description,
} from "./components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBoxes,
  faCogs,
  faEnvelope,
  faLock,
  faMailBulk,
  faMoneyBill,
  faQuestion,
  faSignOutAlt,
  faUser,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { AnimatePresence, motion } from "framer-motion";
import {
  ResetLogin,
  SetEmail,
  SetName,
  SetPage,
  SetPassword,
} from "@features/login";
import {
  bankaraApi,
  CreateUserResponse,
  GetUserResponse,
  LoginUserResponse,
} from "@features/api";
import { store } from "@app/store";
import { setUser } from "@features/auth";
import {
  BrowserRouter,
  Route,
  Routes,
  useInRouterContext,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./routes/dashboard";
import Wallets from "./routes/wallets";
const SideBarItem: React.FC<{
  tab?: string;
  name?: string;
  disabled?: boolean;
  onClick?: any;
}> = ({ children, tab, name, disabled, onClick }) => {
  const [isHovered, setHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <SideBarItemWrapper>
      <SideBarItemBox
        $disabled={!!disabled}
        onHoverStart={useCallback(() => {
          setHovered(true);
        }, [])}
        onHoverEnd={useCallback(() => {
          setHovered(false);
        }, [])}
        $active={(tab || name) === location.pathname.replace("/", "")}
        onClick={useCallback(
          (...args) => {
            if (tab) navigate(tab);
            if (onClick) onClick(...args);
          },
          [navigate, onClick]
        )}
      >
        {children}
      </SideBarItemBox>
      <SideBarItemToolTip
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{
          duration: 0.1,
        }}
      >
        {tab?.replace("-", " ") || name?.replace("-", " ")}
      </SideBarItemToolTip>
    </SideBarItemWrapper>
  );
};
const SideBarScreenWrapper = styled(motion.div)`
  position: fixed;
  z-index: 4;
  width: 100vw;
  height: 100vh;
`;

const SideBar: React.FC<{ hook: any }> = ({ hook: [is, set] }) => {
  const dispatch = useAppDispatch();
  const { md } = useTheme();
  const logOut = useCallback(async () => {
    dispatch(bankaraApi.endpoints.logOutUser.initiate({}));
    const res = await bankaraApi.util.getRunningOperationPromise(
      "logOutUser",
      {}
    );
    dispatch(setUser(null));
  }, [dispatch]);
  const closeSideBar = useCallback(() => {
    set(false);
  }, [set]);
  return (
    <>
      {md && is && (
        <SideBarScreenWrapper
          className="disableSideBar"
          onClick={(e: any) => {
            if (e.target.classList.contains("disableSideBar")) {
              closeSideBar();
            }
          }}
        ></SideBarScreenWrapper>
      )}
      <SideBarWrapper
        initial={{ x: -200 }}
        animate={{ x: !md || (md && is) ? 0 : -200 }}
        exit={{ x: -200 }}
        transition={{ bounce: false }}
      >
        <SideBarItem onClick={closeSideBar} tab="dashboard">
          <FontAwesomeIcon icon={faBoxes} />
        </SideBarItem>
        <SideBarItem onClick={closeSideBar} tab="wallets">
          <FontAwesomeIcon icon={faWallet} />
        </SideBarItem>
        <SideBarItem onClick={closeSideBar} disabled name="payments-log">
          <FontAwesomeIcon icon={faMoneyBill} />
        </SideBarItem>
        <SideBarItem onClick={closeSideBar} disabled name="settings">
          <FontAwesomeIcon icon={faCogs} />
        </SideBarItem>
        <SideBarItem
          name="logout"
          onClick={() => {
            closeSideBar();
            logOut();
          }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
        </SideBarItem>
      </SideBarWrapper>
    </>
  );
};

const LoginFormInput: React.FC<{
  password?: boolean;
  name: string;
  value: string;
  action: any;
}> = React.memo(({ children, name, password, value, action }) => {
  const dispatch = useAppDispatch();
  return (
    <LoginInputWrapper
      initial={{ height: 0, margin: 0, padding: 0, opacity: 0 }}
      animate={{ height: 28, margin: 10, padding: 10, opacity: 1 }}
      exit={{ height: 0, margin: 0, padding: 0, opacity: 0 }}
      transition={{ bounce: false }}
      id={children?.toString()}
    >
      <LoginInputIconWrapper>{children}</LoginInputIconWrapper>
      <LoginInput
        value={value}
        placeholder={name}
        onChange={(e) => dispatch(action(e.target.value))}
        type={password ? "password" : "text"}
      />
    </LoginInputWrapper>
  );
});
const LoginForm: React.FC = () => {
  const loginState = useAppSelector((state) => state.login);
  const { email, name, page, password } = loginState;

  const dispatch = useAppDispatch();
  const [error, setError] = useState("");

  const submit = useCallback(async () => {
    console.log("credentials", name, email, password);
    let user = null;
    if (page === "signin") {
      store.dispatch(
        bankaraApi.endpoints.logInUser.initiate({
          email,
          password,
        })
      );
      const res = (
        await bankaraApi.util.getRunningOperationPromise("logInUser", {
          email,
          password,
        })
      )?.data as LoginUserResponse;
      console.log(res);
      if (!res.status) {
        console.log("error", res.msg);
        return;
      }
      user = res.user;
    } else if (page === "signup") {
      store.dispatch(
        bankaraApi.endpoints.createUser.initiate({
          email,
          password,
          name,
        })
      );
      const res = (
        await bankaraApi.util.getRunningOperationPromise("createUser", {
          email,
          password,
          name,
        })
      )?.data as CreateUserResponse;
      console.log(res);
      if (!res.status && res.msg) {
        setError(res.msg);
        return;
      }
      user = res.user;
    }
    dispatch(ResetLogin());
    dispatch(setUser(user));
  }, [dispatch, email, name, page, password, setUser, ResetLogin]);

  return (
    <>
      <AnimatePresence>
        {page == "signup" && (
          <LoginFormInput name="full name" value={name} action={SetName}>
            <FontAwesomeIcon icon={faUser} />
          </LoginFormInput>
        )}
      </AnimatePresence>
      <LoginFormInput name="email" value={email} action={SetEmail}>
        <FontAwesomeIcon icon={faEnvelope} />
      </LoginFormInput>
      <LoginFormInput
        name="password"
        password
        value={password}
        action={SetPassword}
      >
        <FontAwesomeIcon icon={faLock} />
      </LoginFormInput>
      <ButtonWrapper>
        <FormButton
          onClick={useCallback(
            () => (page !== "signup" ? dispatch(SetPage("signup")) : submit()),
            [page, submit]
          )}
          active={page == "signup"}
        >
          Sign Up
        </FormButton>
        <FormButton
          onClick={useCallback(
            () => (page !== "signin" ? dispatch(SetPage("signin")) : submit()),
            [page, submit]
          )}
          active={page == "signin"}
        >
          Sign In
        </FormButton>
      </ButtonWrapper>
      <Description animate={{ opacity: !!error ? 1 : 0 }}>
        {error || "|"}
      </Description>
    </>
  );
};
const LoginProvider: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((store) => store.auth);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user || location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [auth]);

  useEffect(() => {
    if (!auth.user) {
      dispatch(bankaraApi.endpoints.checkUser.initiate({}));
      bankaraApi.util
        .getRunningOperationPromise("checkUser", {})
        ?.then((res) => {
          const data = res.data as LoginUserResponse;
          console.log("login data:", data);
          if (data.status) {
            dispatch(setUser(data.user));
          }
          setLoading(false);
        });
    }
  }, []);

  return (
    <>
      <BlurWrapper blur={!auth.user}>{children}</BlurWrapper>
      <AnimatePresence>
        {!auth.user && !loading && (
          <PopupWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Popup>
              <PopupTitle>Login</PopupTitle>
              <LoginForm />
            </Popup>
          </PopupWrapper>
        )}
      </AnimatePresence>
    </>
  );
};
const routes: { [key: string]: any } = {
  dashboard: <Dashboard />,
  wallets: <Wallets />,
  "payments-log": <></>,
  settings: <></>,
  // logout: <></>,
};

const SideBarButtonWrapper = styled(motion.span)`
  display: inline-block;
  height: 50px;
  width: 50px;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 100;
  cursor: pointer;
`;

const SideBarButton: React.FC<{ hook: any }> = ({ hook: [is, set] }) => {
  const {
    colors: { textPrimary },
    md,
  } = useTheme();
  return (
    <SideBarButtonWrapper
      initial={{ y: -200 }}
      animate={{ y: !md || is ? -200 : 0 }}
      exit={{ y: -200 }}
      onClick={() => set((v: any) => !v)}
    >
      <FontAwesomeIcon icon={faBars} size="2x" color={textPrimary} />
    </SideBarButtonWrapper>
  );
};
function App() {
  const { md } = useTheme();
  const [sideBar, setSideBar] = useState(false);
  return (
    <Wrapper>
      <BrowserRouter>
        <LoginProvider>
          <SideBar hook={[sideBar, setSideBar]} />
          <SideBarButton hook={[sideBar, setSideBar]} />
          <Routes>
            {Object.keys(routes).map((route) => {
              return <Route key={route} path={route} element={routes[route]} />;
            })}
          </Routes>
        </LoginProvider>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;
