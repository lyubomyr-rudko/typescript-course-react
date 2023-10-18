import { IErrorMessagesProps } from '../../types';

import { ErrorMessagesWrapper } from './AddUserForm.styled';

const ErrorMessage: React.FC<IErrorMessagesProps> = ({ errors }) => {
    if (errors === null) return <></>;

    return (
        <ErrorMessagesWrapper>
            <p>ERRORS:</p>
            {errors.errors.map((err, i) => (
                <span key={i}>
                    {++i}. {err}
                </span>
            ))}
        </ErrorMessagesWrapper>
    );
};

export default ErrorMessage;
