import axios from "axios";
import {Route, Routes} from "react-router";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {UserModel} from "../componenten/UserModel";
import AddCostumer from "../routes/AddCostumer";
import UserProfile from "../routes/UserProfile";
import Header from "../componenten/Header";
import Footer from "../componenten/Footer";
import Overview from "../routes/Overview";
import {Icon} from "@iconify/react";

type Props = {
    user: string
    fetchUsername: () => void
}

export default function Home(props: Props) {

    const [userDetails, setUserDetails] = useState<UserModel>({
        id: "",
        username: "",
        passwordBcrypt: "",
        role: "",
        email: "",
    });
    const [userMenu, setUserMenu] = useState<boolean>(false);
    const [costumerMenu, setCostumerMenu] = useState<boolean>(false);
    const [storageMenu, setStorageMenu] = useState<boolean>(false);
    const [cloudMenu, setCloudMenu] = useState<boolean>(false);
    const nlink = useNavigate();

    const getUserDetails = () => {
        axios.get("/api/users/" + props.user)
            .then(response => response.data)
            .then(setUserDetails)
    }

    useEffect(getUserDetails, [props.user]);

    const logout = () => {
        axios.get("/api/users/logout")
            .then(response => response.data)
            .then(props.fetchUsername)
            .then(() => nlink("/"))
    }

    return <>
        <Header/>
        <StyledMain>
            <StyledNav>

                <StyledMainButton onClick={() => nlink("/")}>
                    Übersicht
                </StyledMainButton>

                <StyledButton onClick={() => setUserMenu(!userMenu)}>
                    Benutzer
                </StyledButton>
                {userMenu &&
                    <>
                        <StyledSubButton onClick={() => {
                            nlink("/allusers");
                        }}>Alle Benutzer
                        </StyledSubButton>

                        <StyledSubButton onClick={() => {
                            nlink("/userprofile");
                        }}>Dein Profil
                        </StyledSubButton>

                        <StyledAddButton onClick={() => {
                            nlink("/adduser");
                        }}><Icon icon="mdi:register" inline={true} width="15"/> Benutzer anlegen
                        </StyledAddButton>

                        <StyledLogoutButton onClick={() => {
                            logout();
                        }}>Logout
                        </StyledLogoutButton>
                    </>
                }

                <StyledButton onClick={() => setCostumerMenu(!costumerMenu)}>
                    Kunden
                </StyledButton>
                {costumerMenu &&
                    <>
                        <StyledSubButton onClick={() => {
                            nlink("/allcostumers");
                        }}>Kunden Übersicht
                        </StyledSubButton>

                        <StyledAddButton onClick={() => {
                            nlink("/addcostumer");
                        }}><Icon icon="mdi:register" inline={true} width="15"/> Kunden anlegen
                        </StyledAddButton>
                    </>
                }

                <StyledButton onClick={() => setStorageMenu(!storageMenu)}>
                    Storage
                </StyledButton>
                {storageMenu &&
                    <>
                        <StyledSubButton onClick={() => {
                            nlink("/allstorages");
                        }}>Storage Übersicht
                        </StyledSubButton>

                        <StyledAddButton onClick={() => {
                            nlink("/addstorage");
                        }}><Icon icon="mdi:register" inline={true} width="15"/> Storage anlegen
                        </StyledAddButton>
                    </>
                }

                <StyledButton onClick={() => setCloudMenu(!cloudMenu)}>
                    Cloud
                </StyledButton>
                {cloudMenu &&
                    <>
                        <StyledSubButton onClick={() => {
                            nlink("/allclouds");
                        }}>Cloud Übersicht
                        </StyledSubButton>

                        <StyledAddButton onClick={() => {
                            nlink("/addcloud");
                        }}><Icon icon="mdi:register" inline={true} width="15"/> Cloud anlegen
                        </StyledAddButton>
                    </>
                }

            </StyledNav>
            <Routes>


                <Route path="/" element={<Overview user={props.user} userDetails={userDetails} logout={logout}
                                                   getUserDetails={getUserDetails}/>}/>


                <Route path="/allusers" element={<><p>Alle User</p></>}/>

                <Route path="/userprofile"
                       element={<UserProfile user={props.user} userDetails={userDetails} logout={logout}
                                             getUserDetails={getUserDetails}/>}/>

                <Route path="/adduser" element={<><p>Benutzer anlegen</p></>}/>


                <Route path="/allcostumers" element={<><p>Alle Kunden</p></>}/>

                <Route path="/addcostumer" element={<AddCostumer/>}/>


                <Route path="/allstorages" element={<><p>Alle Storages</p></>}/>

                <Route path="/addstorage" element={<><p>Storage anlegen</p></>}/>


                <Route path="/allclouds" element={<><p>Alle Clouds</p></>}/>

                <Route path="/addcloud" element={<><p>Cloud anlegen</p></>}/>


            </Routes>
        </StyledMain>
        <Footer/>
    </>
}

const StyledMain = styled.main`
  display: flex;
  justify-content: center;
  min-height: 200px;
`

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 100%;
  margin: 10px;
  padding: 20px;
  border: 1px solid rgba(10 10 10 0.3);
  border-radius: 1pc;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .5), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .5);
  background-color: var(--color-background);
`

const StyledMainButton = styled.button`
  background-color: var(--color-white);
  border: none;
  border-radius: 10px;
  width: 200px;
  color: var(--color-black);
  margin: 5px 0;
  padding: 15px;
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  display: inline-block;
  cursor: pointer;
  transition: all 0.4s ease 0s;

  :hover {
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.35), 0 17px 50px 0 rgba(0, 0, 0, 0.35);
  }

  :active {
    background-color: var(--color-button-active);
  }
`

const StyledButton = styled.button`
  background-color: var(--color-white);
  border: none;
  border-radius: 10px;
  width: 180px;
  color: var(--color-black);
  margin: 5px 0;
  padding: 15px;
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
  display: inline-block;
  cursor: pointer;
  transition: all 0.4s ease 0s;

  :hover {
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.35), 0 17px 50px 0 rgba(0, 0, 0, 0.35);
  }

  :active {
    background-color: var(--color-button-active);
  }
`

const StyledSubButton = styled.button`
  background-color: var(--color-middlegrey);
  border: none;
  border-radius: 10px;
  width: 160px;
  color: var(--color-black);
  margin: 5px 0;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
  display: inline-block;
  cursor: pointer;
  transition: all 0.4s ease 0s;

  :hover {
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.35), 0 17px 50px 0 rgba(0, 0, 0, 0.35);
    background-color: var(--color-darkgrey);
  }

  :active {
    background-color: var(--color-button-active);
  }
`

const StyledAddButton = styled.button`
  background-color: var(--color-button-darker-green);
  border: none;
  border-radius: 10px;
  width: 160px;
  color: var(--color-white);
  margin: 5px 0;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
  display: inline-block;
  cursor: pointer;
  transition: all 0.4s ease 0s;

  :hover {
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.35), 0 17px 50px 0 rgba(0, 0, 0, 0.35);
    background-color: var(--color-green);
  }

  :active {
    background-color: var(--color-button-active);
  }
`

const StyledLogoutButton = styled.button`
  background-color: var(--color-button-darker-red);
  border: none;
  border-radius: 10px;
  width: 160px;
  color: var(--color-white);
  margin: 5px 0;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
  display: inline-block;
  cursor: pointer;
  transition: all 0.4s ease 0s;

  :hover {
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.35), 0 17px 50px 0 rgba(0, 0, 0, 0.35);
    background-color: var(--color-red);
  }

  :active {
    background-color: var(--color-button-active);
  }
`
