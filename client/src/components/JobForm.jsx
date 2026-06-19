import { useState } from 'react';
import { JOB_STATUSES, JOB_TYPES } from '../constants/jobs.js';
import { toInputDate } from '../utils/formatters.js';
import FormField from './FormField.jsx';

const initialState = {
  company: '',
  position: '',
  location: '',
  jobType: 'Full-time',
  salaryRange: '',
  status: 'Wishlist',
  source: '',
  applicationDate: toInputDate(new Date()),
  deadline: '',
  notes: '',
  contactName: '',
  contactEmail: '',
  jobUrl: ''
};

const JobForm = ({ job, onSubmit, submitting }) => {
  const [form, setForm] = useState(() => ({
    ...initialState,
    ...job,
    applicationDate: toInputDate(job?.applicationDate || initialState.applicationDate),
    deadline: toInputDate(job?.deadline)
  }));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      deadline: form.deadline || null
    });
  };

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          id="company"
          name="company"
          label="Company"
          value={form.company}
          onChange={handleChange}
          required
        />
        <FormField
          id="position"
          name="position"
          label="Position"
          value={form.position}
          onChange={handleChange}
          required
        />
        <FormField
          id="location"
          name="location"
          label="Location"
          value={form.location}
          onChange={handleChange}
        />
        <FormField id="jobType" label="Job type">
          <select id="jobType" name="jobType" className="input" value={form.jobType} onChange={handleChange}>
            {JOB_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </FormField>
        <FormField
          id="salaryRange"
          name="salaryRange"
          label="Salary range"
          value={form.salaryRange}
          onChange={handleChange}
          placeholder="$80k - $100k"
        />
        <FormField id="status" label="Status">
          <select id="status" name="status" className="input" value={form.status} onChange={handleChange}>
            {JOB_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </FormField>
        <FormField
          id="source"
          name="source"
          label="Source"
          value={form.source}
          onChange={handleChange}
          placeholder="LinkedIn, referral, careers page"
        />
        <FormField
          id="applicationDate"
          name="applicationDate"
          label="Application date"
          type="date"
          value={form.applicationDate}
          onChange={handleChange}
        />
        <FormField
          id="deadline"
          name="deadline"
          label="Deadline"
          type="date"
          value={form.deadline}
          onChange={handleChange}
        />
        <FormField
          id="jobUrl"
          name="jobUrl"
          label="Job URL"
          type="url"
          value={form.jobUrl}
          onChange={handleChange}
          placeholder="https://"
        />
        <FormField
          id="contactName"
          name="contactName"
          label="Contact name"
          value={form.contactName}
          onChange={handleChange}
        />
        <FormField
          id="contactEmail"
          name="contactEmail"
          label="Contact email"
          type="email"
          value={form.contactEmail}
          onChange={handleChange}
        />
      </div>
      <FormField id="notes" label="Notes">
        <textarea
          id="notes"
          name="notes"
          className="input min-h-32"
          value={form.notes}
          onChange={handleChange}
          placeholder="Interview notes, next steps, resume angle..."
        />
      </FormField>
      <div className="flex justify-end">
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save application'}
        </button>
      </div>
    </form>
  );
};

export default JobForm;
