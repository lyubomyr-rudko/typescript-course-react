import { useContext } from 'react';

import { IUserProps } from '../../types';
import { UsersContext } from '../UsersContext';

import { HairColorIcon, SwapButton } from './User.styled';

const User = ({ data, indx }: IUserProps) => {
    const { handleSwap, usersCount } = useContext(UsersContext);
    const {
        id,
        position,
        firstName,
        lastName,
        birthDate,
        gender,
        hair,
        email,
    } = data;
    const formateBirthDate = new Date(birthDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <tr>
            <td>
                <SwapButton
                    type="button"
                    onClick={() => handleSwap(id, position, 1)}
                    disabled={indx === 0}
                >
                    &#8593;
                </SwapButton>
                <SwapButton
                    type="button"
                    onClick={() => handleSwap(id, position, -1)}
                    disabled={indx === usersCount - 1}
                >
                    &#8595;
                </SwapButton>
            </td>
            <td>
                {firstName} {lastName}
            </td>
            <td>{gender}</td>
            <td>
                <HairColorIcon color={hair.color.toLowerCase()} />
            </td>
            <td>{formateBirthDate}</td>
            <td>{email}</td>
        </tr>
    );
};

export default User;
