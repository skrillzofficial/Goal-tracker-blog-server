const router = require("express").Router()
const {register, login} = require("../controllers/authController")


//ROUTE 1
router.post("/register", register)
//ROUTE 2
router.post("/login", login)




module.exports = router