///// PACKAGES
// 1. npm init -y
// 2. npm install nodemon --save-dev
// 3. npm install express
// 4. npm install mongoose
// == ENV ==
// 5. installing env package:- "npm install dotenv --save"
// == BCRYPT ==
// 6. "npm install bcrypt" package code
// == Validator ==
// 7. "npm i validator" package code
// == JWT ==
// 8. "npm install jsonwebtoken" package code

const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 2500;
const authRouter = require("./routes/authRouter.js"); // this imported and require to be used as a middleware
const goalRouter = require("./routes/goalRouter.js"); // this imported and require to be used as a middleware
const auth = require("./middlewares/authentication.js");
const oopps = require("./utils/notfound.js");

//Middlewares
app.use(express.json());
app.use("/api/v1", authRouter); //authRouter used as middleware for domain url
app.use("/api/v1/goal", auth, goalRouter);
app.use(oopps);

// creating an establish to connect our server to the database i.e server should run wen connected to database.
const start = async () => {
  try {
    //using our env: it is connected to the liveserver to require it using "process.env.?"
    await mongoose.connect(process.env.MONGODB_URI); //".connect()" is a method to connect mongoose to our database
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT} and database connected`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
