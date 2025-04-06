import express, { json, urlencoded } from "express";
const app = express();
const port = 2000;

import logInRouter from './routes/logInRouter.js';
import catalogsRouter from './routes/catalogsRouter.js';
import ordersRouter from './routes/ordersRouter.js';

app.use(json());
app.use(urlencoded({ extended: true, }));


import cors from 'cors';
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

// to logIn + signUp
app.use("/api/users", logInRouter);

// import all catalogs
app.use('/api/catalogs', catalogsRouter);

// manage the orders
app.use('/api/Orders', ordersRouter);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});