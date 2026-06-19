import { ClipboardList } from 'lucide-react';

const EmptyState = ({ title, message, action }) => (
  <div className="panel flex flex-col items-center justify-center px-6 py-14 text-center">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-teal-50 text-brand">
      <ClipboardList size={26} aria-hidden="true" />
    </div>
    <h2 className="text-lg font-bold text-ink">{title}</h2>
    <p className="mt-2 max-w-md text-sm leading-6 text-muted">{message}</p>
    {action ? <div className="mt-5">{action}</div> : null}
  </div>
);

export default EmptyState;
