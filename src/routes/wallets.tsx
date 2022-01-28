import { useAppDispatch, useAppSelector } from "@app/hooks";
import { Card, CardCreate } from "@features/api/db";
import { useCallback, useState } from "react";
import styled, { css } from "styled-components";
import { LeftPadWrapper, TabWrapper } from ".";
import { AnimatePresence, motion } from "framer-motion";
import {
  BlurWrapper,
  ButtonWrapper,
  FormButton as Button,
  LoginInput as FormInput,
  LoginInputIconWrapper as InputIconWrapper,
  LoginInputWrapper as InputWrapper,
  Popup,
  PopupTitle,
  PopupWrapper,
} from "src/components";
import { useKey } from "react-use";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faCartArrowDown,
  faCreditCard,
  faMoneyBill,
  faPlus,
  faSortDown,
  faTag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { bankaraApi } from "@features/api";

const WalletsWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

const WalletsOverviewWrapper = styled.div`
  width: 100%;
  padding-top: 30px;
`;
const WalletsOverviewTitle = styled.h2`
  font-size: 2rem;
  font-family: Poppins;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 2rem;
`;
const WalletsOverviewDescryption = styled.p`
  font-size: 1rem;
  font-family: Poppins;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const CardList = styled.ul`
  display: flex;
  padding: 0px;
  width: 100%;
  height: max-content;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-y: auto;
`;

const WalletWrapper = styled.li<{ $fake?: boolean }>`
  width: 240px;
  height: 140px;
  border-radius: 20px;
  padding: 30px;
  color: ${({ theme }) => theme.colors.bgSecondary};
  font-family: Poppins;
  font-weight: 500;
  font-size: 1rem;
  background-color: ${({ theme, $fake }) =>
    $fake ? theme.colors.bgSecondary : theme.colors.primary};
  display: inline-flex;
  flex-direction: column;
  margin: 20px;
  transition: all 0.2s ease-in-out;

  ${({ theme, $fake }) =>
    $fake &&
    `
      border: 2px dashed ${theme.colors.textSecondary};
      justify-content: center;
      align-items: center;
      color: ${theme.colors.textSecondary};
      cursor:pointer;
      &:hover {
        background-color: ${theme.colors.bgPrimary}
      }
    `};
`;
const WalletTitle = styled.div`
  display: block;
`;
const WalletBalance = styled.div`
  font-size: 2rem;
  padding-block: 17px;
`;
const Wallet: React.FC<any> = ({ balance, title, card_number, fake, call }) => {
  return (
    <WalletWrapper {...(fake ? { onClick: call(true) } : {})} $fake={!!fake}>
      {!fake && (
        <>
          <WalletTitle>{title}</WalletTitle>
          <WalletBalance>
            ${balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </WalletBalance>
          {card_number}
        </>
      )}
      {fake && <WalletTitle>Add a new Card</WalletTitle>}
    </WalletWrapper>
  );
};
const AddWalletButton = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 7px 14px;
  font-family: Poppins;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.bgSecondary};
  border-radius: 7px;
  cursor: pointer;
  font-weight: 500;
  margin-inline: auto;
`;
const ListboxButtonWrapper = styled.button`
  border: none;
  margin: 0px;
  width: 100%;
  text-align: center;
  display: inline-block;
  border-radius: 7px;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
`;
const ListboxButton = styled.div`
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 400;
  font-family: Poppins;
  outline: none;
  font-size: 1rem;
  border: none;
`;
const ListboxOptions = styled(motion.ul)`
  position: absolute;
  left: 0px;
  top: 50px;
  z-index: 50;
  width: 100%;
  max-height: 200px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 7px;
  box-shadow: 0px 0px 17px -15px black;
`;
const ListboxOption = styled.div`
  padding-block: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  text-decoration: none;
  font-family: Poppins;
  font-size: 1rem;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.bgSecondary};
  }
`;
const AddCardForm: React.FC<{ blur: any }> = ({ blur }) => {
  const user = useAppSelector((state) => state.auth.user);

  const [data, setData] = useState<CardCreate>({
    balance: 0,
    provider: "",
    title: "",
    card_number: 0,
    name: "",
  });
  const [errors, setError] = useState({
    balance: false,
    provider: false,
    title: false,
    card_number: false,
    name: false,
  });
  const dispatch = useAppDispatch();
  const [isOpen, setOpen] = useState<boolean>(false);
  const toggleProviderList = useCallback(() => setOpen((v) => !v), [setOpen]);
  const updateIntField = useCallback(
    (field) => (e: any) => {
      const v = parseInt(e.target.value);
      if (v) setData((d) => ({ ...d, [field]: v }));
      else setData((d) => ({ ...d, [field]: 0 }));
    },
    []
  );
  const updateStringField = useCallback(
    (field: string) => (e: any) => {
      const value = e.target.value;
      setData((d) => ({ ...d, [field]: value }));
    },
    [setData]
  );
  const setSelectedProvider = useCallback(
    (v) => () => {
      setData((d) => ({ ...d, provider: v }));
      setOpen(false);
    },
    [setData, setOpen]
  );
  const errorHandler = useCallback(
    (field: string, validator: any) => () => {
      // @ts-ignore
      if (!validator(data[field])) {
        setError((e) => ({ ...e, [field]: true }));
      } else {
        setError((e) => ({ ...e, [field]: false }));
      }
    },
    [setError, data]
  );

  const addNewCard = useCallback(async () => {
    if (!user) {
      return;
    }
    dispatch(
      bankaraApi.endpoints.createUserCard.initiate({
        ...data,
        user_id: user.id,
      })
    );
    const res = await bankaraApi.util.getRunningOperationPromise(
      "createUserCard",
      {
        ...data,
        user_id: user.id,
      }
    );
    console.log("sent data:", { ...data, user_id: user.id });
    console.log("responded !", res?.data);
  }, [data, user]);
  return (
    <>
      <InputWrapper $error={errors.title}>
        <InputIconWrapper>
          <FontAwesomeIcon icon={faTag} />
        </InputIconWrapper>
        <FormInput
          onBlur={errorHandler("title", (v: any) => !!v)}
          onChange={updateStringField("title")}
          type="text"
          placeholder="label"
        />
      </InputWrapper>

      <InputWrapper $error={errors.name}>
        <InputIconWrapper>
          <FontAwesomeIcon icon={faUser} />
        </InputIconWrapper>
        <FormInput
          onBlur={errorHandler("name", (v: any) => !!v)}
          onChange={updateStringField("name")}
          type="text"
          placeholder="name"
        />
      </InputWrapper>
      <InputWrapper $error={errors.card_number}>
        <InputIconWrapper>
          <FontAwesomeIcon icon={faCreditCard} />
        </InputIconWrapper>
        <FormInput
          type="text"
          placeholder="card number"
          value={data.card_number}
          onChange={updateIntField("card_number")}
        />
      </InputWrapper>
      <InputWrapper $error={errors.provider}>
        <ListboxButtonWrapper onClick={toggleProviderList}>
          <ListboxButton>
            <InputIconWrapper>
              <FontAwesomeIcon icon={faSortDown} />
            </InputIconWrapper>
            {data.provider || "Please Choose a Provider"}
          </ListboxButton>
        </ListboxButtonWrapper>
        <AnimatePresence>
          {isOpen && (
            <ListboxOptions
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ bounce: false, duration: 0.1 }}
            >
              {[
                "Mastercard",
                "Visa",
                "American Express",
                "Bank Of America",
                "Capital One",
                "Chase",
                "Citi",
                "Discover",
                "U.S. Bank",
                "wells Fargo",
              ]
                .filter((v) => v !== data.provider)
                .map((p) => (
                  <ListboxOption key={p} onClick={setSelectedProvider(p)}>
                    {p}
                  </ListboxOption>
                ))}
            </ListboxOptions>
          )}
        </AnimatePresence>
      </InputWrapper>

      <InputWrapper $error={errors.balance}>
        <InputIconWrapper>
          <FontAwesomeIcon icon={faMoneyBill} />
        </InputIconWrapper>
        <FormInput
          type="text"
          placeholder="balance"
          value={data.balance}
          onChange={updateIntField("balance")}
        />
      </InputWrapper>

      <ButtonWrapper>
        <Button active onClick={addNewCard}>
          Add
        </Button>
        <Button onClick={() => blur(false)}>Cancel</Button>
      </ButtonWrapper>
    </>
  );
};
const Wallets: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [cardPopup, setCardPopup] = useState(false);
  const callCardPopup = useCallback(
    (v) => () => setCardPopup(v),
    [setCardPopup]
  );
  const focusHandler = useCallback(
    (e) => {
      console.log("Focus Handler!");
      if (e.target.classList.contains("CardPopupWrapper")) {
        console.log("Setting False!");
        setCardPopup(false);
      }
    },
    [setCardPopup]
  );
  useKey("Escape", () => {
    setCardPopup(false);
  });

  return (
    <>
      <AnimatePresence>
        {cardPopup && (
          <PopupWrapper
            key="addCardPopup"
            className="CardPopupWrapper"
            onClick={focusHandler}
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ bounce: false, duration: 0.2 }}
          >
            <Popup>
              <PopupTitle>Add a new Card</PopupTitle>
              <AddCardForm blur={setCardPopup} />
            </Popup>
          </PopupWrapper>
        )}
      </AnimatePresence>
      <BlurWrapper blur={cardPopup}>
        <TabWrapper>
          <WalletsWrapper>
            <LeftPadWrapper>
              <WalletsOverviewWrapper>
                <WalletsOverviewTitle>Wallet</WalletsOverviewTitle>
                <WalletsOverviewDescryption>
                  Hey{" "}
                  {user
                    ? user.name.at(0)?.toUpperCase() + user.name.slice(1)
                    : "There"}
                  , you can get the list of your cards here!
                </WalletsOverviewDescryption>
              </WalletsOverviewWrapper>
              <CardList>
                {!!user?.cards?.length && (
                  <>
                    {user.cards.map((card) => (
                      <Wallet key={card.id} {...card} />
                    ))}
                    <Wallet fake call={callCardPopup} />
                  </>
                )}
              </CardList>
            </LeftPadWrapper>
            {!user?.cards?.length && (
              <>
                <WalletsOverviewWrapper>
                  <WalletsOverviewTitle style={{ textAlign: "center" }}>
                    Empty!
                  </WalletsOverviewTitle>
                  <WalletsOverviewDescryption style={{ textAlign: "center" }}>
                    You don't have any cards in your wallet
                  </WalletsOverviewDescryption>
                </WalletsOverviewWrapper>
                <AddWalletButton onClick={callCardPopup(true)}>
                  Add a New Card
                </AddWalletButton>
              </>
            )}
          </WalletsWrapper>
        </TabWrapper>
      </BlurWrapper>
    </>
  );
};
export default Wallets;
