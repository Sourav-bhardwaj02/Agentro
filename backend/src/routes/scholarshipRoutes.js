const express = require('express');
const router = express.Router();
const {
  getScholarships,
  createScholarship,
  updateScholarship,
  deleteScholarship,
} = require('../controllers/scholarshipController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', protect, getScholarships);
router.post('/', protect, adminOnly, createScholarship);
router.put('/:id', protect, adminOnly, updateScholarship);
router.delete('/:id', protect, adminOnly, deleteScholarship);

module.exports = router;
