import React from 'react';

import { IInputProps } from '../../types';

import { Label, TextInput } from './AddUserForm.styled';

const Input: React.FC<IInputProps> = React.memo(
    ({ label, handleChange, value, type, name }) => {
        return (
            <Label>
                {label}
                <TextInput
                    type={type}
                    name={name}
                    onChange={handleChange}
                    value={value}
                    required={true}
                />
            </Label>
        );
    },
    (prevProps, nextProps) =>
        prevProps.value === nextProps.value &&
        prevProps.handleChange === nextProps.handleChange
);

export default Input;
