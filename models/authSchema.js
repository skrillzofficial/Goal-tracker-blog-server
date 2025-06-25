const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// "npm i validator" code installing validator and is required in the schema to validate
const { isEmail } = require("validator");
// "npm install bcrypt" bcrypt must be reqiured b4 being use to hash each password.
const bcrypt = require("bcrypt");
// "npm install jsonwebtoken" code to install jwt and connect
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an emaill"],
      unique: true,
      validate: [isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
      minLength: [8, "the minimum length is 8"],
    },
  },
  { timestamps: true }
);

//Function for bcrypt below: this function is to salt and hash the password.
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt); //this.password is the password provided by the user
  next();
});

// function to compare password for login inside authController component;
userSchema.methods.comparePassword = async function (userPassword) {
  //bcrypt is used to compare the harsh password from the database and compare to
  const isCorrect = await bcrypt.compare(userPassword, this.password);

  return isCorrect;
};

//fuction to generate token with jwt below and import the signature from env file. The function then inport in the login controller.
// == What is jwt.sign() == Think of it like a "magic stamp" that turns your user’s info into a secure, tamper-proof ticket (JWT).
//Input: Your user’s ID + name + a secret password (jwt_secret).
//Output: A long, scrambled string (the JWT token).
// == What’s the "Payload" == The payload is like the "VIP pass details" inside the JWT. It holds: User info: userId and name (you choose what to include).
// Metadata:
// iat = "Issued at" (when the token was created).
// exp = "Expiry date" (here, 1d = 1 day).
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.jwt_secret,
    { expiresIn: "1d" }
  );
};

module.exports = mongoose.model("User", userSchema);
