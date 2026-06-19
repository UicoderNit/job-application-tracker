import Job, { JOB_STATUSES } from '../models/Job.js';
import asyncHandler from '../utils/asyncHandler.js';

const allowedFields = [
  'company',
  'position',
  'location',
  'jobType',
  'salaryRange',
  'status',
  'source',
  'applicationDate',
  'deadline',
  'notes',
  'contactName',
  'contactEmail',
  'jobUrl'
];

const pickJobFields = (body) =>
  allowedFields.reduce((payload, field) => {
    if (body[field] !== undefined) payload[field] = body[field];
    return payload;
  }, {});

const buildSort = (sort = 'newest') => {
  const sortMap = {
    newest: { applicationDate: -1, createdAt: -1 },
    oldest: { applicationDate: 1, createdAt: 1 },
    deadline: { deadline: 1, applicationDate: -1 },
    company: { company: 1 }
  };

  return sortMap[sort] || sortMap.newest;
};

export const getJobs = asyncHandler(async (req, res) => {
  const { search, status, jobType, location, sort } = req.query;
  const query = { user: req.user._id };

  if (search) {
    query.$or = [
      { company: { $regex: search, $options: 'i' } },
      { position: { $regex: search, $options: 'i' } }
    ];
  }

  if (status) query.status = status;
  if (jobType) query.jobType = jobType;
  if (location) query.location = { $regex: location, $options: 'i' };

  const jobs = await Job.find(query).sort(buildSort(sort));
  res.json({ jobs, count: jobs.length });
});

export const getJob = asyncHandler(async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id, user: req.user._id });

  if (!job) {
    res.status(404);
    throw new Error('Job application not found');
  }

  res.json({ job });
});

export const createJob = asyncHandler(async (req, res) => {
  const payload = pickJobFields(req.body);
  const job = await Job.create({ ...payload, user: req.user._id });
  res.status(201).json({ job });
});

export const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id, user: req.user._id });

  if (!job) {
    res.status(404);
    throw new Error('Job application not found');
  }

  Object.assign(job, pickJobFields(req.body));
  await job.save();

  res.json({ job });
});

export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.user._id });

  if (!job) {
    res.status(404);
    throw new Error('Job application not found');
  }

  res.json({ message: 'Job application deleted' });
});

export const getStats = asyncHandler(async (req, res) => {
  const [statusCounts, monthlyCounts, recentJobs, upcomingDeadlines, total] = await Promise.all([
    Job.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]),
    Job.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$applicationDate' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]),
    Job.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(5),
    Job.find({
      user: req.user._id,
      deadline: { $gte: new Date() },
      status: { $nin: ['Offer', 'Rejected'] }
    })
      .sort({ deadline: 1 })
      .limit(5),
    Job.countDocuments({ user: req.user._id })
  ]);

  const byStatus = JOB_STATUSES.map((status) => ({
    status,
    count: statusCounts.find((item) => item._id === status)?.count || 0
  }));

  res.json({
    total,
    byStatus,
    byMonth: monthlyCounts.map((item) => ({ month: item._id, count: item.count })),
    recentJobs,
    upcomingDeadlines
  });
});
