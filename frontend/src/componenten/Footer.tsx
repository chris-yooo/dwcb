import styled from "styled-components";

export default function Footer() {

    return <>
        <StyledFooter>
            <StyledSubP>Copyright © 2022-2023 - <a href="https://dobamedia.com">dobamedia.com</a></StyledSubP>
        </StyledFooter>
    </>
}

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  color: var(--color-white);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  text-align: center;
`

const StyledSubP = styled.p`
  margin: 5px 0 15px 10px;
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--color-white);
  text-shadow: 0 0 10px var(--color-input-shadow);
`
