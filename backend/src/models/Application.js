const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    universityName: { type: String, required: true },
    program: { type: String, required: true },
    deadline: { type: Date },
    status: {
      type: String,
      enum: ['draft', 'in_progress', 'submitted', 'accepted', 'rejected', 'waitlisted'],
      default: 'draft',
    },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    notes: { type: String, default: '' },
    type: {
      type: String,
      enum: ['early_decision', 'early_action', 'regular_decision', 'rolling'],
      default: 'regular_decision',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
