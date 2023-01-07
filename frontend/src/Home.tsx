import axios from "axios";
import {Route, Routes} from "react-router";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {UserModel} from "./UserModel";
import CostumerRegister from "./CostumerRegister";
import Profile from "./Profile";

type Props = {
    user: string
    fetchUsername: () => void
}

export default function Home(props: Props) {

    const [userDetails, setUserDetails] = useState<UserModel>({
        id: "",
        username: "",
        passwordBcrypt: "",
        roles: "BASIC",
        email: "",
    });
    const [userMenu, setUserMenu] = useState<boolean>(false);
    const nlink = useNavigate();

    const getUserDetails = () => {
        axios.get("/api/users/" + props.user)
            .then(response => response.data)
            .then(setUserDetails)
    }

    useEffect(getUserDetails, [props.user]);

    const logout = () => {
        axios.get("/api/chrat-users/logout")
            .then(response => response.data)
            .then(props.fetchUsername)
            .then(() => nlink("/"))
    }

    return <>
        <StyledHeader>
            <StyledH1>DieWerkstattCloud-Backend</StyledH1>
        </StyledHeader>
        <StyledNav>
            <StyledButton>
                ASDASD
            </StyledButton>
            {userMenu &&
                <StyledPictureMenu>
                    <StyledButton2 onClick={() => {
                        nlink("/profile");
                        setUserMenu(false);
                        props.fetchUsername()
                    }}>User Profil</StyledButton2>
                    <StyledButton2 onClick={() => {
                        nlink("/addcostumer");
                        setUserMenu(false)
                    }}>Kunde anlegen</StyledButton2>
                    <StyledLogoutButton onClick={() => {
                        logout();
                        setUserMenu(false)
                    }}>Logout</StyledLogoutButton>
                </StyledPictureMenu>
            }
        </StyledNav>
        <StyledMain>
            <Routes>
                <Route path="/addcostumer"
                       element={<CostumerRegister/>}/>
                <Route path="/profile"
                       element={<Profile user={props.user} userDetails={userDetails} logout={logout}
                                         getUserDetails={getUserDetails}/>}/>
            </Routes>
        </StyledMain>
        <StyledFooter>
            <p>© 2022 DWCB</p>
        </StyledFooter>
    </>
}

const StyledHeader = styled.header`
  margin: 0 0 20px 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .5), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .5);
`

const StyledMain = styled.main`
  display: flex;
  justify-content: center;
  min-height: 200px;
`

const StyledH1 = styled.h1`
  margin: 20px 0 0 0;
  font-size: 2rem;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 48px;
  color: var(--color-white);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  padding: 0;
  font-size: 0.8rem;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  color: var(--color-white);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`

const StyledButton = styled.button`
  transition-duration: 0.4s;
  background-color: transparent;
  border: none;
`

const StyledPictureMenu = styled.div`
  position: relative;
  padding: 5px;
  left: -37px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  margin-bottom: 0;
  color: var(--color-white);
  background-color: var(--color-grey);
  border-radius: 5px;
  @media (max-width: 768px) {
    top: 0;
    left: 1vw;
  }
`

const StyledNav = styled.nav`
  position: absolute;
  top: 3.5vh;
  left: 8vw;
  @media (max-width: 768px) {
    position: absolute;
    top: 1vh;
    left: 1vw;
  }
`

const StyledButton2 = styled.button`
  margin: 3px;
  padding: 10px;
  width: 140px;
  transition-duration: 0.4s;
  background-color: var(--color-button-background);
  color: var(--color-text);
  border: none;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;

  &:hover {
    background-color: var(--color-button-hover);
  }

  &:active {
    background-color: var(--color-button-active);
  }
`

const StyledLogoutButton = styled.button`
  margin: 3px;
  padding: 10px;
  width: 140px;
  transition-duration: 0.4s;
  background-color: var(--color-button-darker-red);
  color: var(--color-text);
  border: none;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;

  &:hover {
    background-color: var(--color-red);
  }

  &:active {
    background-color: var(--color-button-active);
  }
`
