import { useState, useContext, useCallback } from 'react';
import { ValidationError } from 'yup';

import { validationSchema } from '../../utils/validationSchema';
import { UsersContext } from '../UsersContext';

import Input from './Input';
import ErrorMessage from './ErrorMessage';

import { Form, Label } from './AddUserForm.styled';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    hairColor: 'Auburn',
    isFemale: false,
};

const AddUserForm = () => {
    const [formData, setFormData] = useState<typeof initialState>(initialState);
    const [errors, setErrors] = useState<ValidationError | null>(null);
    const [isErrorsShown, setIsErrorsShown] = useState<boolean>(false);
    const [isDataValid, setIsDataValid] = useState<boolean>(false);
    const { usersCount, handleAddUser } = useContext(UsersContext);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = e.target;

            setFormData((prevState) => ({
                ...prevState,
                [name]: name === 'isFemale' ? !formData.isFemale : value,
            }));
        },
        [formData.isFemale, setFormData]
    );

    const handleValidate = async () => {
        try {
            await validationSchema.validate(formData, {
                abortEarly: false,
            });
            setIsDataValid(true);
        } catch (err) {
            if (err instanceof ValidationError) {
                setErrors(err);
                setIsErrorsShown(true);
                setTimeout(() => {
                    setIsErrorsShown(false);
                }, 2000);
            }
            setIsDataValid(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isDataValid) return;

        const newFormData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            birthDate: formData.birthDate,
            hair: { color: formData.hairColor },
            gender: formData.isFemale ? 'female' : 'male',
            position: usersCount + 1,
        };

        await handleAddUser(newFormData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                name="firstName"
                value={formData.firstName}
                handleChange={handleChange}
                label=" First Name"
                type="text"
            />
            <Input
                name="lastName"
                value={formData.lastName}
                handleChange={handleChange}
                label="Last Name"
                type="text"
            />
            <Input
                name="email"
                value={formData.email}
                handleChange={handleChange}
                label="Email"
                type="email"
            />
            <Input
                name="birthDate"
                value={formData.birthDate}
                handleChange={handleChange}
                label="Birth Date"
                type="date"
            />
            <Label>
                Hair Color
                <select
                    name="hairColor"
                    value={formData.hairColor}
                    onChange={handleChange}
                >
                    {['Auburn', 'Black', 'Blond', 'Chestnut', 'Brown'].map(
                        (color) => (
                            <option key={color}>{color}</option>
                        )
                    )}
                </select>
            </Label>
            <Label>
                Are you a woman?
                <input
                    onChange={handleChange}
                    name="isFemale"
                    type="checkbox"
                    checked={formData.isFemale}
                />
            </Label>
            {errors && isErrorsShown && <ErrorMessage errors={errors} />}
            <button onClick={handleValidate}>Validate</button>
            <button disabled={!isDataValid}>Submit</button>
        </Form>
    );
};

export default AddUserForm;
