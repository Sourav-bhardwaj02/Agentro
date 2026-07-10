const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    eligibility: { type: String, required: true },
    minGPA: { type: Number, default: 0 },
    category: {
      type: String,
      enum: ['merit', 'need', 'stem', 'arts', 'community', 'other'],
      default: 'other',
    },
    applyUrl: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    educationQualification: { type: String, default: '' },
    gender: { type: String, default: 'All' },
    community: { type: String, default: 'General' },
    religion: { type: String, default: 'All' },
    income: { type: String, default: 'Not specified' },
    exserviceMen: { type: Boolean, default: false },
    disability: { type: Boolean, default: false },
    sports: { type: Boolean, default: false },
    annualPercentage: { type: String, default: 'Not specified' },
  },
  { timestamps: true }
);

// Indexes for fast queries and searches
scholarshipSchema.index({ category: 1 });
scholarshipSchema.index({ minGPA: 1 });
scholarshipSchema.index({ community: 1 });
scholarshipSchema.index({ educationQualification: 'text', name: 'text', description: 'text' });

module.exports = mongoose.model('Scholarship', scholarshipSchema);

