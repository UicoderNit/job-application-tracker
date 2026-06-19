import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Job from './models/Job.js';
import User from './models/User.js';

dotenv.config();

const jobs = [
  {
    company: 'Nova Labs',
    position: 'Frontend Developer',
    location: 'Remote',
    jobType: 'Full-time',
    salaryRange: '$85k - $105k',
    status: 'Interview',
    source: 'LinkedIn',
    applicationDate: new Date('2026-06-03'),
    deadline: new Date('2026-06-28'),
    notes: 'Completed recruiter screen. Technical round next week.',
    contactName: 'Priya Shah',
    contactEmail: 'priya@novalabs.example',
    jobUrl: 'https://example.com/jobs/frontend'
  },
  {
    company: 'BrightWorks',
    position: 'MERN Stack Developer',
    location: 'Bengaluru',
    jobType: 'Full-time',
    salaryRange: '$90k - $120k',
    status: 'Applied',
    source: 'Company careers',
    applicationDate: new Date('2026-06-10'),
    deadline: new Date('2026-07-01'),
    notes: 'Tailored resume around Node and React projects.',
    contactName: '',
    contactEmail: '',
    jobUrl: 'https://example.com/jobs/mern'
  },
  {
    company: 'Orbitly',
    position: 'Software Engineer Intern',
    location: 'Hyderabad',
    jobType: 'Internship',
    salaryRange: '',
    status: 'Wishlist',
    source: 'Referral',
    applicationDate: new Date('2026-06-17'),
    deadline: new Date('2026-07-08'),
    notes: 'Ask alumni contact for referral before applying.',
    contactName: 'Arjun Rao',
    contactEmail: 'arjun@orbitly.example',
    jobUrl: 'https://example.com/jobs/intern'
  },
  {
    company: 'CloudKite',
    position: 'React Developer',
    location: 'Pune',
    jobType: 'Contract',
    salaryRange: '$45/hr',
    status: 'Offer',
    source: 'AngelList',
    applicationDate: new Date('2026-05-22'),
    deadline: null,
    notes: 'Offer received. Compare with full-time roles.',
    contactName: 'Maya Iyer',
    contactEmail: 'maya@cloudkite.example',
    jobUrl: 'https://example.com/jobs/react'
  },
  {
    company: 'DataNest',
    position: 'Junior Full Stack Engineer',
    location: 'Remote',
    jobType: 'Remote',
    salaryRange: '$70k - $88k',
    status: 'Rejected',
    source: 'Indeed',
    applicationDate: new Date('2026-05-15'),
    deadline: null,
    notes: 'Rejected after coding screen. Review array/string questions.',
    contactName: '',
    contactEmail: '',
    jobUrl: 'https://example.com/jobs/fullstack'
  }
];

const seed = async () => {
  await connectDB();
  await User.deleteOne({ email: 'demo@example.com' });

  const user = await User.create({
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'Password123!'
  });

  await Job.deleteMany({ user: user._id });
  await Job.insertMany(jobs.map((job) => ({ ...job, user: user._id })));

  console.log('Demo data seeded');
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
