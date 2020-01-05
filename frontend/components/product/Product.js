import { useEffect, useState } from "react";
import { getCookie } from "../../actions/auth";
import { createProduct } from "../../actions/product";
import { getCategories } from "../../actions/category";

const Product = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
    quantity: "",
    shipping: "",
    isLoading: false,
    loadingPicture: false,
    error: "",
    success: "",
    createdProduct: ""
  });
  const [loadedCategories, setLoadedCategories] = useState([]);

  const {
    title,
    description,
    price,
    imageUrl,
    category,
    quantity,
    shipping,
    isLoading,
    error,
    success,
    loadingPicture
  } = values;

  const token = getCookie("token");

  useEffect(() => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedCategories(data);
      }
    });
  }, []);

  const mapCategories = () => {
    return loadedCategories.map((category, i) => {
      return (
        <option key={i} value={category._id}>
          {category.name}
        </option>
      );
    });
  };

  const changeHandler = name => async e => {
    if (name === "image") {
      setValues({ ...values, loadingPicture: true });
      const file = e.target.files[0];
      if (file.size > 10000000) {
        setValues({
          ...values,
          loadingPicture: false,
          error: "The image should be less than 10mb."
        });
      } else {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "product");
        try {
          const res = await fetch(
            "https://api.cloudinary.com/v1_1/seoblog/image/upload",
            {
              method: "POST",
              body: data
            }
          );
          const image = await res.json();
          // setImageUrl(image.secure_url);
          setValues({
            ...values,
            imageUrl: image.secure_url,
            loadingPicture: false,
            error: false,
            success: false
          });
        } catch (e) {
          setValues({ ...values, loadingPicture: false });
        }
      }
    } else {
      setValues({
        ...values,
        [name]: e.target.value,
        error: false,
        success: false
      });
    }
  };

  const checkedShippingHandler = e => {
    if (shipping === false) {
      setValues({ ...values, error: "", shipping: true });
    } else {
      setValues({ ...values, error: "", shipping: false });
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    setValues({ ...values, error: "", isLoading: true });
    const newProduct = {
      title,
      description,
      price,
      imageUrl,
      category,
      quantity,
      shipping
    };
    createProduct(newProduct, token).then(data => {
      if (data.error) {
        setValues({ ...values, isLoading: false, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          description: "",
          price: "",
          imageUrl: "",
          category: "",
          quantity: "",
          shipping: "",
          isLoading: false,
          success: `${data.title} as been successfully created.`
        });
      }
    });
    setValues({ ...values, isLoading: false });
  };

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className='alert alert-success'
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>
  );

  const newProductForm = () => {
    return (
      <form onSubmit={submitHandler} autoComplete='off'>
        <div className='form-group'>
          <label className='text-muted'>Product Image</label>
          <input
            className='form-control'
            onChange={changeHandler("image")}
            type='file'
            placeholder='Upload a profile picture'
          />
          <small className='text-muted'>
            Please use an image smaller than 10mb
          </small>
        </div>
        <div>
          {loadingPicture ? (
            <div className='spinner-border text-primary' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          ) : (
            <img
              src={
                imageUrl
                  ? imageUrl
                  : "https://res.cloudinary.com/seoblog/image/upload/v1577972957/ecommerce/products/default_egwjnk.jpg"
              }
              alt='product image'
              className='img img-fluid mb-3 '
              style={{
                width: 300,
                height: 300,
                objectFit: "cover",
                borderRadius: 5
              }}
            />
          )}
        </div>

        <div className='form-group'>
          <label className='text-muted'>Title</label>
          <input
            onChange={changeHandler("title")}
            value={title}
            type='text'
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Description</label>
          <textarea
            onChange={changeHandler("description")}
            value={description}
            type='text'
            className='form-control'
            rows='3'
            maxLength='2000'
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Price</label>
          <input
            onChange={changeHandler("price")}
            value={price}
            type='number'
            min='0.01'
            step='0.01'
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Quantity</label>
          <input
            onChange={changeHandler("quantity")}
            value={quantity}
            type='number'
            min='1'
            step='1'
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Category</label>
          <select
            onChange={changeHandler("category")}
            value={category}
            className='form-control'
          >
            <option value=''>Choose One</option>
            {mapCategories()}
          </select>
        </div>
        <div className='form-group'>
          <label className='text-muted'>Shipping</label>
          <select
            onChange={changeHandler("shipping")}
            value={shipping}
            className='form-control'
          >
            <option value=''>Choose One</option>
            <option value='false'>No</option>
            <option value='true'>Yes</option>
          </select>
          <small className='text-muted'>
            Are you offering to ship the item? Select no if this is a digital
            product.
          </small>
        </div>

        <div className='form-group'>
          {showError()}
          {showSuccess()}
          <button type='submit' className='btn btn-primary'>
            {isLoading ? (
              <div className='spinner-border' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    );
  };

  return <div>{newProductForm()}</div>;
};

export default Product;
