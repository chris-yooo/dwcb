import styled from "styled-components";
import React from "react";

export default function Header() {

    return <>
        <StyledHeader>
            <StyledH1>DieWerkstattCloud-Backend</StyledH1>
        </StyledHeader>
    </>
}

const StyledHeader = styled.header`
  margin: 0 0 20px 0;
  padding: 10px;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .5), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .5);
  text-align: center;
`

const StyledH1 = styled.h1`
  margin: 20px 0 0 0;
  font-size: 2.4rem;
  color: var(--color-white);
  text-shadow: 0 0 10px rgb(193, 193, 193);
`
