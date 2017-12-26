export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const OI = "OI"

export const login = () => {

}

export function sayHi(ola) {
  return {
    type: OI,
    ola,
  }
}