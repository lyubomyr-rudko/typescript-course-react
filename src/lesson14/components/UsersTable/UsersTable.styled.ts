import styled from 'styled-components';

export const Table = styled.table`
    margin: 0 auto;
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
