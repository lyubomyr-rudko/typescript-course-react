import {DetailedHTMLProps, InputHTMLAttributes, ReactNode} from "react";
import {FieldError} from "react-hook-form";

export type GetUsersResponse = IUser[];

export type TSelectOption = {
  label: string
  value: string
}

export type TAppContext = {
  users: IUser[]
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  setUsers: (users: IUser[]) => void,
}

export interface IUser {
  position:   number;
  id:         number;
  likes: {
    numbers: number
  }
  firstName:  string;
  lastName:   string;
  maidenName: string;
  age:        number;
  gender:     string;
  email:      string;
  phone:      string;
  username:   string;
  password:   string;
  birthDate:  string;
  image:      string;
  bloodGroup: string;
  height:     number;
  weight:     number;
  eyeColor:   string;
  hair:       IHair;
  domain:     string;
  ip:         string;
  address:    IAddress;
  macAddress: string;
  university: string;
  bank:       IBank;
  company:    ICompany;
  ein:        string;
  ssn:        string;
  userAgent:  string;
}

export interface IAddress {
  address:     string;
  city:        string;
  coordinates: ICoordinates;
  postalCode:  string;
  state:       string;
}

export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface IBank {
  cardExpire: string;
  cardNumber: string;
  cardType:   string;
  currency:   string;
  iban:       string;
}

export interface ICompany {
  address:    IAddress;
  department: string;
  name:       string;
  title:      string;
}

export interface IHair {
  color: string;
  type:  string;
}

export interface IModalProps {
  children: ReactNode,
  title: string
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
}

export interface ISelectProps {
  options: TSelectOption[]
  errors: FieldError | undefined
}

export interface IUserForm {
  firstName: string
  lastName: string
  hairColor: string
  isFemale: boolean
  birthDate: string
  email: string
}

export interface IUserProps {
  user: IUser;
}

export interface IInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  errors: FieldError | undefined
  label: string
}
