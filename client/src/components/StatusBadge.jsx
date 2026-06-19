import { statusStyles } from '../constants/jobs.js';

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-black ${
      statusStyles[status] || statusStyles.Wishlist
    }`}
  >
    {status}
  </span>
);

export default StatusBadge;
