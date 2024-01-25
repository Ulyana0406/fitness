import styled from "styled-components";
import { NavLink } from "react-router-dom";


export const HeaderButton = styled(NavLink)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 16px 7px 16px;
    font-size: 16px;
    line-height: 1.5;
    border-radius: 46px;
    background: var(--color-button-bg);
    transition: all 0.2s ease-in-out;

    &:hover {
        background: var(--color-button-bg-hover);
    }

    &:active {
        background: var(--color-button-bg-active);
    }
`