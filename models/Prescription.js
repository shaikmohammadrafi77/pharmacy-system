const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  pharmacistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: { type: String },
  uploadDate: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);
