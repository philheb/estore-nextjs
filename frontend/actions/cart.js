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

export const getCart = () => {
  let localCart = localStorage.getItem("cart");
  if (typeof window !== "undefined") {
    if (localCart) {
      return JSON.parse(localCart);
    }
  }
  return [];
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
        updatedCart[index].count = count;
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
