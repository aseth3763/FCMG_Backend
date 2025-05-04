const User = require('../models/userModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password for safety

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { getAllUsers };
