const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api", router);
app.get("/", (req,res)=>{
  res.send("Hello World!");
 
});

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("connnect to DB");
    console.log("Server is running " + PORT);
  });
});
