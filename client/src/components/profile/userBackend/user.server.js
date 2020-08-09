const express = require("express");
const cors = require("cors");
const mong = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3002; //FIXME: port can be changed or must be the same

app.use(cors());
app.use(express.json());

const uri = process.env.G_ATLAS;
mong.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mong.connection;
connection.once("open", () => {
  console.log("DATABASE CONNECTED");
});

const userRouter = require("./user.router");
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server runs on port: ${port}`);
});
