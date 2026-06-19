import api from './client.js';

export const fetchJobs = async (params = {}) => {
  const { data } = await api.get('/jobs', { params });
  return data;
};

export const fetchJob = async (id) => {
  const { data } = await api.get(`/jobs/${id}`);
  return data;
};

export const createJob = async (payload) => {
  const { data } = await api.post('/jobs', payload);
  return data;
};

export const updateJob = async (id, payload) => {
  const { data } = await api.patch(`/jobs/${id}`, payload);
  return data;
};

export const deleteJob = async (id) => {
  const { data } = await api.delete(`/jobs/${id}`);
  return data;
};

export const fetchStats = async () => {
  const { data } = await api.get('/jobs/stats');
  return data;
};
