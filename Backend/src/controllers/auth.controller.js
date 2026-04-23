const authService = require("../services/auth.service");

exports.register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await authService.loginUser(req.body.email, req.body.password);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res) => {
  res.json(req.user);
};

exports.updateMyProfile = async (req, res, next) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.profilePicture = req.file.path; // Multer handles this
    const updatedUser = await authService.updateProfile(
      req.user.id,
      updateData,
    );
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const result = await authService.changePassword(req.user.id, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
