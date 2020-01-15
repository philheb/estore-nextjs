import fetch from "isomorphic-fetch";
import queryString from "query-string";
import { API } from "../config";
import { handleResponse } from "./auth";

export const createOrder = (token, orderData) => {
  return fetch(`${API}/order/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ order: orderData })
  })
    .then(res => {
      handleResponse(res);
      return res.json();
    })
    .catch(err => {
      console.log(err);
    });
};
