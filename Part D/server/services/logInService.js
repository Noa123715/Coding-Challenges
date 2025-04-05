import { query } from './db';

async function getLogIn(mail, password) {
    const data = await query(`SELECT * FROM users WHERE email = ${JSON.stringify(mail)} AND password = ${JSON.stringify(password)}`);
    console.log(data);
   return data;
};

export default {getLogIn};