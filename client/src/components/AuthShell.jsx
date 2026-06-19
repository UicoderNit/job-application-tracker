import { BarChart3, BriefcaseBusiness, ShieldCheck, Sparkles } from 'lucide-react';

const AuthShell = ({ title, subtitle, children }) => (
  <div className="grid min-h-screen lg:grid-cols-[1fr_520px]">
    <section className="relative hidden overflow-hidden bg-ink px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand via-accent to-coral" />
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand shadow-glow">
          <BriefcaseBusiness size={24} aria-hidden="true" />
        </div>
        <span className="text-xl font-bold">JobFlow</span>
      </div>
      <div className="max-w-xl">
        <p className="mb-5 text-sm font-black uppercase tracking-wider text-teal-200">
          MERN portfolio project
        </p>
        <h1 className="text-5xl font-black leading-tight tracking-tight">
          Track every opportunity from first lead to final decision.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          A practical job-search workspace with protected data, analytics, filters, and a clean
          recruiter-friendly product surface.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-3">
          <FeaturePill icon={ShieldCheck} label="JWT auth" />
          <FeaturePill icon={BarChart3} label="Analytics" />
          <FeaturePill icon={Sparkles} label="Polished UI" />
        </div>
      </div>
      <p className="text-sm text-slate-400">React + Express + MongoDB + JWT</p>
    </section>
    <section className="flex items-center justify-center px-4 py-10 sm:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 lg:hidden">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-brand text-white shadow-glow">
            <BriefcaseBusiness size={24} aria-hidden="true" />
          </div>
          <p className="text-xl font-black text-ink">JobFlow</p>
        </div>
        <div className="panel p-6 sm:p-8">
          <p className="section-kicker mb-3">Secure workspace</p>
          <h1 className="text-3xl font-black tracking-tight text-ink">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-muted">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </section>
  </div>
);

const FeaturePill = ({ icon: Icon, label }) => (
  <div className="rounded-lg border border-white/10 bg-white/10 p-3 text-sm font-bold text-slate-100 backdrop-blur">
    <Icon className="mb-2 text-teal-200" size={18} aria-hidden="true" />
    {label}
  </div>
);

export default AuthShell;
