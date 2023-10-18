import styled from 'styled-components';

export const Form = styled.form`
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 auto 20px;
    row-gap: 4px;
    width: fit-content;
`;

export const Label = styled.label`
    display: flex;
    justify-content: space-between;
    column-gap: 8px;
`;

export const TextInput = styled.input`
    border: 1px solid #eeeeee;
    outline: none;
`;

export const ErrorMessagesWrapper = styled.div`
    position: absolute;
    top: 0;
    right: -4px;
    transform: translateX(100%);
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    padding: 8px;

    font-size: 14px;
    color: darkred;
    border: 1px solid darkred;

    & p {
        text-align: center;
    }
`;
