const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if( !authHeader ) {
        return res.status(401).json({error: "unauthorized, access denied"});
    }

    try {

      const decodedToken =  jwt.verify(authHeader, config.get("JWT_SECRET"))
      req.userId = `Bearer ${decodedToken.user._id}`;

      next();

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Access denied"}); 
    }

}