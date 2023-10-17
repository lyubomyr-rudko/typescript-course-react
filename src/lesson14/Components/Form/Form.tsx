import { useContext } from 'react';
import { isEmpty } from 'lodash';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ClassicInput, CustomSelect, DateInput, Checkbox, ModalContext, ClassicButton } from '../../Components';
import { StyledForm } from './Form.styled';

interface IFormValue {
  firstName: string;
  lastName: string;
  hairColor: string;
  email: string;
  female: boolean;
  birthDate: Date;
}

interface IRequestData {
  firstName: string;
  lastName: string;
  hair: {
    color: string,
  },
  gender: string;
  email: string;
  birthDate: string;
  id: number;
  position: number;
}

const hairColors = ["black", "blond", "brown", "chestnut", "auburn"];

const addNewUserValidationSchema = yup.object().shape({
  firstName: yup.string().required("Required field"),
  lastName: yup.string().required("Required field"),
  email: yup.string().email().required("Required field"),
  hairColor: yup.string().required("Required field"),
  female: yup.boolean().required("Required field"),
  birthDate: yup.date().required("Required field"),
});

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return year + "-" + month + "-" + day;
}

const Form = ({ maxPosition, handleGetAllUsers }: { maxPosition: number, handleGetAllUsers: () => void }) => {
  const { handleCloseModal } = useContext(ModalContext);
  const methods = useForm<IFormValue>({
    mode: "all",
    resolver: yupResolver(addNewUserValidationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      hairColor: "",
      email: "",
      female: false,
    }
  });

  const { formState: { errors } } = methods;

  const createNewUser = async (data: IRequestData) => {
    try {
      const response = await fetch(`http://localhost:3004/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error create New User");
      handleGetAllUsers();
      handleCloseModal();
    } catch (error) {
      console.log('error', error);
    }
  }

  const onSubmit: SubmitHandler<IFormValue> = async (data) => {
    const configureRequest = {
      firstName: data.firstName,
      lastName: data.lastName,
      hair: {
        color: data.hairColor,
      },
      email: data.email,
      gender: data.female ? "female" : "male",
      birthDate: formatDate(data?.birthDate),
      id: maxPosition + 1,
      position: maxPosition + 1
    }

    createNewUser(configureRequest)
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
        <ClassicInput
          label="First name"
          htmlFor='firstName'
          id='firstName'
          type='text'
          name='firstName'
          placeholder='First name'
          width="500px"
          errorMessage={errors?.firstName && errors?.firstName?.message?.toString()}
        />
        <ClassicInput
          label="Last name"
          htmlFor='lastName'
          id='lastName'
          type='text'
          name='lastName'
          placeholder='Last name'
          width="500px"
          errorMessage={errors?.lastName && errors?.lastName?.message?.toString()}
        />
        <CustomSelect
          label="Hair color"
          htmlFor='hairColor'
          id='hairColor'
          type='text'
          name='hairColor'
          placeholder="Hair color"
          width="500px"
          errorMessage={errors?.hairColor && errors?.hairColor?.message?.toString()}
          options={hairColors}
        />
        <ClassicInput
          label="Email"
          htmlFor='email'
          id='email'
          type='text'
          name='email'
          placeholder='Email'
          width="500px"
          errorMessage={errors?.email && errors?.email?.message?.toString()}
        />
        <Checkbox
          label="Female"
          htmlFor='female'
          id='female'
          name='female'
        />
        <DateInput
          label="Birthdate"
          htmlFor="birthDate"
          id="birthDate"
          name="birthDate"
          placeholder="Birthdate"
          errorMessage={errors?.birthDate && errors?.birthDate?.message?.toString()}
        />
        <ClassicButton width="100%" type='submit' disabled={!isEmpty(errors)}>create New User</ClassicButton>
      </StyledForm>
    </FormProvider>
  )
}

export default Form;