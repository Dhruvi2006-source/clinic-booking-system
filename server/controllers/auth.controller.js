const authService = require('../services/auth.service');

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await authService.registerUser(name, email, password, role);

    return res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      data: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe
};
