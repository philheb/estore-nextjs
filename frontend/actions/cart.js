import fetch from "isomorphic-fetch";
import { API } from "../config";
import { handleResponse, isAuth } from "./auth";

export const addItem = item => {
  let cart = [];
  let localCart = localStorage.getItem("cart");
  if (typeof window !== "undefined") {
    if (localCart) {
      cart = JSON.parse(localCart);
    }
    cart.push({
      ...item,
      count: 1
    });

    cart = Array.from(new Set(cart.map(product => product._id))).map(id => {
      return cart.find(p => p._id === id);
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const totalItem = () => {
  let localCart = localStorage.getItem("cart");
  if (typeof window !== "undefined") {
    if (localCart) {
      return JSON.parse(localCart).length;
    }
  }
  return 0;
};

export const getCart = token => {
  // if (!isAuth()) {
  if (typeof window !== "undefined") {
    let localCart = localStorage.getItem("cart");
    if (localCart) {
      return JSON.parse(localCart);
    } else {
      return [];
    }
  }
  // } else if (isAuth()) {
  //   return fetch(`${API}/cart`, {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  //     .then(res => {
  //       handleResponse(res);
  //       console.log(res);
  //       return res.json();
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
};

export const updateItem = (productId, count) => {
  let updatedCart = [];
  const localCart = localStorage.getItem("cart");
  if (typeof window !== "undefined") {
    if (localCart) {
      updatedCart = JSON.parse(localCart);
    }
    updatedCart.map((product, index) => {
      if (product._id === productId) {
        updatedCart[index].count = parseInt(count);
      }
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }
};

export const removeItem = productId => {
  let updatedCart = [];
  const localCart = localStorage.getItem("cart");
  if (typeof window !== "undefined") {
    if (localCart) {
      updatedCart = JSON.parse(localCart);
    }
    updatedCart.map((product, index) => {
      if (product._id === productId) {
        updatedCart.splice(index, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }
  return updatedCart;
};

export const emptyCard = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
  }
};

// export const mergeLocalCart = token => {
//   if (typeof window !== "undefined") {
//     return fetch(`${API}/cart/merge`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//       },
//       body: localStorage.getItem("cart")
//     })
//       .then(res => {
//         handleResponse(res);
//         return res.json();
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// };
