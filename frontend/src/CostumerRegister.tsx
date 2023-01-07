import React, {useState} from 'react';
import axios from "axios";
import styled from "styled-components";
import {Icon} from '@iconify/react';

export default function CostumerRegister() {

    const [wooId, setWooId] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [paket, setPaket] = useState("");
    const [messageStatus, setMessageStatus] = useState("")
    const [failedUser, setFailedUser] = useState("")
    const [errorMail, setErrorMail] = useState("");

    const costumerRegister = () => {
        axios.post("/api/costumers", {
            wooId,
            name,
            username,
            email,
            paket,
        })
            .then((response) => response.status)
            .then((status) => {
                if (status === 200) {
                    setMessageStatus(name + " erfolgreich gespeichert");
                    (setTimeout(() => setMessageStatus(""), 2500));
                    setWooId("");
                    setName("");
                    setUsername("");
                    setEmail("");
                    setPaket("");
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setFailedUser(username + " ist schon vergeben");
                    (setTimeout(() => setFailedUser(""), 2500));
                    setUsername("");
                }
                console.log("Error =>" + error)
            })
    }

    const isValidEmail = (email: string) => {
        return /.@./.test(email);
    }

    const handleCostumerRegister = (event: any) => {
        event.preventDefault();
        if (!isValidEmail(email)) {
            setErrorMail("Email scheint nicht richtig zu sein");
            (setTimeout(() => setErrorMail(""), 2500));
            return;
        } else {
            setErrorMail("");
        }
        costumerRegister();
    }

    return <>
        <StyledSection>
            <form onSubmit={handleCostumerRegister}>
                <StyledDiv1>
                    <StyledLabel htmlFor="firstname">Vorname:</StyledLabel>
                    <StyledInput type='text'
                                 id="wooId"
                                 value={wooId}
                                 onChange={(e) => setWooId(e.target.value)}
                                 placeholder={"672534"}
                                 required/>

                    <StyledLabel htmlFor={"lastname"}>Nachname:</StyledLabel>
                    <StyledInput type='text'
                                 id="name"
                                 value={name}
                                 onChange={(e) => setName(e.target.value)}
                                 placeholder="Max Mustermann"
                                 required/>

                    <StyledLabel htmlFor={"username"}>Username:</StyledLabel>
                    <StyledInput type='text'
                                 id="username"
                                 value={username}
                                 onChange={(e) => setUsername(e.target.value)}
                                 placeholder="maxmustermann"
                                 required/>

                    {failedUser && <StyledInputError>{failedUser}</StyledInputError>}

                    <StyledLabel htmlFor={"email"}>E-Mail:</StyledLabel>
                    <StyledInput type='text'
                                 id="email"
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 placeholder="max@Mustermann.de"
                                 required/>

                    {errorMail && <StyledInputError>{errorMail}</StyledInputError>}

                    <StyledLabel htmlFor={"paket"}>Passwort:</StyledLabel>
                    <StyledInput type='text'
                                 id="paket"
                                 value={paket}
                                 onChange={(e) => setPaket(e.target.value)}
                                 placeholder="Bello123!"
                                 required/>
                </StyledDiv1>
            </form>
            <StyledDiv3>
                <StyledButton>
                    <Icon icon="mdi:x" inline={true} width="15"/> Abbrechen
                </StyledButton>
                <StyledButton onClick={handleCostumerRegister}>
                    <Icon icon="mdi:register" inline={true} width="15"/> Anlegen
                </StyledButton>
            </StyledDiv3>
            {messageStatus && <StyledMessage>{messageStatus}</StyledMessage>}
        </StyledSection>
    </>;
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  width: 70%;
  padding: 8px 20px 25px 20px;
  border: 1px solid rgba(10 10 10 0.3);
  border-radius: 1pc;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .5), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .5);
  background-color: var(--color-background);
  @media (max-width: 768px) {
    width: 85%;
  }
`

const StyledDiv1 = styled.div`
  width: 80%;
  margin: 0 0 20px 0;
  padding: 10px;
`

const StyledDiv3 = styled.div`
  display: flex;
  align-self: center;
`;

const StyledMessage = styled.p`
  margin: 10px;
  padding: 8px;
  font-size: 0.9rem;
  color: var(--color-text);
`

const StyledInputError = styled.p`
  margin: 10px;
  padding: 8px;
  font-size: 1rem;
  color: var(--color-red);
`

const StyledButton = styled.button`
  margin: 3px;
  padding: 10px;
  width: 150px;
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

const StyledInput = styled.input`
  margin: 10px;
  padding: 13px 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 300px;
  height: 45px;
  background: var(--color-white);
  border: 1px solid var(--color-input-border);
  box-shadow: 0 0 40px var(--color-input-shadow);
  border-radius: 12px;
  font-size: 1rem;
`

const StyledLabel = styled.label`
  font-family: 'Inter', sans-serif;
  width: 150px;
  height: 22px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.02em;
  color: var(--color-white);
  text-shadow: 0 0 10px var(--color-input-shadow);
`
