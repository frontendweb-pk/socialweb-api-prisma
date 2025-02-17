import Cookies from "js-cookie";

export const setCookie = () => {};
export const readCookie = (name: string = "refreshToken") => {
  const token = Cookies.get(name);
  console.log("T", token);
  return token;
};
