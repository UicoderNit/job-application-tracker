import { Building2, CalendarClock, MapPin, Plus, Search, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchJobs } from '../api/jobs.js';
import EmptyState from '../components/EmptyState.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { JOB_STATUSES, JOB_TYPES } from '../constants/jobs.js';
import { formatDate, getErrorMessage } from '../utils/formatters.js';

const defaultFilters = {
  search: '',
  status: '',
  jobType: '',
  location: '',
  sort: 'newest'
};

const Jobs = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const timeout = setTimeout(async () => {
      setLoading(true);
      setError('');
      try {
        const params = Object.fromEntries(Object.entries(filters).filter(([, value]) => value));
        const data = await fetchJobs(params);
        setJobs(data.jobs);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [filters]);

  const handleChange = (event) => {
    setFilters((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const hasFilters = Object.entries(filters).some(([key, value]) => key !== 'sort' && value);

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker mb-2">Application pipeline</p>
          <h1 className="page-title">Applications</h1>
          <p className="mt-2 text-sm text-muted">Search, filter, and manage every role in your pipeline.</p>
        </div>
        <Link to="/jobs/new" className="btn-primary">
          <Plus size={17} aria-hidden="true" />
          Add application
        </Link>
      </div>

      <section className="panel p-5">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm font-black text-ink">
            <SlidersHorizontal size={18} aria-hidden="true" />
            Filters
          </div>
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
            {jobs.length} result{jobs.length === 1 ? '' : 's'}
          </span>
        </div>
        <div className="grid gap-3 md:grid-cols-5">
          <label className="relative md:col-span-2">
            <span className="sr-only">Search</span>
            <Search className="pointer-events-none absolute left-3 top-2.5 text-slate-400" size={18} aria-hidden="true" />
            <input
              name="search"
              className="input pl-10"
              value={filters.search}
              onChange={handleChange}
              placeholder="Company or position"
            />
          </label>
          <select name="status" className="input" value={filters.status} onChange={handleChange}>
            <option value="">All statuses</option>
            {JOB_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select name="jobType" className="input" value={filters.jobType} onChange={handleChange}>
            <option value="">All job types</option>
            {JOB_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select name="sort" className="input" value={filters.sort} onChange={handleChange}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="deadline">Deadline</option>
            <option value="company">Company</option>
          </select>
        </div>
        <div className="mt-3">
          <input
            name="location"
            className="input max-w-md"
            value={filters.location}
            onChange={handleChange}
            placeholder="Filter by location"
          />
        </div>
      </section>

      {error ? <p className="rounded-md bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p> : null}
      {loading ? <p className="text-sm font-semibold text-muted">Loading applications...</p> : null}

      {!loading && jobs.length === 0 ? (
        <EmptyState
          title={hasFilters ? 'No matching applications' : 'No applications yet'}
          message={
            hasFilters
              ? 'Adjust the filters to widen the search.'
              : 'Add your first application and start building a clear pipeline.'
          }
          action={
            !hasFilters ? (
              <Link to="/jobs/new" className="btn-primary">
                <Plus size={17} aria-hidden="true" />
                Add application
              </Link>
            ) : null
          }
        />
      ) : null}

      {!loading && jobs.length ? (
        <div className="grid gap-3">
          {jobs.map((job) => (
            <Link
              key={job._id}
              to={`/jobs/${job._id}`}
              className="panel grid gap-4 p-5 transition hover:-translate-y-1 hover:border-teal-100 hover:shadow-glow sm:grid-cols-[1.5fr_1fr_auto]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-black text-ink">{job.position}</h2>
                  <StatusBadge status={job.status} />
                </div>
                <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-muted">
                  <Building2 size={16} aria-hidden="true" />
                  {job.company}
                </p>
              </div>
              <div className="text-sm font-semibold text-muted">
                <p className="inline-flex items-center gap-2">
                  <MapPin size={16} aria-hidden="true" />
                  {job.location || 'No location'}
                </p>
                <p className="mt-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600 sm:inline-flex">
                  {job.jobType}
                </p>
              </div>
              <div className="text-sm font-bold text-slate-600 sm:text-right">
                <p className="inline-flex items-center gap-2 sm:justify-end">
                  <CalendarClock size={16} aria-hidden="true" />
                  Applied {formatDate(job.applicationDate)}
                </p>
                <p className="mt-1">Deadline {formatDate(job.deadline)}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Jobs;
