const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const registerUser = async (userData) => {
  const userExists = await User.findOne({ where: { email: userData.email } });
  if (userExists) throw new Error("User already exists");
  const user = await User.create(userData);
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id),
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (user && (await user.comparePassword(password))) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    };
  }
  throw new Error("Invalid email or password");
};

const updateProfile = async (userId, updateData) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");
  return await user.update(updateData);
};

const changePassword = async (
  userId,
  { oldPassword, newPassword, confirmPassword },
) => {
  if (newPassword !== confirmPassword)
    throw new Error("Passwords do not match");

  const user = await User.findByPk(userId);
  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) throw new Error("Current password incorrect");

  user.password = newPassword;
  await user.save();
  return { message: "Password updated successfully" };
};

module.exports = { registerUser, loginUser, updateProfile, changePassword };
