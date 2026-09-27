const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").catch(console.error);

// make sure to put the line below before the router
app.use(express.json());

// Implemented a temporary authorization solution (middleware) below:
app.use((req, res, next) => {
  req.user = {
    _id: "6ab8a8e9593b4bb16dbe0d32",
  };
  next();
});

app.use("/", mainRouter);

app.listen(PORT);
