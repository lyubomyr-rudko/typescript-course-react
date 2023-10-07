import styled, { keyframes } from 'styled-components';

const visible = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const UsersList = styled.ul`
    display: flex;
    flex-direction: column;
    margin: 20px 0 0 60px;
    row-gap: 4px;
`;

export const UsersItem = styled.li`
    position: relative;
    display: flex;
    align-items: center;
    column-gap: 4px;
`;

export const Button = styled.button`
    padding: 4px;
    cursor: pointer;
    background-color: transparent;
    transform-origin: border-radius, background-color;
    transition-duration: 300ms;
    transition-timing-function: linear;

    &:hover {
        border-radius: 10px;
        background-color: #2e2e2e;
    }
`;

export const Like = styled.span`
    position: absolute;
    transform: translateX(-110%);
    animation: ${visible} 300ms linear 1;
`;
