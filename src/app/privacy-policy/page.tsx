"use client";

import { useState, useEffect } from "react";
import { Metadata } from "next";
import { Footer } from "@/components/ui/Footer";
// import { Navbar } from "@/components/ui/Navbar"; 

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("intro");
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const sections = [
    { id: "intro", title: "1. Introduction", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { id: "collect", title: "2. Data Collection", icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" },
    { id: "usage", title: "3. Data Usage", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2zM9 19h6m-6 0l6-6m0 0v6a2 2 0 002 2h2a2 2 0 002-2v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2zm0 0V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v8a2 2 0 002 2h2a2 2 0 002-2z" },
    { id: "security", title: "4. Security", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
    { id: "rights", title: "5. Your Rights", icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" },
    { id: "contact", title: "6. Contact", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#f8fafc] scroll-smooth overflow-x-hidden">
      {/* <Navbar /> */}

      {/* FULL WIDTH HERO - Dynamic Gradient */}
      <section className="relative w-full bg-slate-900 pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-400 text-xs font-bold mb-6 animate-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Official Policy
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
            Privacy Matters.
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Updated <span className="text-white">March 30, 2025</span>. 
            Transparent data practices for the modern space.
          </p>
        </div>
      </section>

      {/* MAIN LAYOUT - Full Height Flex */}
      <div className="flex-1 w-full flex flex-col lg:flex-row">
        
        {/* SIDE NAVIGATION - Glassmorphism & Interactive Hover */}
        <aside className="w-full lg:w-80 flex-shrink-0 bg-white/95 backdrop-blur-sm lg:bg-transparent border-b lg:border-r border-slate-200 sticky top-0 lg:top-24 z-40">
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-2 px-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Navigation</h3>
            </div>
            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl transition-all duration-300 active:scale-95 group border min-w-max lg:min-w-0 ${
                    activeSection === section.id 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 border-blue-600' 
                      : 'text-slate-500 hover:bg-white hover:shadow-md hover:text-blue-600 border-transparent hover:border-slate-100'
                  }`}
                >
                  <svg className={`w-5 h-5 transition-colors ${
                    activeSection === section.id ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={section.icon} />
                  </svg>
                  <span className="truncate">{section.title}</span>
                  {activeSection === section.id && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </a>
              ))}
            </nav>
            
            {/* Quick Actions */}
            <div className="pt-4 border-t border-slate-100">
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share Policy
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* CONTENT AREA - Full Width and Responsive Padding */}
        <main className="flex-1 w-full bg-white px-6 py-12 md:px-16 lg:px-24">
          <div className="max-w-4xl space-y-32">
            
            {sections.map((section, idx) => (
              <section key={section.id} id={section.id} className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-6xl font-black text-slate-100 group-hover:text-blue-50 transition-colors duration-500 select-none">
                    0{idx + 1}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 group-hover:translate-x-2 transition-transform duration-300">
                    {section.title.split('. ')[1]}
                  </h2>
                </div>

                {/* Content rendering based on ID */}
                <div className="text-slate-600 leading-relaxed text-lg space-y-6">
                  {section.id === "intro" && (
                    <>
                      <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:shadow-xl transition-all duration-300">
                        <p className="text-slate-700 font-medium leading-relaxed mb-4">
                          SpaceOne Surfaces is committed to protecting your privacy. This policy explains how we collect and safeguard your information at <span className="text-blue-600 font-bold border-b-2 border-blue-200">https://spaceonesurfaces.com</span>.
                        </p>
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-200">
                          <p className="italic text-slate-800 font-medium leading-relaxed">
                            "We believe privacy is a fundamental right. Our systems are built with data minimization in mind—collecting only what is necessary to serve you."
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {section.id === "collect" && (
                    <div className="space-y-6">
                      {[
                        { type: 'Personal Data', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', color: 'blue', items: ['Name and contact information', 'Company details', 'Communication preferences', 'Inquiry history'] },
                        { type: 'Technical Data', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'purple', items: ['IP address and location', 'Browser and device info', 'Pages visited and time spent', 'Referral sources'] }
                      ].map((category) => (
                        <div key={category.type} className="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-100 hover:border-${category.color}-200 hover:shadow-2xl transition-all duration-300">
                          <div className="absolute top-0 left-0 w-1 h-full bg-${category.color}-500 transition-all group-hover:w-2" />
                          <div className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                              <div className="w-12 h-12 rounded-2xl bg-${category.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6 text-${category.color}-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={category.icon} />
                                </svg>
                              </div>
                              <h4 className="text-2xl font-bold text-slate-900 group-hover:text-${category.color}-600 transition-colors">{category.type}</h4>
                            </div>
                            <ul className="space-y-3">
                              {category.items.map(item => (
                                <li key={item} className="flex items-center gap-3 text-slate-600">
                                  <span className="h-2 w-2 rounded-full bg-${category.color}-400 group-hover:scale-150 transition-transform" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.id === "usage" && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {[
                          { title: 'Service Delivery', desc: 'Process inquiries and provide product information', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'yellow' },
                          { title: 'Analytics', desc: 'Improve website performance and user experience', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2zM9 19h6m-6 0l6-6m0 0v6a2 2 0 002 2h2a2 2 0 002-2v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2zm0 0V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v8a2 2 0 002 2h2a2 2 0 002-2z', color: 'green' },
                          { title: 'Communication', desc: 'Send responses and follow-up messages', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'blue' },
                          { title: 'Legal Compliance', desc: 'Meet regulatory requirements and legal obligations', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', color: 'purple' }
                        ].map((usage) => (
                          <div key={usage.title} className="group p-6 rounded-2xl bg-gradient-to-br from-${usage.color}-50 to-transparent border border-${usage.color}-100 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-xl bg-${usage.color}-100 flex items-center justify-center">
                                <svg className="w-5 h-5 text-${usage.color}-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={usage.icon} />
                                </svg>
                              </div>
                              <h4 className="font-bold text-slate-900">{usage.title}</h4>
                            </div>
                            <p className="text-slate-600 text-sm">{usage.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.id === "security" && (
                    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 text-white overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 p-8 opacity-10">
                        <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      </div>
                      <h3 className="text-3xl font-bold mb-4">Enterprise-Grade Security</h3>
                      <p className="text-slate-300 mb-8 max-w-2xl">Every connection is encrypted with 256-bit SSL, and our data centers are monitored 24/7 by security experts.</p>
                      <div className="flex flex-wrap gap-3">
                        {['ISO 27001 Certified', 'SSL Encrypted', 'GDPR Compliant', '24/7 Monitoring', 'Regular Audits'].map(badge => (
                          <span key={badge} className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-mono tracking-wide hover:bg-white/20 transition-colors">{badge}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.id === "rights" && (
                    <div className="space-y-4">
                      {[
                        { title: 'Access & Portability', desc: 'Request copies of your personal data', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                        { title: 'Correction', desc: 'Update inaccurate or incomplete information', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
                        { title: 'Deletion', desc: 'Request removal of your personal data', icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' },
                        { title: 'Consent Control', desc: 'Withdraw consent at any time', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
                      ].map((right) => (
                        <div key={right.title} className="group flex items-start gap-4 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300">
                          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={right.icon} />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 mb-1">{right.title}</h4>
                            <p className="text-slate-600 text-sm">{right.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.id === "contact" && (
                    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-12 text-center group">
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                      <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-blue-100 font-bold uppercase tracking-[0.3em] text-xs mb-4">Got Questions?</p>
                        <a href="mailto:info@spaceonesurfaces.com" className="text-3xl md:text-4xl font-black text-white hover:scale-105 transition-transform inline-block mb-4">
                          info@spaceonesurfaces.com
                        </a>
                        <div className="text-blue-100 text-sm space-y-1">
                          <p>120/A, Bombay Talkies Compound, Malad West</p>
                          <p>Mumbai 400064, India</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}