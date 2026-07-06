const Scholarship = require('../models/Scholarship');

// @desc  Get all scholarships (with optional GPA filter)
// @route GET /api/scholarships
// @access Private
const getScholarships = async (req, res, next) => {
  try {
    const filter = { isActive: true };

    // Filter by minimum GPA eligibility
    if (req.query.minGPA) {
      filter.minGPA = { $lte: parseFloat(req.query.minGPA) };
    }

    // Filter by category
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const scholarships = await Scholarship.find(filter).sort({ deadline: 1 });
    res.json({ success: true, count: scholarships.length, scholarships });
  } catch (err) {
    next(err);
  }
};

// @desc  Create a scholarship (admin only)
// @route POST /api/scholarships
// @access Private/Admin
const createScholarship = async (req, res, next) => {
  try {
    const scholarship = await Scholarship.create(req.body);
    res.status(201).json({ success: true, scholarship });
  } catch (err) {
    next(err);
  }
};

// @desc  Update a scholarship (admin only)
// @route PUT /api/scholarships/:id
// @access Private/Admin
const updateScholarship = async (req, res, next) => {
  try {
    const scholarship = await Scholarship.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!scholarship) {
      return res.status(404).json({ success: false, message: 'Scholarship not found' });
    }
    res.json({ success: true, scholarship });
  } catch (err) {
    next(err);
  }
};

// @desc  Delete a scholarship (admin only)
// @route DELETE /api/scholarships/:id
// @access Private/Admin
const deleteScholarship = async (req, res, next) => {
  try {
    await Scholarship.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Scholarship deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getScholarships, createScholarship, updateScholarship, deleteScholarship };
