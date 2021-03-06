// Libraries
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
//const cors = require("cors");
const env = require("dotenv").config();
//const cookieParser = require("cookie-parser");
const auth = require("./routes/auth");
const postRoute = require("./routes/posts");

//Intialize Express Server
const app = express();
app.use(express.json());

//DB Connection
mongoose
  .connect(process.env.COSMOSDB_CONNECTOR, { useNewUrlParser: true })
  .then(() => console.log("Connection to CosmosDB successful"))
  .catch((err) => console.error(err));

app.use("/api/v1/auth", auth);
app.use("/api/v1/posts", postRoute);

//Server Details
const port = 4000;
app.listen(port, () => {
  console.log(`Demo Api app is running on port:${port}`)
});