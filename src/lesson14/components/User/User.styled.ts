import styled from 'styled-components';

const hairCoklors: {
    [key: string]: string;
} = {
    auburn: '#b00b69',
    black: '#000',
    blond: '#b38b67',
    chestnut: '#954535',
    brown: '#964B00',
};

export const HairColorIcon = styled.span`
    display: inline-block;
    width: 21px;
    height: 21px;

    background-color: ${({ color }) =>
        color ? hairCoklors[color] : 'transparent'};
    border-radius: 50%;
`;

export const SwapButton = styled.button`
    font-size: 16px;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    transition: background-color 300ms ease-in-out;

    &:first-child {
        margin-right: 4px;
    }

    &:hover {
        background-color: gold;
    }

    &:disabled {
        background-color: #eee;
        opacity: 0.2;
    }
`;
