"use server";

import { nanoid } from "nanoid";
import { OptionalUser } from "./types";
import bcrypt from "bcrypt";
import { addUser, getAllUsers } from "./api";
import { redirect } from "next/navigation";

export const handleSignup = async (prev: unknown, data: FormData) => {
  if (!data.get("name") || !data.get("surname") || !data.get("login") || !data.get("password")) {
    return {
      message: "Please fill all the filed!",
      name: data.get("name") as string,
      surname: data.get("surname") as string,
      login: data.get("login") as string,
      password: data.get("password") as string,
    };
  }

  const login = data.get("login") as string;
  const getUsers = getAllUsers();
  const userList: string[] = [];
  getUsers.map((elm) => {
    userList.push(elm.login);
  });
  userList.forEach((elm) => {
    if (elm == login) {
      return {
        message: "This login already exists!",
        name: data.get("name") as string,
        surname: data.get("surname") as string,
        password: data.get("password") as string,
      };
    }
  });

  const password = data.get("password");
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!regex.test(password as string)) {
    return {
      message:
        "Password must be minimum of 6 characters, letter, number, character.",
      name: data.get("name") as string,
      surname: data.get("surname") as string,
      login: data.get("login") as string,
    };
  }

  let user: OptionalUser = {
    id: nanoid(),
    name: data.get("name") as string,
    surname: data.get("surname") as string,
    login: data.get("login") as string,
  };
  user.password = await bcrypt.hash(data.get("password") as string, 10);

  addUser(user);
  redirect("/login");
};

export const handleLogin = async (prev: unknown, data: FormData) => {
  if (!data.get("login") || !data.get("password")) {
    return {
      message: "Please fill all the filed!",
      login: data.get("login") as string,
      password: data.get("password") as string,
    };
  }

  const login = data.get("login") as string;
  const getUsers = getAllUsers();
  const userList: string[] = [];
  getUsers.map((elm) => {
    userList.push(elm.login);
  });

  userList.forEach((elm) => {
    if (!(elm == login)) {
      return {
        message: "This login is not correct!",
        password: data.get("password") as string,
      };
    }
  });
  redirect("/profile");
};
