const path = require('path');
const XLSX = require('xlsx');
const Scholarship = require('../models/Scholarship');

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

const seedDatabase = async () => {
  try {
    const count = await Scholarship.countDocuments();
    if (count > 0) {
      console.log(`ℹ️ Scholarships collection already seeded. Count: ${count}`);
      return;
    }

    console.log('⏳ Seeding scholarships from Excel dataset. This might take a few seconds...');
    const filePath = path.join(__dirname, '../../archive/dataset_combined.xlsx');
    
    // Read only first sheet to conserve memory
    const workbook = XLSX.readFile(filePath, { sheets: [0], bookDeps: false, bookFiles: false });
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    
    // Free up workbook memory immediately
    delete workbook.Sheets[sheetName];
    
    console.log(`📊 Found ${data.length} rows in the Excel file. Parsing and seeding in batches...`);

    const batchSize = 10000;
    const now = new Date();
    
    for (let i = 0; i < data.length; i += batchSize) {
      const batchRaw = data.slice(i, i + batchSize);
      const scholarships = batchRaw.map((row) => ({
        name: row['Name'] || 'Unknown Scholarship',
        amount: parseAmount(row['Income'] || '0'),
        description: `Scholarship for ${row['Education Qualification'] || 'students'}`,
        deadline: new Date('2025-12-31'),
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
        createdAt: now,
        updatedAt: now,
      }));

      // Use raw collection insertMany to bypass Mongoose heavy document instantiation
      await Scholarship.collection.insertMany(scholarships);
      console.log(`💾 Seeded batch ${Math.floor(i / batchSize) + 1} (${i + scholarships.length}/${data.length})`);
    }

    console.log('✅ Scholarships database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};

module.exports = seedDatabase;
