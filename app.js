const express = require("express");
require("dotenv").config();
const app = express();

const { router } = require("./router");
const port = process.env.APP_PORT ?? 5000;

app.use(express.json());

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};
app.get("/", welcome);

app.use(router);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
