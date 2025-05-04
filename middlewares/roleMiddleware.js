const restrictTo = (role) => (req, res, next) => {
  try {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = restrictTo;
