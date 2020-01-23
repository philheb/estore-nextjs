import fetch from "isomorphic-fetch";
import { API } from "../config";
import { handleResponse } from "./auth";

export const getUser = token => {
  return fetch(`${API}/user`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateUser = (token, user) => {
  return fetch(`${API}/user`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(user)
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateLocalStorage = (user, next) => {
  if (process.browser && localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify(user));
    next();
  }
};

export const getUserHistory = token => {
  return fetch(`${API}/user/history`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.log(err);
    });
};
