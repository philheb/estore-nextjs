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

export const getAllProducts = () => {
  return fetch(
    `${API}/products?limit=100&sortBy=title
    `,
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

export const listRelated = product => {
  return fetch(`${API}/products/related`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
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

export const deleteProduct = (slug, token) => {
  return fetch(`${API}/product/${slug}`, {
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

export const updateProduct = (slug, token, product) => {
  return fetch(`${API}/product/${slug}`, {
    method: "PUT",
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
