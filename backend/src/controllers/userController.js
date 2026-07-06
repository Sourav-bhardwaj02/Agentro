const User = require('../models/User');

// @desc  Get profile
// @route GET /api/users/profile
// @access Private
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// @desc  Update profile
// @route PUT /api/users/profile
// @access Private
const updateProfile = async (req, res, next) => {
  try {
    const allowedFields = ['name', 'avatar', 'gpa', 'satScore', 'actScore', 'targetMajors', 'targetColleges'];
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// @desc  Get all users (admin only)
// @route GET /api/users
// @access Private/Admin
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-__v');
    res.json({ success: true, count: users.length, users });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, updateProfile, getAllUsers };
