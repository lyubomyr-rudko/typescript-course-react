import Input from "./Input"
import {SubmitHandler, useForm} from "react-hook-form";
import {createUser} from "../api.ts";
import {IUserForm, TAppContext} from "../types.ts";
import {useContext} from "react";
import {AppContext} from "../../App.tsx";
import {InputWrapper} from "../Users-homework.styled.tsx";
import {validateBirthDate} from "../utils.ts";
import {emailRegex} from "../constants.ts";
const UserForm = () => {
  const {users, isLoading, setIsLoading, setUsers, setIsModalOpen} = useContext<TAppContext>(AppContext)
  const { register, handleSubmit, formState: { errors } } = useForm<IUserForm>({mode: 'onBlur'})
  const onSubmitUserForm: SubmitHandler<IUserForm> = (data: IUserForm) => {
    setIsLoading(true)
    createUser(data, users.length + 1)
      .then((res) => {
        setUsers(res.data)
        setIsModalOpen(false)
      })
      .finally(() => setIsLoading(false))
  }

  const isErrors = !!Object.keys(errors).length

  return (
    <form onSubmit={handleSubmit(onSubmitUserForm)}>
      <Input
        type='text'
        label='FirstName'
        errors={errors.firstName}
        id='firstName'
        {...register('firstName', { required: {value: true, message: 'This is required field'} })}
      />
      <Input
        type='text'
        label='LastName'
        id='lastName'
        errors={errors.lastName}
        {...register('lastName', { required: {value: true, message: 'This is required field'} })}
      />
      <InputWrapper>
        <select {...register("hairColor")}>
          <option value="Blond">Blond</option>
          <option value="Black">Black</option>
          <option value="Brown">Brown</option>
          <option value="Chestnut">Chestnut</option>
          <option value="Auburn">Auburn</option>
        </select>
      </InputWrapper>
      <Input
        type='checkbox'
        label='isFemale'
        id='isFemale'
        errors={errors.isFemale}
        {...register('isFemale')}
      />
      <Input
        type='date'
        errors={errors.birthDate}
        label='BirthDate'
        id='BirthDate'
        {...register('birthDate', {required: {value: true, message: 'Choose valid date'}, validate:validateBirthDate})}
      />
      <Input
        type='email'
        errors={errors.email}
        label='email'
        id='email'
        {...register('email', {required: {value: true, message:'This is required field'},pattern: {value: emailRegex, message: 'Invalid email'}})}
      />
      <button disabled={isLoading || isErrors}>Submit</button>
    </form>
  )
}

export default UserForm
