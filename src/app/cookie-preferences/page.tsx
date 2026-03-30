"use client";

import { useState, useEffect } from "react";
import { Footer } from "@/components/ui/Footer";
import { CookieConsentManager } from "@/components/ui/CookieConsentManager";

export default function CookiePreferences() {
  const [activeSection, setActiveSection] = useState("preferences");

  const sections = [
    { id: "preferences", title: "1. Cookie Preferences", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
    { id: "usage", title: "2. How We Use Your Data", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2zM9 19h6m-6 0l6-6m0 0v6a2 2 0 002 2h2a2 2 0 002-2v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2zm0 0V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v8a2 2 0 002 2h2a2 2 0 002-2z" },
    { id: "rights", title: "3. Your Rights", icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" },
    { id: "browser", title: "4. Browser Controls", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { id: "consent", title: "5. Consent Banner", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { id: "faq", title: "6. FAQs", icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { id: "contact", title: "7. Contact", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
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

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#f8fafc] scroll-smooth overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative w-full bg-gradient-to-br from-emerald-600 to-teal-600 pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-green-400 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-teal-400 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-100 text-xs font-bold mb-6 animate-pulse">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Cookie Preferences
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
            Control Your Data.
          </h1>
          <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Updated <span className="text-white font-bold">March 30, 2025</span>. 
            Manage your cookie preferences and privacy settings.
          </p>
        </div>
      </section>

      {/* MAIN LAYOUT */}
      <div className="flex-1 w-full flex flex-col lg:flex-row">
        
        {/* SIDE NAVIGATION */}
        <aside className="w-full lg:w-80 flex-shrink-0 bg-white/95 backdrop-blur-sm lg:bg-transparent border-b lg:border-r border-slate-200 sticky top-0 lg:top-24 z-40">
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-2 px-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Navigation</h3>
            </div>
            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl transition-all duration-300 active:scale-95 group border min-w-max lg:min-w-0 ${
                    activeSection === section.id 
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 border-emerald-600' 
                      : 'text-slate-500 hover:bg-white hover:shadow-md hover:text-emerald-600 border-transparent hover:border-slate-100'
                  }`}
                >
                  <svg className={`w-5 h-5 transition-colors ${
                    activeSection === section.id ? 'text-white' : 'text-slate-400 group-hover:text-emerald-500'
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
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset Preferences
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export Settings
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
                  <span className="text-6xl font-black text-slate-100 group-hover:text-emerald-50 transition-colors duration-500 select-none">
                    0{idx + 1}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 group-hover:translate-x-2 transition-transform duration-300">
                    {section.title.split('. ')[1]}
                  </h2>
                </div>

                {/* Content rendering based on ID */}
                <div className="text-slate-600 leading-relaxed text-lg space-y-6">
                  {section.id === "preferences" && (
                    <div className="space-y-8">
                      <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
                        <p className="text-slate-700 font-medium leading-relaxed mb-6">
                          Take control of your privacy by customizing your cookie preferences. Essential cookies are required for basic functionality, while others enhance your experience.
                        </p>
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200">
                          <p className="italic text-slate-800 font-medium leading-relaxed">
                            "Your privacy is our priority. We only collect what's necessary to provide you with the best experience on SpaceOne Surfaces."
                          </p>
                        </div>
                      </div>
                      
                      {/* Cookie Consent Manager Component */}
                      <CookieConsentManager />
                    </div>
                  )}

                  {section.id === "usage" && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {[
                          { 
                            title: 'Personalization', 
                            desc: 'Remember your preferences and provide tailored content',
                            icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
                            color: 'pink'
                          },
                          { 
                            title: 'Analytics', 
                            desc: 'Help us understand how you use our website to improve it',
                            icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z',
                            color: 'blue'
                          },
                          { 
                            title: 'Security', 
                            desc: 'Protect your account and prevent fraudulent activities',
                            icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                            color: 'green'
                          },
                          { 
                            title: 'Communication', 
                            desc: 'Send you important updates and respond to your inquiries',
                            icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                            color: 'purple'
                          }
                        ].map((usage) => (
                          <div key={usage.title} className="group p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-transparent border border-pink-100 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                                <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                  {section.id === "rights" && (
                    <div className="space-y-4">
                      {[
                        { title: 'Access & Transparency', desc: 'Know exactly what data we collect and how it\'s used', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                        { title: 'Control & Choice', desc: 'Decide what cookies you want to accept or reject', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
                        { title: 'Data Portability', desc: 'Request a copy of your data in a machine-readable format', icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10' },
                        { title: 'Deletion Rights', desc: 'Request removal of your personal data when legally required', icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' },
                        { title: 'Consent Withdrawal', desc: 'Change your mind and withdraw consent at any time', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
                      ].map((right) => (
                        <div key={right.title} className="group flex items-start gap-4 p-6 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-300">
                          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                  {section.id === "browser" && (
                    <div className="space-y-6">
                      <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Browser Cookie Controls</h3>
                        <p className="text-slate-700 mb-6">
                          Most browsers allow you to control cookies through their settings. Here's how to manage cookies in popular browsers:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            { browser: 'Chrome', path: 'Settings → Privacy and security → Cookies and other site data', icon: '🌐' },
                            { browser: 'Firefox', path: 'Options → Privacy & Security → Cookies and Site Data', icon: '🦊' },
                            { browser: 'Safari', path: 'Preferences → Privacy → Cookies and website data', icon: '🧭' },
                            { browser: 'Edge', path: 'Settings → Privacy, search, and services → Cookies', icon: '🌊' }
                          ].map((item) => (
                            <div key={item.browser} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl">
                                  {item.icon}
                                </div>
                                <h4 className="font-bold text-slate-900">{item.browser}</h4>
                              </div>
                              <p className="text-slate-600 text-sm">{item.path}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                        <h4 className="font-bold text-slate-900 mb-4">Mobile Devices</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                              <span className="text-xs">🍎</span>
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 text-sm">iOS (iPhone/iPad)</p>
                              <p className="text-xs text-slate-500">Settings → Safari → Privacy → Block Cookies</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                              <span className="text-xs">🤖</span>
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 text-sm">Android</p>
                              <p className="text-xs text-slate-500">Chrome → Settings → Site settings → Cookies</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {section.id === "consent" && (
                    <div className="space-y-6">
                      <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Understanding Our Consent Banner</h3>
                        <p className="text-slate-700 mb-6">
                          When you visit SpaceOne Surfaces, you'll see our cookie consent banner. Here's what each option means:
                        </p>
                        <div className="space-y-4">
                          {[
                            { 
                              title: 'Accept All', 
                              desc: 'Enable all cookies including essential, analytics, functional, and marketing cookies for the best experience',
                              icon: '✅',
                              color: 'green'
                            },
                            { 
                              title: 'Reject All', 
                              desc: 'Only enable essential cookies required for basic website functionality',
                              icon: '❌',
                              color: 'red'
                            },
                            { 
                              title: 'Customize', 
                              desc: 'Choose exactly which types of cookies you want to allow based on your preferences',
                              icon: '⚙️',
                              color: 'blue'
                            }
                          ].map((option) => (
                            <div key={option.title} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-100">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                                  {option.icon}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-bold text-slate-900 mb-1">{option.title}</h4>
                                  <p className="text-slate-600 text-sm">{option.desc}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {section.id === "faq" && (
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h3>
                      {[
                        { q: 'What happens if I reject all cookies?', a: 'You can still browse our website, but some features like personalized content, analytics, and social media integration may not work properly.' },
                        { q: 'How long do cookies stay on my device?', a: 'Session cookies expire when you close your browser. Persistent cookies can last from days to years depending on their purpose.' },
                        { q: 'Can I change my preferences later?', a: 'Yes! You can update your cookie preferences at any time using the cookie settings panel or by visiting this page.' },
                        { q: 'Do you sell my personal data?', a: 'No. We never sell your personal data to third parties. We only use it to improve your experience and provide our services.' },
                        { q: 'What about third-party cookies?', a: 'Some third-party services may set cookies for analytics, advertising, or social media features. You can control these through your preferences.' }
                      ].map((faq, index) => (
                        <div key={index} className="group p-6 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-300">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-emerald-600 font-bold text-sm">Q{index + 1}</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
                              <p className="text-slate-600 text-sm">{faq.a}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.id === "contact" && (
                    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-12 text-center group">
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                      <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-emerald-100 font-bold uppercase tracking-[0.3em] text-xs mb-4">Privacy Questions?</p>
                        <a href="mailto:info@spaceonesurfaces.com" className="text-3xl md:text-4xl font-black text-white hover:scale-105 transition-transform inline-block mb-4">
                          info@spaceonesurfaces.com
                        </a>
                        <div className="text-emerald-100 text-sm space-y-1">
                          <p>120/A, Bombay Talkies Compound, Malad West</p>
                          <p>Mumbai 400064, India</p>
                          <p>+91 98765 43210</p>
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

           