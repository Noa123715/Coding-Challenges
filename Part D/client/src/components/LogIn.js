//import react from 'react';

function LogIn() {
  return <>
  <h1 className="text-center text-2xl mt-10">Hello! To manage your orders, log in now</h1>
  <form action="submit.php" method="POST">
    <label for="telephone">Telephone:</label>
    <input type="text" id="telephone" name="telephone" required/>

    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required/>

    <button type="submit">Log In</button>
  </form>

  <h3>Don't have an account?</h3>
  <button type="submit">Sign Up</button>
  </>
}

export default LogIn;