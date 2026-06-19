import express from 'express';
import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  getStats,
  updateJob
} from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.route('/').get(getJobs).post(createJob);
router.get('/stats', getStats);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

export default router;
