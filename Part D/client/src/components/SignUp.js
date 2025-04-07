import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp(props) {

  const Navigate = useNavigate();
  const [merchandiseList, setMerchandiseList] = useState([]);

  // define an error message for each field
  const validations = [
    { field: 'password', message: 'Please enter your password number to sign up' },
    { field: 'phone_number', message: 'Please enter your telephone number to sign up' },
    { field: 'username', message: 'Please enter your username to sign up' },
    { field: 'company_name', message: 'Please enter your company to sign up' },
    { field: 'contact_person', message: 'Please enter your contact to sign up' },
    { field: 'catalog_id', message: 'Please enter your merchandise to sign up' }
  ];

  async function getCatalogs() {
    try {
      let response = await fetch(`http://localhost:2000/api/catalogs`);
      response = await response.json();
      setMerchandiseList(response);
    } catch (error) {
      console.log(error);
    }
  }

  function getValuesFromInput(e) {
    const { name, value } = e.target;
    props.setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function setCatalog(e) {
    props.setUserData((prevData) => ({ ...prevData, 'catalog_id': e.target.value }));
    props.setUserData((prevData) => ({ ...prevData, 'user_type_id': '1' }));
  }

  async function toSubmit() {
    try {
      for (const validation of validations) {
        if (!props.userData[validation.field]) {
          alert(validation.message);
          return;
        }
      }
      let response = await fetch(`http://localhost:2000/api/users/newUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(props.userData),
        mode: 'cors'
      });
      response = await response.json();
      console.log(response);
      Navigate('/OrderList');
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCatalogs();
  }, []);

  return <>
    <h1>Hello! we happy to have you</h1>
    <div>
      <label for="company_name">Company Name:</label>
      <input type="text" id="company_name" name="company_name" onChange={getValuesFromInput} />

      <label for='username'>Username:</label>
      <input type="text" id="username" name="username" onChange={getValuesFromInput} />

      <label for='phone_number'>Telephone:</label>
      <input type="text" id="phone_number" name="phone_number" onChange={getValuesFromInput} />

      <label for='contact_person'>Your Contact Man In The Company:</label>
      <input type="text" id="contact_person" name="contact_person" onChange={getValuesFromInput} />

      <label for="catalog_id">Your merchandise:</label>
      <select id="dropdown" onChange={setCatalog}>
        <option value="">    Please choose an option    </option>
        {merchandiseList.map((option, index) => (
          <option key={index} value={option.catalog_id}>
            {option.catalog_name}
          </option>
        ))}
      </select>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" onChange={getValuesFromInput} />

      {/* <label for="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" name="confirmPassword" required/> */}

      <button onClick={toSubmit}>Sign Up</button>
    </div>
  </>
}