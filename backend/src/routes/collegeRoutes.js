const express = require('express');
const router = express.Router();
const {
  getColleges,
  getCollegeAnalytics,
} = require('../controllers/collegeController');

router.get('/', getColleges);
router.get('/analytics', getCollegeAnalytics);

module.exports = router;
