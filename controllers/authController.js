const User = require("../models/authSchema"); //require out schema structure used to query the database
const handleError = require("../utils/handleError")

const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, user });
  } catch (error) {
    // res.json({ error });
     const errors = handleError(error)
    console.log(error);
    //   const errors = handleError(error)
    //   res.status(400).json(errors)
  }
};

const login = async (req, res) => {
  // conditional statement to the req.body on the postman
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide necessary information" });
  }
  try {
    // condition to check if an email already exist or registered below;
    const userExists = await User.findOne({ email }); // findOne() is a method used to findOne email and value in the database i.e 'User'
    // console.log("this is for userExist ===>", userExists)
    if (!userExists) {
      return res
        .status(400)
        .json({ success: false, msg: "Email has not been registered" });
      //throw Error("incorrect email")
    }
    // function condition to authenticate password from the schema "comparePassword" method
    const authPassword = await userExists.comparePassword(password);
    if (!authPassword) {
      return res
        .status(400)
        .json({ success: false, msg: "email or password is incorrect" });
      // throw Error("incorrect password")
    }
    //function to generate token wen user is autthenticated below;
    const token = userExists.generateToken();
    res.status(200).json({
      success: true,
      user: { name: userExists.name, email: userExists.email },
      token,
    });
  } catch (error) {
    const errors  = handleError(error)
    res.status(400).json(errors)
  }
};

module.exports = { register, login };
