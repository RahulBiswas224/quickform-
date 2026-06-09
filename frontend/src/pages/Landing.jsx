import { useState } from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    title: 'Drag & Drop Builder',
    desc: 'Build forms visually by dragging and dropping fields. No coding required.',
    className: 'md:col-span-2'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5l1.414-1.414M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5l-1.414 1.414" />
      </svg>
    ),
    title: 'Shareable Public Link',
    desc: 'Unique public URLs. Share with anyone — no login required to fill.',
    className: 'md:col-span-1'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Response Dashboard',
    desc: 'View comprehensive metrics, manage submissions, and export seamlessly to CSV instantly.',
    className: 'md:col-span-1'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Email Notifications',
    desc: 'Stay dynamic. Get beautifully styled, real-time emails every time a form submission occurs.',
    className: 'md:col-span-2'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Secure & Private',
    desc: 'Your data safety is paramount. All information is guarded securely by rigorous JWT authentication layers.',
    className: 'md:col-span-1'
  },
  {
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Publish Anytime',
    desc: 'Total control over your link accessibility. Turn submissions on or off smoothly with a simple click toggle.',
    className: 'md:col-span-2'
  }
];

const steps = [
  { step: '01', title: 'Create an account', desc: 'Sign up completely free in less than ten seconds.' },
  { step: '02', title: 'Build your form', desc: 'Drag and drop functional input blocks tailored to your exact scope.' },
  { step: '03', title: 'Share the link', desc: 'Deploy your form with a highly optimized, distinct web URL.' },
  { step: '04', title: 'Collect responses', desc: 'Watch responses arrive in real-time and filter datasets seamlessly.' },
];

export default function Landing() {
  // State switcher to let visitors interactively explore your 3 app screenshots
  const [activeTab, setActiveTab] = useState('builder');

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-blue-500 selection:text-white font-sans antialiased">
      
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/75 border-b border-slate-200/80 transition-all">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-200">
              <span className="text-white font-black text-lg select-none">Q</span>
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              QuickForms
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-sm active:scale-[0.98]"
            >
              Get Started Free
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-20 md:pb-28 max-w-7xl mx-auto px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-blue-100/40 to-transparent rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto text-center">
          {/* Main Web Symbol Logo Asset */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-500 flex items-center justify-center shadow-xl shadow-blue-500/20 ring-4 ring-white relative group">
              <span className="text-white font-black text-4xl select-none tracking-tighter transform group-hover:scale-105 transition-transform duration-300">Q</span>
              <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center shadow border-2 border-white text-[10px]">⚡</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm select-none">
              Free Forever Platform
            </span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm select-none">
              Private Submission Platform
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
            Build beautiful forms <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              in fraction of minutes
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            QuickForms empowers you to assemble, customize, and orchestrate secure online forms with an intuitive visual canvas. Connect with your audience smoothly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/register"
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-0.5 transition-all active:translate-y-0"
            >
              Start Building Free
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto text-slate-700 bg-white px-8 py-4 rounded-xl font-semibold border border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-all"
            >
              Live Demo
            </Link>
          </div>
        </div>

        {/* Interactive App Screen Showroom */}
        <div className="max-w-5xl mx-auto">
          {/* Tab Controls to switch layouts */}
          <div className="flex justify-center gap-2 mb-4 max-w-md mx-auto p-1 bg-slate-200/60 rounded-xl backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('builder')}
              className={`flex-1 text-xs font-bold py-2 px-3 rounded-lg transition-all ${activeTab === 'builder' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              🛠️ Form Builder
            </button>
            <button
              onClick={() => setActiveTab('public')}
              className={`flex-1 text-xs font-bold py-2 px-3 rounded-lg transition-all ${activeTab === 'public' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              🔗 Share Link
            </button>
            <button
              onClick={() => setActiveTab('responses')}
              className={`flex-1 text-xs font-bold py-2 px-3 rounded-lg transition-all ${activeTab === 'responses' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              📊 Dashboard
            </button>
          </div>

          {/* Browser Container Frame */}
          <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xl shadow-slate-200/80">
            <div className="rounded-xl border border-slate-100 bg-slate-50 min-h-[480px] text-slate-800 overflow-hidden relative flex flex-col">
              
              {/* Browser Window Control Bar */}
              <div className="h-11 border-b border-slate-200/60 bg-white flex items-center justify-between px-4">
                <div className="flex items-center gap-1.5 w-1/4">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="h-6 bg-slate-100 rounded-md text-[11px] text-slate-400 flex items-center justify-center px-8 w-2/4 border border-slate-200/40 font-mono truncate select-none">
                  {activeTab === 'builder' && 'quickform.vercel.app/builder/1'}
                  {activeTab === 'public' && 'quickform.vercel.app/f/DKlFu42YnJ'}
                  {activeTab === 'responses' && 'quickform.vercel.app/responses/1'}
                </div>
                <div className="w-1/4 flex justify-end">
                  <div className="w-4 h-4 rounded bg-slate-100" />
                </div>
              </div>

              {/* Dynamic Viewport Canvas content Injection */}
              <div className="p-6 md:p-10 flex-1 overflow-y-auto bg-white flex flex-col items-center">
                
                {/* VIEW 1: Form Builder (Screenshot 1) */}
                {activeTab === 'builder' && (
                  <div className="w-full max-w-2xl animation-fade-in">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 font-sans">make a quick form..</h3>
                    
                    {/* Block 1 */}
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm mb-4 relative">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-600">short text</span>
                        <span className="text-xs font-medium text-rose-500 hover:underline cursor-pointer">Remove</span>
                      </div>
                      <input type="text" disabled value="Name" className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg mb-3 font-medium" />
                      <input type="text" disabled value="YourName" className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg mb-3 text-slate-400" />
                      <label className="flex items-center gap-2 text-xs font-semibold text-slate-600"><input type="checkbox" defaultChecked disabled className="rounded border-slate-300 text-blue-600" /> Required</label>
                    </div>

                    {/* Block 2 */}
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm mb-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600">email</span>
                        <span className="text-xs font-medium text-rose-500 hover:underline cursor-pointer">Remove</span>
                      </div>
                      <input type="text" disabled value="Email" className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg mb-3 font-medium" />
                      <input type="text" disabled value="example@email.com" className="w-full text-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg mb-3 text-slate-400" />
                      <label className="flex items-center gap-2 text-xs font-semibold text-slate-600"><input type="checkbox" defaultChecked disabled className="rounded border-slate-300 text-blue-600" /> Required</label>
                    </div>

                    {/* Add Field Panel */}
                    <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 mb-6">
                      <span className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-3">Add Field</span>
                      <div className="flex flex-wrap gap-2">
                        {['+ Short Text', '+ Long Text', '+ Email', '+ Number', '+ Dropdown', '+ Checkbox', '+ Radio', '+ Date'].map((label) => (
                          <button key={label} disabled className="text-xs font-medium bg-white text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">{label}</button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button disabled className="bg-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md">Save Form</button>
                      <span className="text-xs text-slate-400 font-medium cursor-not-allowed">← Back to Dashboard</span>
                    </div>
                  </div>
                )}

                {/* VIEW 2: Public Submission View (Screenshot 2) */}
                {activeTab === 'public' && (
                  <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 md:p-8 mt-6 animation-fade-in">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">make a quick form..</h3>
                    
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-slate-700 mb-2">Name <span className="text-rose-500">*</span></label>
                      <input type="text" disabled placeholder="YourName" className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50" />
                    </div>

                    <div className="mb-6">
                      <label className="block text-xs font-bold text-slate-700 mb-2">Email <span className="text-rose-500">*</span></label>
                      <input type="text" disabled placeholder="example@email.com" className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50" />
                    </div>

                    <button disabled className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-md">Submit</button>
                  </div>
                )}

                {/* VIEW 3: Response View (Screenshot 3) */}
                {activeTab === 'responses' && (
                  <div className="w-full max-w-3xl animation-fade-in">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">make a quick form..</h3>
                        <span className="text-xs font-medium text-slate-400">2 response(s)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button disabled className="bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm">Download CSV</button>
                        <span className="text-xs text-slate-400 font-medium cursor-not-allowed">← Back</span>
                      </div>
                    </div>

                    {/* Submissions Stack */}
                    <div className="space-y-4">
                      {[
                        { id: '#1', time: '6/9/2026, 7:46:12 PM' },
                        { id: '#2', time: '6/9/2026, 7:46:04 PM' }
                      ].map((resp) => (
                        <div key={resp.id} className="bg-slate-50/80 border border-slate-200/60 rounded-xl p-5">
                          <span className="block text-[10px] font-mono text-slate-400 mb-2">Response {resp.id} • {resp.time}</span>
                          <div className="text-sm space-y-1">
                            <p className="text-slate-500"><strong className="text-slate-800 font-semibold">Name:</strong> rahul</p>
                            <p className="text-slate-500"><strong className="text-slate-800 font-semibold">Email:</strong> example@email.com</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white border-y border-slate-200/60 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
              Everything you need, none of the clutter
            </h2>
            <p className="text-slate-500 text-lg">
              All the tools required to spin up robust web forms, collect accurate telemetry, and analyze analytics data efficiently.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((f) => (
              <div 
                key={f.title} 
                className={`group bg-slate-50/50 hover:bg-white rounded-2xl p-8 border border-slate-100 hover:border-slate-200/80 transition-all duration-300 hover:shadow-xl hover:shadow-slate-100 flex flex-col justify-between ${f.className}`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-blue-50 border border-slate-200/60 group-hover:border-blue-100 flex items-center justify-center mb-6 shadow-sm transition-colors duration-300">
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2 tracking-tight">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-xl">{f.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-semibold text-blue-600 inline-flex items-center gap-1">
                    Learn more <span className="transform transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4">
            Get setup in 4 simple steps
          </h2>
          <p className="text-slate-500">
            Skip complex processes. Launch dynamic fields onto production in under 5 minutes.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
          {steps.map((s) => (
            <div key={s.step} className="relative bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm flex flex-col justify-between group hover:-translate-y-1 transition-transform">
              <div>
                <span className="block text-4xl font-black text-blue-500/15 mb-4 group-hover:text-blue-500/20 transition-colors">
                  {s.step}
                </span>
                <h3 className="font-bold text-slate-900 mb-1.5 tracking-tight">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="relative rounded-3xl bg-slate-900 overflow-hidden px-8 py-16 md:p-20 text-center shadow-xl shadow-slate-900/10">
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
              Ready to construct your first interface?
            </h2>
            <p className="text-slate-400 mb-10 text-base md:text-lg leading-relaxed">
              Join thousands of digital builders optimizing workflows, structuring feedback pipelines, and collecting accurate datasets today.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center justify-center bg-white text-slate-950 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-md active:scale-[0.99]"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-10 text-center text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <div className="w-5 h-5 rounded-md bg-blue-600 flex items-center justify-center text-[10px] text-white font-black">Q</div>
            QuickForms
          </div>
          <div>
            Built by{' '}
            <a 
              href="https://portfolio-ecosystem-qdec.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-colors"
            >
              Rahul Biswas
            </a>{' '}
            · {new Date().getFullYear()}
          </div>
        </div>
      </footer>

    </div>
  );
}