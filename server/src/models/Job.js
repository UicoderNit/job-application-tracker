import mongoose from 'mongoose';

export const JOB_STATUSES = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected'];
export const JOB_TYPES = ['Full-time', 'Part-time', 'Internship', 'Contract', 'Remote'];

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    company: {
      type: String,
      required: [true, 'Company is required'],
      trim: true,
      maxlength: 100
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
      maxlength: 120
    },
    location: {
      type: String,
      trim: true,
      maxlength: 120,
      default: ''
    },
    jobType: {
      type: String,
      enum: JOB_TYPES,
      default: 'Full-time'
    },
    salaryRange: {
      type: String,
      trim: true,
      maxlength: 80,
      default: ''
    },
    status: {
      type: String,
      enum: JOB_STATUSES,
      default: 'Wishlist',
      index: true
    },
    source: {
      type: String,
      trim: true,
      maxlength: 100,
      default: ''
    },
    applicationDate: {
      type: Date,
      default: Date.now
    },
    deadline: {
      type: Date,
      default: null
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: ''
    },
    contactName: {
      type: String,
      trim: true,
      maxlength: 100,
      default: ''
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^$|^\S+@\S+\.\S+$/, 'Please provide a valid contact email'],
      default: ''
    },
    jobUrl: {
      type: String,
      trim: true,
      default: ''
    }
  },
  { timestamps: true }
);

jobSchema.index({ company: 'text', position: 'text', location: 'text' });

const Job = mongoose.model('Job', jobSchema);

export default Job;
