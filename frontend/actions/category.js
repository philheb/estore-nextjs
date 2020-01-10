import fetch from "isomorphic-fetch";
import { API } from "../config";
import { handleResponse } from "./auth";

export const createCategory = (category, token) => {
  return fetch(`${API}/category/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(res => {
      handleResponse(res);
      return res.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.log(err);
    });
};

// export const getCategory = (slug, limit, skip, lte, gte, search) => {
//   const data = { slug, limit, skip, lte, gte, search };
//   console.log(data);
//   return fetch(`${API}/category/${slug}`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(data)
//   })
//     .then(res => {
//       return res.json();
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };
export const getCategory = data => {
  console.log(data);
  // return fetch(`${API}/category/${data.slug}`, {
  return fetch(`${API}/category/${data.slug}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const removeCategory = (slug, token) => {
  return fetch(`${API}/category/${slug}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      handleResponse(res);
      return res.json();
    })
    .catch(err => {
      console.log(err);
    });
};
