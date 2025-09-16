import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  collegeName: { type: String, required: true },
  department: { type: String, required: true },
  graduationYear: { type: Number, required: true },
  degree: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  jobTitle: String,
  companyName: String,
  linkedinUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);