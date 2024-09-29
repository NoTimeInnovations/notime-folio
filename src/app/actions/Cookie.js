"use server";

const { cookies } = require("next/headers");

export const SetCookies = (name, value, exp) => {
  const expires = exp * 1000;
  cookies().set(name, JSON.stringify(value), {
    path: "/",
    expires: expires,
  });
};

export const GetCookies = async(name) => {
  const data = await cookies().get(name).value;
  return data;
};
