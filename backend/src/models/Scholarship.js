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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Scholarship', scholarshipSchema);
