import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createJob, fetchJob, updateJob } from '../api/jobs.js';
import JobForm from '../components/JobForm.jsx';
import { getErrorMessage } from '../utils/formatters.js';

const JobFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEditing) return;

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
  }, [id, isEditing]);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    setError('');

    try {
      const data = isEditing ? await updateJob(id, payload) : await createJob(payload);
      navigate(`/jobs/${data.job._id}`);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6">
      <div>
        <Link to={isEditing ? `/jobs/${id}` : '/jobs'} className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-brand">
          <ArrowLeft size={17} aria-hidden="true" />
          Back
        </Link>
        <h1 className="text-3xl font-bold text-ink">{isEditing ? 'Edit application' : 'Add application'}</h1>
        <p className="mt-1 text-sm text-muted">Keep the details clear so every next step is easy to find.</p>
      </div>
      {error ? <p className="rounded-md bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p> : null}
      <section className="panel p-5 sm:p-6">
        {loading ? <p className="text-sm font-semibold text-muted">Loading application...</p> : <JobForm job={job} onSubmit={handleSubmit} submitting={submitting} />}
      </section>
    </div>
  );
};

export default JobFormPage;
