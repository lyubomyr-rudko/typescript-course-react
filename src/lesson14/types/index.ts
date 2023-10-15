export interface IUser {
    firstName: string;
    lastName: string;
    age: number;
    id: number;
    gender: string; //"male" | "female" | (string | {});
    hair:{
        color:string;
    };
    birthDate:string;
    phone:string;
    position?: number;

  }

  export interface IUserForm {
    firstName: string;
    lastName: string;
    age: number;
    gender: string; //"male" | "female" | (string | {});
    hair:{
        color:string;
    };
    birthDate:string;
    position: number;
    email:string;
  }

  export interface IUserProps {
    data: IUser;
    up: (id:number)=>void
  }

  export type TKeys = keyof IUserForm;
  export type TValues = (IUserForm)[TKeys];

  export interface IUserFormProps {
    submit: (data:IUserForm)=>void;
    close: ()=>void;
  }