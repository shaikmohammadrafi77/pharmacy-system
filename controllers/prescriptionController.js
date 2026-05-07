const Prescription = require('../models/Prescription');

exports.uploadPrescription = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const prescription = await Prescription.create({
      customerId: req.user._id,
      image: req.file.filename,
    });
    res.status(201).json(prescription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find().populate('customerId', 'name email').populate('pharmacistId', 'name');
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ customerId: req.user._id });
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifyPrescription = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      { status, pharmacistId: req.user._id, notes },
      { new: true }
    );
    if (!prescription) return res.status(404).json({ message: 'Prescription not found' });
    res.json(prescription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
