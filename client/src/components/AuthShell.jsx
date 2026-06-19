import { BriefcaseBusiness } from 'lucide-react';

const AuthShell = ({ title, subtitle, children }) => (
  <div className="grid min-h-screen bg-paper lg:grid-cols-[1fr_520px]">
    <section className="hidden bg-ink px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand">
          <BriefcaseBusiness size={24} aria-hidden="true" />
        </div>
        <span className="text-xl font-bold">JobFlow</span>
      </div>
      <div className="max-w-xl">
        <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-teal-200">
          MERN portfolio project
        </p>
        <h1 className="text-5xl font-bold leading-tight">
          Track every opportunity from first lead to final decision.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          A practical job-search workspace with protected data, analytics, filters, and a clean
          recruiter-friendly product surface.
        </p>
      </div>
      <p className="text-sm text-slate-400">React + Express + MongoDB + JWT</p>
    </section>
    <section className="flex items-center justify-center px-4 py-10 sm:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 lg:hidden">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-md bg-brand text-white">
            <BriefcaseBusiness size={24} aria-hidden="true" />
          </div>
          <p className="text-xl font-bold text-ink">JobFlow</p>
        </div>
        <div className="panel p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-ink">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-muted">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </section>
  </div>
);

export default AuthShell;
