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
  const interviewCount = stats.byStatus.find((item) => item.status === 'Interview')?.count || 0;

  return (
    <div className="grid gap-7">
      <div className="panel overflow-hidden bg-ink p-6 text-white sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-teal-200">
              Pipeline command center
            </p>
            <h1 className="text-4xl font-black tracking-tight">Dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Watch your active search, interview momentum, deadlines, and outcomes in one focused workspace.
            </p>
          </div>
          <Link
            to="/jobs/new"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-black text-ink shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-50"
          >
            <Plus size={17} aria-hidden="true" />
            Add application
          </Link>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard icon={ClipboardList} label="Total applications" value={stats.total} tone="teal" />
        <MetricCard icon={AlertCircle} label="Active pipeline" value={activeCount} tone="sky" />
        <MetricCard icon={CheckCircle2} label="Interviews" value={interviewCount} tone="amber" />
        <MetricCard icon={CalendarDays} label="Upcoming deadlines" value={stats.upcomingDeadlines.length} tone="rose" />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="panel p-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">Trend</p>
              <h2 className="mt-1 text-xl font-black text-ink">Applications over time</h2>
            </div>
            <p className="text-sm font-semibold text-muted">{stats.byMonth.length} tracked month(s)</p>
          </div>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.byMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} />
                <YAxis allowDecimals={false} stroke="#64748b" tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'rgba(15,118,110,0.08)' }} />
                <Bar dataKey="count" fill="#0f766e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel p-5">
          <p className="section-kicker">Breakdown</p>
          <h2 className="mt-1 text-xl font-black text-ink">Status distribution</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stats.byStatus} dataKey="count" nameKey="status" innerRadius={62} outerRadius={92} paddingAngle={3}>
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
              <div
                key={item.status}
                className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50/80 px-3 py-2 text-sm"
              >
                <span className="font-semibold text-slate-600">{item.status}</span>
                <span className="font-black text-ink">{item.count}</span>
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

const tones = {
  teal: 'bg-teal-50 text-brand',
  sky: 'bg-sky-50 text-sky-700',
  amber: 'bg-amber-50 text-amber-700',
  rose: 'bg-rose-50 text-rose-700'
};

const MetricCard = ({ icon: Icon, label, value, tone = 'teal' }) => (
  <div className="panel p-5 transition hover:-translate-y-1 hover:shadow-glow">
    <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-lg ${tones[tone]}`}>
      <Icon size={22} aria-hidden="true" />
    </div>
    <p className="text-4xl font-black tracking-tight text-ink">{value}</p>
    <p className="mt-1 text-sm font-bold text-muted">{label}</p>
  </div>
);

const ListPanel = ({ title, jobs, showDeadline = false }) => (
  <div className="panel p-5">
    <div className="flex items-center justify-between">
      <div>
        <p className="section-kicker">{showDeadline ? 'Next steps' : 'Activity'}</p>
        <h2 className="mt-1 text-xl font-black text-ink">{title}</h2>
      </div>
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">{jobs.length}</span>
    </div>
    <div className="mt-4 grid gap-3">
      {jobs.length ? (
        jobs.map((job) => (
          <Link
            key={job._id}
            to={`/jobs/${job._id}`}
            className="rounded-lg border border-slate-100 bg-slate-50/80 px-4 py-3 transition hover:-translate-y-0.5 hover:border-teal-100 hover:bg-white hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-black text-ink">{job.position}</p>
                <p className="mt-1 text-sm font-semibold text-muted">{job.company}</p>
              </div>
              <StatusBadge status={job.status} />
            </div>
            <p className="mt-3 text-xs font-black uppercase tracking-wide text-slate-500">
              {showDeadline ? `Deadline ${formatDate(job.deadline)}` : `Applied ${formatDate(job.applicationDate)}`}
            </p>
          </Link>
        ))
      ) : (
        <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50/80 px-4 py-6 text-sm text-muted">
          Nothing to show yet.
        </p>
      )}
    </div>
  </div>
);

export default Dashboard;
