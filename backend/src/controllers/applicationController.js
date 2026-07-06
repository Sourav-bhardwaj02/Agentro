const Application = require('../models/Application');

// @desc  Get all applications for logged-in user
// @route GET /api/applications
// @access Private
const getApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ user: req.user._id }).sort({ deadline: 1 });
    res.json({ success: true, count: applications.length, applications });
  } catch (err) {
    next(err);
  }
};

// @desc  Create a new application
// @route POST /api/applications
// @access Private
const createApplication = async (req, res, next) => {
  try {
    const { universityName, program, deadline, type, notes } = req.body;
    const application = await Application.create({
      user: req.user._id,
      universityName,
      program,
      deadline,
      type,
      notes,
    });
    res.status(201).json({ success: true, application });
  } catch (err) {
    next(err);
  }
};

// @desc  Update an application
// @route PUT /api/applications/:id
// @access Private
const updateApplication = async (req, res, next) => {
  try {
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.json({ success: true, application });
  } catch (err) {
    next(err);
  }
};

// @desc  Delete an application
// @route DELETE /api/applications/:id
// @access Private
const deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.json({ success: true, message: 'Application deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getApplications, createApplication, updateApplication, deleteApplication };
