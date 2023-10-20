type TAction = {
  type: 'setName' | 'setLastName'
  payload: string
} | {
  type: 'login' | 'logout'
  payload: boolean
}
export type TAppState = {
  name: string
  lastName: string
  isLoggedIn: boolean
}
export const reducer = (state:TAppState, {type, payload}: TAction): TAppState => {
  switch (type) {
    case 'setName':
      return {
      ...state,
        name: payload
      }
    case 'setLastName':
      return {
        ...state,
        lastName: payload
      }
    case 'login':
      return {
        ...state,
        isLoggedIn: true,
      }
    case 'logout':
      return {
        ...state,
        isLoggedIn: false,
        name: '',
        lastName: ''
      }
    default: return state
  }
}
