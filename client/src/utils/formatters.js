export const formatDate = (date) => {
  if (!date) return 'No date';
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(date));
};

export const toInputDate = (date) => {
  if (!date) return '';
  return new Date(date).toISOString().slice(0, 10);
};

export const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong';
