"use client";

import { useState, useEffect } from "react";
import { Metadata } from "next";
import { Footer } from "@/components/ui/Footer";

export default function CookiePolicy() {
  const [activeSection, setActiveSection] = useState("intro");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const sections = [
    { id: "intro", title: "1. What Are Cookies?", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { id: "types", title: "2. Types of Cookies", icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" },
    { id: "third-party", title: "3. Third-Party Cookies", icon: "M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" },
    { id: "control", title: "4. How to Control Cookies", icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" },
    { id: "duration", title: "5. Cookie Duration", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { id: "impact", title: "6. Impact of Disabling", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" },
    { id: "updates", title: "7. Policy Updates", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
    { id: "rights", title: "8. Your Rights", icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" },
    { id: "contact", title: "9. Contact", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { id: "resources", title: "10. Resources", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
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
    setExpandedSection(prev => prev === sectionId ? null : sectionId);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#f8fafc] scroll-smooth overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative w-full bg-gradient-to-br from-orange-600 to-red-600 pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-yellow-400 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-orange-400 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-orange-100 text-xs font-bold mb-6 animate-pulse">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Cookie Policy
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
            Cookie Preferences.
          </h1>
          <p className="text-orange-100 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Updated <span className="text-white font-bold">March 30, 2025</span>. 
            Learn how we use cookies to enhance your experience.
          </p>
        </div>
      </section>

      {/* MAIN LAYOUT */}
      <div className="flex-1 w-full flex flex-col lg:flex-row">
        
        {/* SIDE NAVIGATION */}
        <aside className="w-full lg:w-80 flex-shrink-0 bg-white/95 backdrop-blur-sm lg:bg-transparent border-b lg:border-r border-slate-200 sticky top-0 lg:top-24 z-40">
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-2 px-2">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Navigation</h3>
            </div>
            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl transition-all duration-300 active:scale-95 group border min-w-max lg:min-w-0 ${
                    activeSection === section.id 
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25 border-orange-600' 
                      : 'text-slate-500 hover:bg-white hover:shadow-md hover:text-orange-600 border-transparent hover:border-slate-100'
                  }`}
                >
                  <svg className={`w-5 h-5 transition-colors ${
                    activeSection === section.id ? 'text-white' : 'text-slate-400 group-hover:text-orange-500'
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
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Manage Preferences
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* CONTENT AREA */}
        <main className="flex-1 w-full bg-white px-6 py-12 md:px-16 lg:px-24">
          <div className="max-w-4xl space-y-32">
            
            {sections.map((section, idx) => (
              <section key={section.id} id={section.id} className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-6xl font-black text-slate-100 group-hover:text-orange-50 transition-colors duration-500 select-none">
                    0{idx + 1}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 group-hover:translate-x-2 transition-transform duration-300">
                    {section.title.split('. ')[1]}
                  </h2>
                </div>

                {/* Content rendering based on ID */}
                <div className="text-slate-600 leading-relaxed text-lg space-y-6">
                  {section.id === "intro" && (
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 hover:shadow-xl transition-all duration-300">
                      <p className="text-slate-700 font-medium leading-relaxed mb-6">
                        Cookies are small text files that are stored on your device when you visit a website. They allow the website to remember your actions and preferences over time, enhancing your browsing experience.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { icon: 'M9 12l2 2 4-4', title: 'Remember Preferences', desc: 'Language, region, and personal settings' },
                          { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z', title: 'Analytics', desc: 'Understanding how you use our site' },
                          { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Performance', desc: 'Optimizing website speed and functionality' },
                          { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', title: 'Personalization', desc: 'Tailored content and recommendations' }
                        ].map((item) => (
                          <div key={item.title} className="flex items-start gap-3 p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-orange-100">
                            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                              </svg>
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                              <p className="text-slate-600 text-sm">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.id === "types" && (
                    <div className="space-y-6">
                      {[
                        { 
                          type: 'Essential Cookies', 
                          color: 'green',
                          icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                          status: 'Always Active',
                          description: 'Required for the website to function properly',
                          examples: ['User authentication', 'Security tokens', 'Shopping cart', 'Load balancing']
                        },
                        { 
                          type: 'Analytics Cookies', 
                          color: 'blue',
                          icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2zM9 19h6m-6 0l6-6m0 0v6a2 2 0 002 2h2a2 2 0 002-2v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2zm0 0V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v8a2 2 0 002 2h2a2 2 0 002-2z',
                          status: 'Optional',
                          description: 'Help us understand how visitors interact with our website',
                          examples: ['Google Analytics', 'Page view counts', 'Session duration', 'Device statistics']
                        },
                        { 
                          type: 'Functional Cookies', 
                          color: 'purple',
                          icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
                          status: 'Optional',
                          description: 'Enable enhanced functionality and personalization',
                          examples: ['Language preferences', 'Customized content', 'Social media integration', 'Video player settings']
                        },
                        { 
                          type: 'Marketing Cookies', 
                          color: 'orange',
                          icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
                          status: 'Optional',
                          description: 'Used for advertising and marketing purposes',
                          examples: ['Meta Pixel', 'Google Ads', 'LinkedIn Insight Tag', 'Retargeting cookies']
                        }
                      ].map((cookie) => (
                        <div key={cookie.type} className="group relative overflow-hidden rounded-3xl bg-white border-2 border-slate-100 hover:border-orange-200 hover:shadow-2xl transition-all duration-300">
                          <div className="absolute top-0 left-0 w-1 h-full bg-orange-500 transition-all group-hover:w-2" />
                          <div className="p-8">
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={cookie.icon} />
                                  </svg>
                                </div>
                                <div>
                                  <h4 className="text-2xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{cookie.type}</h4>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    cookie.status === 'Always Active' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {cookie.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-slate-600 mb-4">{cookie.description}</p>
                            <div className="space-y-2">
                              <p className="text-sm font-bold text-slate-700">Examples:</p>
                              <div className="flex flex-wrap gap-2">
                                {cookie.examples.map(example => (
                                  <span key={example} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-lg text-sm">
                                    {example}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.id === "control" && (
                    <div className="space-y-6">
                      <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Cookie Control Options</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          {[
                            { 
                              title: 'Cookie Consent Banner', 
                              desc: 'Manage preferences when you first visit our website',
                              icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
                              options: ['Accept All', 'Reject All', 'Customize']
                            },
                            { 
                              title: 'Browser Settings', 
                              desc: 'Control cookies directly through your browser preferences',
                              icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                              options: ['View & Delete', 'Block Third-party', 'Privacy Settings']
                            }
                          ].map((control) => (
                            <div key={control.title} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={control.icon} />
                                  </svg>
                                </div>
                                <h4 className="font-bold text-slate-900">{control.title}</h4>
                              </div>
                              <p className="text-slate-600 text-sm mb-4">{control.desc}</p>
                              <div className="space-y-2">
                                {control.options.map(option => (
                                  <div key={option} className="flex items-center gap-2 text-sm text-slate-600">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                    {option}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                        <h4 className="font-bold text-slate-900 mb-4">Browser-Specific Instructions</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            { browser: 'Chrome', path: 'Settings → Privacy and security → Cookies' },
                            { browser: 'Firefox', path: 'Options → Privacy & Security → Cookies' },
                            { browser: 'Safari', path: 'Preferences → Privacy → Cookies' },
                            { browser: 'Edge', path: 'Settings → Privacy, search, and services → Cookies' }
                          ].map((item) => (
                            <div key={item.browser} className="flex items-center gap-3 p-3 bg-white rounded-xl">
                              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                                <span className="text-xs font-bold text-slate-600">{item.browser[0]}</span>
                              </div>
                              <div>
                                <p className="font-medium text-slate-900 text-sm">{item.browser}</p>
                                <p className="text-xs text-slate-500">{item.path}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {section.id === "contact" && (
                    <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 to-red-600 rounded-3xl p-12 text-center group">
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                      <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-orange-100 font-bold uppercase tracking-[0.3em] text-xs mb-4">Contact Us</p>
                        <a href="mailto:info@spaceonesurfaces.com" className="text-3xl md:text-4xl font-black text-white hover:scale-105 transition-transform inline-block mb-4">
                          info@spaceonesurfaces.com
                        </a>
                        <div className="text-orange-100 text-sm space-y-1">
                          <p>120/A, Bombay Talkies Compound, Malad West</p>
                          <p>Mumbai 400064, India</p>
                          <p>+91 98765 43210</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {section.id === "resources" && (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-slate-900 mb-6">Additional Resources</h3>
                      {[
                        { name: 'All About Cookies', url: 'https://www.allaboutcookies.org', desc: 'Comprehensive guide to cookies' },
                        { name: 'Your Online Choices', url: 'https://www.youronlinechoices.com', desc: 'Manage advertising preferences' },
                        { name: 'Google Analytics Opt-out', url: 'https://tools.google.com/dlpage/gaoptout', desc: 'Opt out of Google Analytics' },
                        { name: 'Digital Advertising Alliance', url: 'https://www.aboutads.info/choices', desc: 'Control ad targeting' }
                      ].map((resource) => (
                        <a key={resource.name} href={resource.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-6 rounded-2xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all duration-300">
                          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{resource.name}</h4>
                            <p className="text-slate-600 text-sm">{resource.desc}</p>
                          </div>
                          <svg className="w-5 h-5 text-slate-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Default content for other sections */}
                  {!['intro', 'types', 'control', 'contact', 'resources'].includes(section.id) && (
                    <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
                      <p className="text-slate-700 leading-relaxed">
                        {section.id === "third-party" && "We use various third-party services that may set their own cookies on your device when you visit our website. These third-party cookies are subject to their respective privacy policies."}
                        {section.id === "duration" && "Cookies have different lifespans depending on their purpose. Session cookies expire when you close your browser, while persistent cookies can last from days to years."}
                        {section.id === "impact" && "Disabling cookies may affect your experience on our website. Essential cookies are required for basic operation, while other cookies enhance your experience."}
                        {section.id === "updates" && "We may update this Cookie Policy from time to time to reflect changes in our cookie practices, legal requirements, or business operations."}
                        {section.id === "rights" && "You have the right to accept or reject non-essential cookies, change your preferences at any time, withdraw consent, and opt-out of targeted advertising."}
                      </p>
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
