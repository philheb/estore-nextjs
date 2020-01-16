import { useState, useEffect } from "react";

const CheckoutForm = props => {
  const [isValid, seIsValid] = useState(false);

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    province: "",
    postalCode: ""
  });

  const {
    firstName,
    lastName,
    address1,
    address2,
    city,
    province,
    postalCode
  } = address;

  useEffect(() => {
    if (props.savedAddress) {
      setAddress(props.savedAddress);
    }
  }, []);

  const handleChangeInput = name => e => {
    setAddress({
      ...address,
      [name]: e.target.value
    });
  };

  const handleFormCompleted = () => {};

  const handleConfirmAddress = e => {
    e.preventDefault();
    props.onConfirmAddress(address);
  };

  return (
    <form onSubmit={handleConfirmAddress}>
      <div className='row'>
        <div className='form-group col-6'>
          <label>First Name</label>
          <input
            type='text'
            className='form-control'
            placeholder='John'
            onChange={handleChangeInput("firstName")}
            value={firstName}
            required
          />
        </div>
        <div className='form-group col-6'>
          <label>Last Name</label>
          <input
            type='text'
            className='form-control'
            placeholder='Smith'
            onChange={handleChangeInput("lastName")}
            value={lastName}
            required
          />
        </div>
      </div>
      <div className='form-group'>
        <label>Address</label>
        <input
          type='text'
          className='form-control'
          placeholder='1234 Main St'
          onChange={handleChangeInput("address1")}
          value={address1}
          required
        />
      </div>
      <div className='form-group'>
        <label>Address 2</label>
        <input
          type='text'
          className='form-control'
          placeholder='Apartment, studio, or floor'
          onChange={handleChangeInput("address2")}
          value={address2}
        />
      </div>
      <div className='form-row'>
        <div className='form-group col-md-5'>
          <label>City</label>
          <input
            type='text'
            className='form-control'
            onChange={handleChangeInput("city")}
            value={city}
            required
          />
        </div>
        <div className='form-group col-md-4'>
          <label>Province</label>
          <select
            className='form-control'
            onChange={handleChangeInput("province")}
            value={province}
            required
          >
            <option></option>
            <option value='AB'>Alberta</option>
            <option value='BC'>British Columbia</option>
            <option value='MB'>Manitoba</option>
            <option value='NB'>New Brunswick</option>
            <option value='NL'>Newfoundland and Labrador</option>
            <option value='NS'>Nova Scotia</option>
            <option value='ON'>Ontario</option>
            <option value='PE'>Prince Edward Island</option>
            <option value='QC'>Quebec</option>
            <option value='SK'>Saskatchewan</option>
            <option value='NT'>Northwest Territories</option>
            <option value='NU'>Nunavut</option>
            <option value='YT'>Yukon</option>
          </select>
        </div>
        <div className='form-group col-md-3'>
          <label>Postal Code</label>
          <input
            type='text'
            className='form-control'
            onChange={handleChangeInput("postalCode")}
            value={postalCode}
            required
          />
        </div>
      </div>
      <div className='form-group mt-3'>
        <button className='btn btn-lg btn-block btn-primary'>
          Confirm Address and Continue to Payment
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
