import { AlertCircle, CalendarDays, CheckCircle2, ClipboardList, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { fetchStats } from '../api/jobs.js';
import EmptyState from '../components/EmptyState.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { formatDate, getErrorMessage } from '../utils/formatters.js';

const colors = ['#64748b', '#0284c7', '#d97706', '#059669', '#e11d48'];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStats();
        setStats(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) return <p className="text-sm font-semibold text-muted">Loading dashboard...</p>;

  if (error) {
    return <p className="rounded-md bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>;
  }

  if (!stats?.total) {
    return (
      <EmptyState
        title="No applications yet"
        message="Add your first opportunity to unlock dashboard stats, charts, deadlines, and recent activity."
        action={
          <Link to="/jobs/new" className="btn-primary">
            <Plus size={17} aria-hidden="true" />
            Add application
          </Link>
        }
      />
    );
  }

  const activeCount = stats.byStatus
    .filter((item) => !['Offer', 'Rejected'].includes(item.status))
    .reduce((sum, item) => sum + item.count, 0);
  const offerCount = stats.byStatus.find((item) => item.status === 'Offer')?.count || 0;

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">Your job search at a glance.</p>
        </div>
        <Link to="/jobs/new" className="btn-primary">
          <Plus size={17} aria-hidden="true" />
          Add application
        </Link>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard icon={ClipboardList} label="Total applications" value={stats.total} />
        <MetricCard icon={AlertCircle} label="Active pipeline" value={activeCount} />
        <MetricCard icon={CheckCircle2} label="Offers" value={offerCount} />
        <MetricCard icon={CalendarDays} label="Upcoming deadlines" value={stats.upcomingDeadlines.length} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="panel p-5">
          <h2 className="text-lg font-bold text-ink">Applications over time</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.byMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis allowDecimals={false} stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="count" fill="#0f766e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel p-5">
          <h2 className="text-lg font-bold text-ink">Status distribution</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stats.byStatus} dataKey="count" nameKey="status" innerRadius={58} outerRadius={90} paddingAngle={3}>
                  {stats.byStatus.map((entry, index) => (
                    <Cell key={entry.status} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {stats.byStatus.map((item) => (
              <div key={item.status} className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2 text-sm">
                <span>{item.status}</span>
                <span className="font-bold">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <ListPanel title="Recent applications" jobs={stats.recentJobs} />
        <ListPanel title="Upcoming deadlines" jobs={stats.upcomingDeadlines} showDeadline />
      </section>
    </div>
  );
};

const MetricCard = ({ icon: Icon, label, value }) => (
  <div className="panel p-5">
    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-teal-50 text-brand">
      <Icon size={22} aria-hidden="true" />
    </div>
    <p className="text-3xl font-bold text-ink">{value}</p>
    <p className="mt-1 text-sm font-semibold text-muted">{label}</p>
  </div>
);

const ListPanel = ({ title, jobs, showDeadline = false }) => (
  <div className="panel p-5">
    <h2 className="text-lg font-bold text-ink">{title}</h2>
    <div className="mt-4 grid gap-3">
      {jobs.length ? (
        jobs.map((job) => (
          <Link
            key={job._id}
            to={`/jobs/${job._id}`}
            className="rounded-md border border-slate-100 bg-slate-50 px-4 py-3 transition hover:border-slate-200 hover:bg-white"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-ink">{job.position}</p>
                <p className="mt-1 text-sm text-muted">{job.company}</p>
              </div>
              <StatusBadge status={job.status} />
            </div>
            <p className="mt-3 text-xs font-semibold text-slate-500">
              {showDeadline ? `Deadline ${formatDate(job.deadline)}` : `Applied ${formatDate(job.applicationDate)}`}
            </p>
          </Link>
        ))
      ) : (
        <p className="rounded-md bg-slate-50 px-4 py-6 text-sm text-muted">Nothing to show yet.</p>
      )}
    </div>
  </div>
);

export default Dashboard;
