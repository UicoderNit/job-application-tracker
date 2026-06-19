import { ClipboardList } from 'lucide-react';

const EmptyState = ({ title, message, action }) => (
  <div className="panel flex flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg border border-teal-100 bg-teal-50 text-brand shadow-sm">
      <ClipboardList size={26} aria-hidden="true" />
    </div>
    <h2 className="text-xl font-black text-ink">{title}</h2>
    <p className="mt-2 max-w-md text-sm leading-6 text-muted">{message}</p>
    {action ? <div className="mt-5">{action}</div> : null}
  </div>
);

export default EmptyState;
