import query from "./db.js";

async function getLogIn(username, password) {
  const data = await query(`SELECT * FROM users WHERE username = ${JSON.stringify(username)} AND password = ${JSON.stringify(password)}`);
  return data;
}

async function postSignUp(user) {
  const data = await query(`INSERT INTO users (user_type_id, username, company_name, phone_number, contact_person, catalog_id, password) VALUES (${JSON.stringify(user.user_type_id)}, ${JSON.stringify(user.username)}, ${JSON.stringify(user.company_name)}, ${JSON.stringify(user.phone_number)}, ${JSON.stringify(user.contact_person)}, ${JSON.stringify(user.catalog_id)}, ${JSON.stringify(user.password)})`);
  return data;
}

export default { getLogIn, postSignUp };
