const jwt = require("jsonwebtoken");

 const authMiddleware = (req, res, next) => {
    try{
        const token = req.headers.authorization;
    console.log(token,'token');
     if(!token){
        return res.status(401).json({
            success: false,
            message: "Unauthorized access",
        });
    }
     let tokensplit= token.split(" ")[1];
     console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("tokensplit:", tokensplit);

  const decoded = jwt.verify(
  tokensplit,
  process.env.JWT_SECRET
);
console.log("Decoded JWT:", decoded);
req.user = decoded
    next();
    }
    catch(error){
         console.log(error,'error')
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
 }
 module.exports = authMiddleware;