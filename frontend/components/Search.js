import { useState, useEffect } from "react";
import Router from "next/router";
import { withRouter } from "next/router";
import { getCategories } from "../actions/category";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  Input,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { IoMdSearch } from "react-icons/io";

const Search = () => {
  const [values, setValues] = useState({
    categories: [],
    category: { name: "All" },
    search: undefined,
    results: [],
    searched: false,
    message: ""
  });
  const { categories, category, search, results, searched, message } = values;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [splitButtonOpen, setSplitButtonOpen] = useState(false);

  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

  const toggleSplit = () => setSplitButtonOpen(!splitButtonOpen);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  const showCategories = () =>
    categories.map((category, index) => {
      return (
        <DropdownItem
          key={index}
          value={category.slug}
          onClick={changeCategoryHandler(category)}
        >
          {category.name}
        </DropdownItem>
      );
    });

  const searchForm = () => (
    <form onSubmit={submitHandler} className='form-inline my-2 my-md-0 mr-4'>
      <div className='input-group'>
        <div className='input-group-prepend'>
          <button
            className='btn btn-outline-secondary dropdown-toggle'
            type='button'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          >
            Dropdown
          </button>
          <div className='dropdown-menu'>
            <a className='dropdown-item' href='#'>
              Action
            </a>
            <a className='dropdown-item' href='#'>
              Another action
            </a>
            <a className='dropdown-item' href='#'>
              Something else here
            </a>
            <div role='separator' className='dropdown-divider'></div>
            <a className='dropdown-item' href='#'>
              Separated link
            </a>
          </div>
        </div>
        <input
          className='form-control'
          type='search'
          placeholder='Search'
          aria-label='Search'
          onChange={changeHandler}
          style={{
            fontFamily: "Avenir, Arial, FontAwesome"
          }}
        />
      </div>
    </form>
  );

  const searchForm2 = () => (
    <form onSubmit={submitHandler} className='form-inline my-2 my-md-0 mr-4'>
      <InputGroup>
        <InputGroupButtonDropdown
          addonType='prepend'
          isOpen={dropdownOpen}
          toggle={toggleDropDown}
        >
          <DropdownToggle caret color='secondary'>
            {category.name}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              value='All'
              onClick={changeCategoryHandler({
                slug: "all",
                name: "All",
                _id: ""
              })}
            >
              All
            </DropdownItem>
            {showCategories()}
          </DropdownMenu>
        </InputGroupButtonDropdown>
        <Input onChange={changeHandler} placeholder='Search' />
        <InputGroupAddon addonType='append'>
          <Button color='secondary'>
            <IoMdSearch style={{ fontSize: 20 }} />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );

  const changeHandler = e => {
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: undefined,
      message: ""
    });
  };

  const changeCategoryHandler = cat => e => {
    setValues({
      ...values,
      category: cat
    });
  };

  const submitHandler = e => {
    e.preventDefault();
    Router.push({
      pathname: "/product/search",
      query: { search: search, category: category._id }
    });
  };

  return <div>{searchForm2()}</div>;
};

export default withRouter(Search);
