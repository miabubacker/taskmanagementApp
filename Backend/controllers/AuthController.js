const User = require("../models/User");
const bcrypt = require("bcrypt");
 const jsonwebtoken = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: false,
        message: "User already exists with this email",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password:hashedPassword,
    });

    await user.save();

    console.log(await bcrypt.compare(password, hashedPassword));
    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
 const loginUser = async (req, res) => {
   const { email, password } = req.body;
    try{
      if(!email || !password){
        return res.status(400).json({
          success: false,
          message: "Email and password are required"
        });
      }
       const user = await User.findOne({ email });
      if(!user){
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });
      }

      const token = jsonwebtoken.sign( { id: user._id,email: user.email }, process.env.JWT_SECRET,{expiresIn:"7d"});
      res.status(200).json({  
        success: true,
        message: "Login successful",
        token
      });
    }
    catch(error){ 
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
 }
module.exports = {
  registerUser,
   loginUser
};
