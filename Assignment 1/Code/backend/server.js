const express = require("express");
const cors = require('cors')
require("dotenv").config();
const connection = require("./config/DBConnection");
const UserRoutes  = require('./routes/UserRoutes')
const cookie_parser = require("cookie-parser");

// Variable
const app = express();
const port = process.env.PORT

// Middleware
app.use(express.json());
app.use(cookie_parser());
app.use(cors())

// Database Connection
connection()

// Routes
app.use('/api/v1/user/',UserRoutes);
app.get('/',(req,res)=>{
  res.send("It's Working")
})

// Server start after successfull db connection
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
