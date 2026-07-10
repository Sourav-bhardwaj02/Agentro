const mongoose = require('mongoose');
const seedDatabase = require('./seed');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'college_admission',
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Run DB Seeding in the background
    seedDatabase();
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

