import { statusStyles } from '../constants/jobs.js';

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
      statusStyles[status] || statusStyles.Wishlist
    }`}
  >
    {status}
  </span>
);

export default StatusBadge;
