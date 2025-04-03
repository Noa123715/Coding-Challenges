//import react from 'react';

function SignUp() {
    return <>
    <h1 className="text-center text-2xl mt-10">Hello! we happy to have you</h1>
    <form action="submit.php" method="POST">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required/>

      <label for='role'>Role:</label>
      <input type="text" id="role" name="role" required/>

      <label for='telephone'>Telephone:</label>
      <input type="text" id="telephone" name="telephone" required/>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required/>

      {/* <label for="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" name="confirmPassword" required/> */}
  
      <button type="submit">Log In</button>
    </form>
  
    <h3>Don't have an account?</h3>
    <button type="submit">Sign Up</button>
    </>
  }
  
  export default SignUp;