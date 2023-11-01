import styled, { keyframes } from 'styled-components';

export const UsersList = styled.ul`
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    margin-left: 15px;
`;

export const UserItem = styled.li`
    display: flex;
    align-items: center;
    column-gap: 8px;
`;

const loading = keyframes`
    0%{
        transform: translate(-50%, -50%) rotate(0);
    }
    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
`;

export const Loader = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    transform: translate(-50%, -50%);
    background-color: red;
    background: conic-gradient(transparent 20%, #eee);
    border-radius: 50%;
    animation-name: ${loading};
    animation-timing-function: linear;
    animation-duration: 1000ms;
    animation-iteration-count: infinite;

    &::before {
        position: absolute;
        content: '';
        width: 80%;
        height: 80%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #242424;
        border-radius: 50%;
    }
`;
