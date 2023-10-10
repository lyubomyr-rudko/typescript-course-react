import styled from 'styled-components';
import { TUser } from '../users-data';

const hairCoklors: {
    [key: string]: string;
} = {
    auburn: '#b00b69',
    black: '#000',
    blond: '#b38b67',
    chestnut: '#954535',
    brown: '#964B00',
};

export const Section = styled.section`
    padding: 100px 0;
    width: 100vw;
`;

export const Title = styled.h1`
    margin-bottom: 36px;
    font-size: 20px;
`;

export const Container = styled.div`
    padding: 0 15px;
    margin: 0 auto;
    max-width: 1150px;
`;

export const Table = styled.table`
    margin: 0 auto;
    table-layout: fixed;
    width: calc(100% - 92px * 2);

    border-collapse: collapse;
    box-shadow: 1px 1px 4px #565656;
    th,
    td {
        padding: 10px;
    }
`;

export const Thead = styled.thead`
    th {
        text-align: left;
        color: #fff;
        background-color: #706d97;

        &:last-child {
            text-align: right;
        }
    }
`;

export const Tbody = styled.tbody`
    tr:nth-child(odd) {
        background-color: #eee;
    }

    td {
        min-width: 250px;
        color: #696969;
        border-bottom: 1px solid #eee;

        &:first-child {
            width: 150px;
            min-width: 0;
        }

        &:last-child {
            width: 80px;
            min-width: 0;
            text-align: right;
        }
    }
`;

export const HairColorIcon = styled.span`
    display: inline-block;
    width: 21px;
    height: 21px;

    background-color: ${({ color }: { color: TUser['hair']['color'] }) =>
        hairCoklors[color]};
    border-radius: 50%;
`;
