import { useFetch } from "./CustomHook";

// Пояснення
// За допомогою хука useFetch я фетчаю дату з переданої всередину url ,
// і мені повертає обьект який одразу має поля data , loading , error
const emptyUser = {
  id: 0,
  position: 0,
  firstName: "",
  lastName: "",
  maidenName: "",
  age: 0,
  gender: "",
  email: "",
  phone: "",
  username: "",
  password: "",
  birthDate: "",
  image: "",
  bloodGroup: "",
  height: 0,
  weight: 0,
  eyeColor: "",
  hair: {
    color: "",
    type: "",
  },
  domain: "",
  ip: "",
  address: {
    address: "",
    city: "",
    coordinates: {
      lat: 0,
      lng: 0,
    },
    postalCode: "",
    state: "",
  },
  macAddress: "",
  university: "",
  bank: {
    cardExpire: "",
    cardNumber: "",
    cardType: "",
    currency: "",
    iban: "",
  },
  company: {
    address: {
      address: "",
      city: "",
      coordinates: {
        lat: 0,
        lng: 0,
      },
      postalCode: "",
      state: "",
    },
    department: "",
    name: "",
    title: "",
  },
  ein: "",
  ssn: "",
  userAgent: "",
};
type TUser = typeof emptyUser;

export function CustomHookDemo() {
  const { data, loading, error } = useFetch({ url: "http://localhost:3004/users" });
  if (loading) return "Loading...";
  if (error) {
    throw new Error(`Something went wrong`);
  }
  if (data === undefined) return;
  return (
    <>
      <div>
        {data.map((user: any) => (
          <div key={user.birthDate}>{user.firstName}</div>
        ))}
      </div>
    </>
  );
}
