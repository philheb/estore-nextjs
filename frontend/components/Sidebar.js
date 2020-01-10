import { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from "../actions/category";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const Sidebar = props => {
  const [loadingCat, setLoadingCat] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [showingCategories, setShowingCategories] = useState(false);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [error, setError] = useState("");
  const [minError, setMinError] = useState(false);
  const [maxError, setMaxError] = useState(false);
  const [priceError, setPriceError] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    setLoadingCat(true);
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
        setLoadingCat(false);
      } else {
        setCategories(data);
        setLoadingCat(false);
      }
    });
  };

  const showCategories = () => {
    return categories.map((cat, index) => {
      return (
        <div key={index}>
          <Link href={`/category/${cat.slug}`}>
            <a
              style={
                category === cat.slug
                  ? {
                      fontSize: "14px",
                      color: "#212529",

                      cursor: "pointer"
                    }
                  : {
                      fontSize: "14px",
                      color: "#888",
                      cursor: "pointer"
                    }
              }
            >
              {cat.name}
            </a>
          </Link>

          <hr />
        </div>
      );
    });
  };

  const categoriesDropdown = () => {
    if (showingCategories) {
      return (
        <div>
          <a
            onClick={() => setShowingCategories(!showingCategories)}
            style={{ cursor: "pointer" }}
          >
            Categories
            <IoMdArrowDropup />
          </a>
          {loadingCat ? (
            <div className='spinner-border' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          ) : (
            <div className='mt-4'>{showCategories()}</div>
          )}
        </div>
      );
    } else {
      return (
        <a
          onClick={() => setShowingCategories(!showingCategories)}
          style={{ cursor: "pointer" }}
        >
          Categories
          <IoMdArrowDropdown />
        </a>
      );
    }
  };

  const onMinChange = e => {
    setMinError(false);
    setPriceError("");
    const value = parseFloat(e.target.value).toFixed(2);
    if (value == NaN) {
      setMinError(true);
    } else {
      setMin(value);
    }
  };

  const onMaxChange = e => {
    setMaxError(false);
    setPriceError("");
    const value = parseFloat(e.target.value).toFixed(2);
    if (value == NaN) {
      setMaxError(true);
    } else {
      setMax(value);
    }
  };

  const onSetPrice = () => {
    if (min && max) {
      props.handlePrice(min, max);
    } else {
      setPriceError("Please choose a valid minimum and maximum price.");
    }
  };

  return (
    <aside className='col-lg-2 col-md-3 mb-5' style={{ maxWidth: "250px" }}>
      <div id='price' className='mb-5'>
        <h5 className='mb-4'>Filter by Price</h5>
        <div className='input-group input-group-sm mb-3'>
          <div className='input-group-prepend' style={{ width: "60px" }}>
            <span className='input-group-text' style={{ width: "100%" }}>
              min $
            </span>
          </div>
          <input
            onChange={onMinChange}
            type='number'
            className='form-control'
            aria-label='Amount (to the nearest dollar)'
          />
        </div>
        <div className='input-group input-group-sm mb-3'>
          <div className='input-group-prepend' style={{ width: "60px" }}>
            <span className='input-group-text' style={{ width: "100%" }}>
              max $
            </span>
          </div>
          <input
            onChange={onMaxChange}
            type='number'
            className='form-control'
            aria-label='Amount (to the nearest dollar)'
          />
        </div>
        {priceError ? (
          <div className='alert alert-danger'>{priceError}</div>
        ) : (
          ""
        )}
        <button onClick={onSetPrice} className='btn btn-sm btn-primary'>
          Set Price
        </button>
      </div>
      <div id='category'>
        <h5 className='mb-4'>Filter by Categories</h5>
        {categoriesDropdown()}
      </div>
    </aside>
  );
};

export default Sidebar;
