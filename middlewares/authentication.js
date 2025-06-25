const jwt = require("jsonwebtoken")
// function to verify token created before user get access to routes
const auth = async(req, res, next) => {
     const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){ //"startsWith()" is a method to check if token start with bearer ans there must be space after bearer
       return res.status(401).json({success:false, msg: "Auth Failed"})
    }

    const token = authHeader.split(" ")[1]
    try {
        const payload = jwt.verify(token, process.env.jwt_secret)
        req.user = {userId: payload.userId, name: payload.name}
        next()
    } catch (error) {
        res.send(401).json({success:false, msg: "Auth failed"})
    }
}


module.exports = auth