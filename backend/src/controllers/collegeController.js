const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

// @desc  Get all college data from CSV
// @route GET /api/colleges
// @access Private
const getColleges = async (req, res, next) => {
  try {
    const results = [];
    const csvPath = path.join(__dirname, '../../archive/College_data.csv');
    
    if (!fs.existsSync(csvPath)) {
      return res.status(404).json({ success: false, message: 'College data file not found' });
    }

    await new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (data) => {
          // Parse fee strings to numbers
          const parseFee = (feeStr) => {
            if (!feeStr || feeStr === '--') return null;
            return parseInt(feeStr.replace(/,/g, ''));
          };
          
          results.push({
            ...data,
            UG_fee: parseFee(data.UG_fee),
            PG_fee: parseFee(data.PG_fee),
            Rating: parseFloat(data.Rating),
            Academic: parseFloat(data.Academic),
            Accommodation: parseFloat(data.Accommodation),
            Faculty: parseFloat(data.Faculty),
            Infrastructure: parseFloat(data.Infrastructure),
            Placement: parseFloat(data.Placement),
            Social_Life: parseFloat(data.Social_Life)
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    // Apply filters if provided
    let filteredResults = results;
    
    if (req.query.state) {
      filteredResults = filteredResults.filter(college => 
        college.State.toLowerCase().includes(req.query.state.toLowerCase())
      );
    }
    
    if (req.query.stream) {
      filteredResults = filteredResults.filter(college => 
        college.Stream.toLowerCase().includes(req.query.stream.toLowerCase())
      );
    }
    
    if (req.query.minRating) {
      const minRating = parseFloat(req.query.minRating);
      filteredResults = filteredResults.filter(college => college.Rating >= minRating);
    }
    
    if (req.query.maxFee) {
      const maxFee = parseInt(req.query.maxFee);
      filteredResults = filteredResults.filter(college => 
        college.UG_fee && college.UG_fee <= maxFee
      );
    }

    // Search by college name
    if (req.query.search) {
      const searchTerm = req.query.search.toLowerCase();
      filteredResults = filteredResults.filter(college => 
        college.College_Name.toLowerCase().includes(searchTerm)
      );
    }

    res.json({ 
      success: true, 
      count: filteredResults.length, 
      colleges: filteredResults 
    });
  } catch (err) {
    next(err);
  }
};

// @desc  Get college analytics/stats
// @route GET /api/colleges/analytics
// @access Private
const getCollegeAnalytics = async (req, res, next) => {
  try {
    const results = [];
    const csvPath = path.join(__dirname, '../../archive/College_data.csv');
    
    if (!fs.existsSync(csvPath)) {
      return res.status(404).json({ success: false, message: 'College data file not found' });
    }

    await new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (data) => {
          const parseFee = (feeStr) => {
            if (!feeStr || feeStr === '--') return null;
            return parseInt(feeStr.replace(/,/g, ''));
          };
          
          results.push({
            ...data,
            UG_fee: parseFee(data.UG_fee),
            PG_fee: parseFee(data.PG_fee),
            Rating: parseFloat(data.Rating),
            Academic: parseFloat(data.Academic),
            Accommodation: parseFloat(data.Accommodation),
            Faculty: parseFloat(data.Faculty),
            Infrastructure: parseFloat(data.Infrastructure),
            Placement: parseFloat(data.Placement),
            Social_Life: parseFloat(data.Social_Life)
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    // Calculate analytics
    const stateDistribution = {};
    const streamDistribution = {};
    const ratingDistribution = { '8.0+': 0, '7.0-7.9': 0, '6.0-6.9': 0, 'below 6.0': 0 };
    const feeRanges = { 'Below 1L': 0, '1L-2L': 0, '2L-3L': 0, 'Above 3L': 0 };
    
    let totalRating = 0;
    let totalPlacement = 0;
    let totalAcademic = 0;
    
    results.forEach(college => {
      // State distribution
      stateDistribution[college.State] = (stateDistribution[college.State] || 0) + 1;
      
      // Stream distribution
      streamDistribution[college.Stream] = (streamDistribution[college.Stream] || 0) + 1;
      
      // Rating distribution
      if (college.Rating >= 8.0) ratingDistribution['8.0+']++;
      else if (college.Rating >= 7.0) ratingDistribution['7.0-7.9']++;
      else if (college.Rating >= 6.0) ratingDistribution['6.0-6.9']++;
      else ratingDistribution['below 6.0']++;
      
      // Fee distribution
      if (college.UG_fee < 100000) feeRanges['Below 1L']++;
      else if (college.UG_fee < 200000) feeRanges['1L-2L']++;
      else if (college.UG_fee < 300000) feeRanges['2L-3L']++;
      else feeRanges['Above 3L']++;
      
      // Averages
      totalRating += college.Rating;
      totalPlacement += college.Placement;
      totalAcademic += college.Academic;
    });

    const analytics = {
      totalColleges: results.length,
      averageRating: (totalRating / results.length).toFixed(2),
      averagePlacement: (totalPlacement / results.length).toFixed(2),
      averageAcademic: (totalAcademic / results.length).toFixed(2),
      stateDistribution,
      streamDistribution,
      ratingDistribution,
      feeRanges,
      topRatedColleges: results
        .sort((a, b) => b.Rating - a.Rating)
        .slice(0, 10)
        .map(c => ({ name: c.College_Name, rating: c.Rating, state: c.State })),
      bestPlacementColleges: results
        .sort((a, b) => b.Placement - a.Placement)
        .slice(0, 10)
        .map(c => ({ name: c.College_Name, placement: c.Placement, state: c.State }))
    };

    res.json({ success: true, analytics });
  } catch (err) {
    next(err);
  }
};

module.exports = { getColleges, getCollegeAnalytics };
