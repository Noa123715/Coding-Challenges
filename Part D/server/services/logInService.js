import query from "./db.js";

async function getLogIn(username, password) {
  const data = await query(`SELECT * FROM users WHERE username = ${JSON.stringify(username)} AND password = ${JSON.stringify(password)}`);
  console.log(data);
  return data;
}

export default { getLogIn };
