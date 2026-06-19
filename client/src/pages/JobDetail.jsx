import { ArrowLeft, BriefcaseBusiness, Edit, ExternalLink, Mail, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteJob, fetchJob } from '../api/jobs.js';
import StatusBadge from '../components/StatusBadge.jsx';
import { formatDate, getErrorMessage } from '../utils/formatters.js';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      try {
        const data = await fetchJob(id);
        setJob(data.job);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm('Delete this application?');
    if (!confirmed) return;

    setDeleting(true);
    try {
      await deleteJob(id);
      navigate('/jobs');
    } catch (err) {
      setError(getErrorMessage(err));
      setDeleting(false);
    }
  };

  if (loading) return <p className="text-sm font-semibold text-muted">Loading application...</p>;

  if (error) {
    return <p className="rounded-md bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>;
  }

  return (
    <div className="grid gap-6">
      <div className="panel overflow-hidden bg-ink p-6 text-white sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link to="/jobs" className="mb-5 inline-flex items-center gap-2 text-sm font-black text-teal-200 hover:text-white">
            <ArrowLeft size={17} aria-hidden="true" />
            Applications
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-teal-200">
              <BriefcaseBusiness size={24} aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{job.position}</h1>
            <StatusBadge status={job.status} />
          </div>
          <p className="mt-3 text-lg font-bold text-slate-300">{job.company}</p>
        </div>
        <div className="flex gap-2">
          <Link to={`/jobs/${job._id}/edit`} className="btn-secondary">
            <Edit size={17} aria-hidden="true" />
            Edit
          </Link>
          <button type="button" className="btn-secondary text-rose-700" onClick={handleDelete} disabled={deleting}>
            <Trash2 size={17} aria-hidden="true" />
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        <DetailTile label="Location" value={job.location || 'Not specified'} />
        <DetailTile label="Job type" value={job.jobType} />
        <DetailTile label="Applied" value={formatDate(job.applicationDate)} />
        <DetailTile label="Deadline" value={formatDate(job.deadline)} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="panel p-5">
          <p className="section-kicker">Notes</p>
          <h2 className="mt-1 text-xl font-black text-ink">Interview context</h2>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">
            {job.notes || 'No notes added yet.'}
          </p>
        </div>
        <div className="panel p-5">
          <p className="section-kicker">Details</p>
          <h2 className="mt-1 text-xl font-black text-ink">Application details</h2>
          <dl className="mt-4 grid gap-4 text-sm">
            <DetailRow label="Salary" value={job.salaryRange || 'Not specified'} />
            <DetailRow label="Source" value={job.source || 'Not specified'} />
            <DetailRow label="Contact" value={job.contactName || 'Not specified'} />
            <DetailRow
              label="Email"
              value={
                job.contactEmail ? (
                  <a className="inline-flex items-center gap-2 font-bold text-brand" href={`mailto:${job.contactEmail}`}>
                    <Mail size={15} aria-hidden="true" />
                    {job.contactEmail}
                  </a>
                ) : (
                  'Not specified'
                )
              }
            />
            <DetailRow
              label="Job URL"
              value={
                job.jobUrl ? (
                  <a className="inline-flex items-center gap-2 font-bold text-brand" href={job.jobUrl} target="_blank" rel="noreferrer">
                    <ExternalLink size={15} aria-hidden="true" />
                    Open posting
                  </a>
                ) : (
                  'Not specified'
                )
              }
            />
          </dl>
        </div>
      </section>
    </div>
  );
};

const DetailTile = ({ label, value }) => (
  <div className="panel p-4 transition hover:-translate-y-0.5 hover:shadow-glow">
    <p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-2 text-sm font-black text-ink">{value}</p>
  </div>
);

const DetailRow = ({ label, value }) => (
  <div className="rounded-md border border-slate-100 bg-slate-50/80 p-3">
    <dt className="font-black text-slate-500">{label}</dt>
    <dd className="mt-1 text-slate-800">{value}</dd>
  </div>
);

export default JobDetail;
