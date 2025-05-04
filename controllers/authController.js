const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        nameMessage: "Name is required",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        emailMessage: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        passwordMessage: "Password is required",
      });
    }

    if (!role) {
      return res.status(400).json({
        success: false,
        roleMessage: "Role is required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        messsage: "User already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRegister = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await userRegister.save();

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }
  
     const token = jwt.sign(
        {id:user._id,role :user.role},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
     )
  
      return res.status(200).json({
        success: true,
        message: `${user.role} login successful`,
        token,
        user
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message,
      });
    }
  };

module.exports = { register ,userLogin };
