import express, { json, urlencoded } from "express";
const app = express();
const port = 2000;

import logInRouter from './routes/logInRouter.js';

app.use(json());
app.use(urlencoded({ extended: true, }));


import cors from 'cors';
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use("/api/users", logInRouter);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});