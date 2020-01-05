import fetch from "isomorphic-fetch";
import { API } from "../config";
import { handleResponse } from "./auth";

export const createProduct = (product, token) => {
  return fetch(`${API}/product/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(product)
  })
    .then(res => {
      handleResponse(res);
      return res.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const getProducts = sortBy => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.log(err);
    });
};

// export const getCategory = slug => {
//   return fetch(`${API}/category/${slug}`, {
//     method: "GET"
//   })
//     .then(res => {
//       return res.json();
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// export const removeCategory = (slug, token) => {
//   return fetch(`${API}/category/${slug}`, {
//     method: "DELETE",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`
//     }
//   })
//     .then(res => {
//       handleResponse(res);
//       return res.json();
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };
