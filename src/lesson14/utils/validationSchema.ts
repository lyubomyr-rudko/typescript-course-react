import * as Yup from 'yup';

const emailRegEx = /^(?!-)[\w.-]{2,}@[\w-]+(\.[\w-]+)*\.[a-zA-Z]{2,}$/u;

export const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is a required field'),
    lastName: Yup.string().required('Last Name is a required field'),
    email: Yup.string()
        .matches(emailRegEx, 'Invalid email format')
        .required('Email is a required field'),
    birthDate: Yup.string().required('Birth Date is a required field'),
    hairColor: Yup.string().required(),
    isFemale: Yup.boolean().required(),
});
