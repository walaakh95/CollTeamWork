const adminMiddleware = (req, res, next) => {
  try {
    const userRole = req.user.role.toLowerCase()
    if (!req.user || userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied: Admins only.',
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
  
  module.exports = adminMiddleware;
  