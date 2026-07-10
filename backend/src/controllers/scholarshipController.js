const Scholarship = require('../models/Scholarship');
const XLSX = require('xlsx');
const path = require('path');

// Load scholarship data from Excel file
const loadScholarshipsFromExcel = () => {
  try {
    const filePath = path.join(__dirname, '../../archive/dataset_combined.xlsx');
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    
    return data.map((row, index) => ({
      _id: `scholarship_${index}`,
      name: row['Name'] || 'Unknown Scholarship',
      amount: parseAmount(row['Income'] || '0'),
      description: `Scholarship for ${row['Education Qualification'] || 'students'}`,
      deadline: new Date('2025-12-31'), // Default deadline
      eligibility: `For ${row['Community'] || 'General'} category, ${row['Gender'] || 'All'} gender`,
      minGPA: parsePercentage(row['Annual-Percentage'] || '0'),
      category: mapCategory(row['Community'] || 'General'),
      applyUrl: '#',
      isActive: true,
      educationQualification: row['Education Qualification'] || 'Undergraduate',
      gender: row['Gender'] || 'All',
      community: row['Community'] || 'General',
      religion: row['Religion'] || 'All',
      income: row['Income'] || 'Not specified',
      exserviceMen: row['Exservice-men'] === 'Yes',
      disability: row['Disability'] === 'Yes',
      sports: row['Sports'] === 'Yes',
      annualPercentage: row['Annual-Percentage'] || 'Not specified',
    }));
  } catch (error) {
    console.error('Error loading scholarship data:', error);
    return [];
  }
};

const parseAmount = (incomeStr) => {
  if (!incomeStr || incomeStr === '--') return 50000;
  if (incomeStr.includes('1.5L')) return 150000;
  if (incomeStr.includes('3L')) return 300000;
  if (incomeStr.includes('5L')) return 500000;
  if (incomeStr.includes('8L')) return 800000;
  return 50000;
};

const parsePercentage = (percentageStr) => {
  if (!percentageStr || percentageStr === '--') return 0;
  const match = percentageStr.match(/(\d+)/);
  if (match) {
    const num = parseInt(match[1]);
    return num / 10; // Convert percentage to GPA-like scale
  }
  return 0;
};

const mapCategory = (community) => {
  const categoryMap = {
    'General': 'merit',
    'OBC': 'need',
    'SC': 'need',
    'ST': 'need',
    'EWS': 'need',
  };
  return categoryMap[community] || 'other';
};

// @desc  Get all scholarships (with optional GPA filter)
// @route GET /api/scholarships
// @access Private
const getScholarships = async (req, res, next) => {
  try {
    // Build filter based on query params
    const filter = {};
    if (req.query.minGPA) {
      filter.minGPA = { $gte: parseFloat(req.query.minGPA) };
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.education) {
      filter.educationQualification = { $regex: req.query.education, $options: 'i' };
    }
    if (req.query.community) {
      filter.community = req.query.community;
    }
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const scholarships = await Scholarship.find(filter).skip(skip).limit(limit);
    const total = await Scholarship.countDocuments(filter);
    res.json({
      success: true,
      page,
      limit,
      total,
      count: scholarships.length,
      scholarships,
    });
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
