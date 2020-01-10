import fetch from "isomorphic-fetch";
import queryString from "query-string";
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

export const getProduct = slug => {
  return fetch(`${API}/product/${slug}`)
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const getProducts = (sortBy, min, max, skip) => {
  let gte = min ? min : 0;
  let lte = max ? max : 99999999;
  let theSkip = skip ? skip : 0;

  return fetch(
    `${API}/products?sortBy=${sortBy}&order=desc&limit=6&gte=${gte}&lte=${lte}&skip=${theSkip}`,
    {
      method: "GET"
    }
  )
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const listSearch = params => {
  const query = queryString.stringify(params);
  return fetch(`${API}/products/search?${query}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
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
