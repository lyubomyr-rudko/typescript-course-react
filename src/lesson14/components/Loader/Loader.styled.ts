import styled from 'styled-components';

export const LoaderBackDrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 100vh;

    background-color: #00000050;
`;

export const SimpleLoader = styled.p`
    padding: 18px;

    background-color: #eee;
    border-bottom-right-radius: 50%;
    border-top-left-radius: 50%;
`;
