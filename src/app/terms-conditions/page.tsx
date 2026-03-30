"use client";

import { useState, useEffect } from "react";
import { Footer } from "@/components/ui/Footer";

export default function TermsConditions() {
  const [activeSection, setActiveSection] = useState("introduction");

  const sections = [
    { id: "introduction", title: "1. Introduction", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { id: "usage", title: "2. Use of Website", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { id: "products", title: "3. Products & Services", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
    { id: "intellectual", title: "4. Intellectual Property", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { id: "privacy", title: "5. Privacy & Data", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
    { id: "liability", title: "6. Limitation of Liability", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.73 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" },
    { id: "termination", title: "7. Termination", icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" },
    { id: "governing", title: "8. Governing Law", icon: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" },
    { id: "contact", title: "9. Contact", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
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
      <section className="relative w-full bg-gradient-to-br from-indigo-600 to-purple-600 pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-400 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-400 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-indigo-100 text-xs font-bold mb-6 animate-pulse">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Legal Terms
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
            Terms & Conditions.
          </h1>
          <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Updated <span className="text-white font-bold">March 30, 2025</span>. 
            Legal terms governing the use of our website and services.
          </p>
        </div>
      </section>

      {/* MAIN LAYOUT */}
      <div className="flex-1 w-full flex flex-col lg:flex-row">
        
        {/* SIDE NAVIGATION */}
        <aside className="w-full lg:w-80 flex-shrink-0 bg-white/95 backdrop-blur-sm lg:bg-transparent border-b lg:border-r border-slate-200 sticky top-0 lg:top-24 z-40">
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-2 px-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Navigation</h3>
            </div>
            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl transition-all duration-300 active:scale-95 group border min-w-max lg:min-w-0 ${
                    activeSection === section.id 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 border-indigo-600' 
                      : 'text-slate-500 hover:bg-white hover:shadow-md hover:text-indigo-600 border-transparent hover:border-slate-100'
                  }`}
                >
                  <svg className={`w-5 h-5 transition-colors ${
                    activeSection === section.id ? 'text-white' : 'text-slate-400 group-hover:text-indigo-500'
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
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
                  </svg>
                  Print Version
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
                  <span className="text-6xl font-black text-slate-100 group-hover:text-indigo-50 transition-colors duration-500 select-none">
                    0{idx + 1}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 group-hover:translate-x-2 transition-transform duration-300">
                    {section.title.split('. ')[1]}
                  </h2>
                </div>

                {/* Content rendering based on ID */}
                <div className="text-slate-600 leading-relaxed text-lg space-y-6">
                  {section.id === "introduction" && (
                    <div className="space-y-8">
                      <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
                        <p className="text-slate-700 font-medium leading-relaxed mb-6">
                          Welcome to SpaceOne Surfaces. These Terms & Conditions govern your use of our website and services. By accessing our site, you agree to be bound by these terms.
                        </p>
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-indigo-200">
                          <p className="italic text-slate-800 font-medium leading-relaxed">
                            "SpaceOne Surfaces is a leading provider of surface materials, interior products, and architectural solutions based in Mumbai, India."
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-transparent border border-blue-100">
                          <h4 className="font-bold text-slate-900 mb-3">Website</h4>
                          <p className="text-slate-600 text-sm">https://spaceonesurfaces.com</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-transparent border border-green-100">
                          <h4 className="font-bold text-slate-900 mb-3">Effective Date</h4>
                          <p className="text-slate-600 text-sm">March 30, 2025</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {section.id === "usage" && (
                    <div className="space-y-6">
                      <div className="p-8 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Permitted Use</h3>
                        <div className="space-y-3">
                          {[
                            'Browse and view our product catalog and services',
                            'Submit inquiries and requests for information',
                            'Download available resources and materials',
                            'Contact us for business purposes',
                            'Use our website for legitimate business inquiries'
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <p className="text-slate-600">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-8 rounded-3xl bg-gradient-to-br from-red-50 to-pink-50 border border-red-100">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Prohibited Activities</h3>
                        <div className="space-y-3">
                          {[
                            'Using the website for illegal or unauthorized purposes',
                            'Attempting to gain unauthorized access to our systems',
                            'Interfering with or disrupting the website\'s operation',
                            'Reproducing, duplicating, or copying any content without permission',
                            'Using automated tools to scrape or harvest data',
                            'Impersonating any person or entity'
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <p className="text-slate-600">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {section.id === "products" && (
                    <div className="space-y-6">
                      <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Product Information</h3>
                        <p className="text-slate-700 mb-6">
                          We strive to provide accurate and up-to-date information about our products and services. However, we do not warrant that product descriptions, colors, or other content are accurate, complete, reliable, or error-free.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-amber-100">
                            <h4 className="font-bold text-slate-900 mb-3">Pricing</h4>
                            <p className="text-slate-600 text-sm">Prices are subject to change without notice and do not include taxes or shipping costs.</p>
                          </div>
                          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-amber-100">
                            <h4 className="font-bold text-slate-900 mb-3">Availability</h4>
                            <p className="text-slate-600 text-sm">Product availability is subject to change and may vary based on location and inventory.</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                        <h4 className="font-bold text-slate-900 mb-4">Order Processing</h4>
                        <p className="text-slate-600 mb-4">
                          All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including but not limited to:
                        </p>
                        <ul className="list-disc pl-6 text-slate-600 space-y-2">
                          <li>Product unavailability</li>
                          <li>Pricing errors</li>
                          <li>Suspicion of fraudulent activity</li>
                          <li>Violation of these Terms</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {section.id === "intellectual" && (
                    <div className="space-y-6">
                      <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Intellectual Property Rights</h3>
                        <p className="text-slate-700 mb-6">
                          All content on this website, including but not limited to text, graphics, logos, images, videos, and software, is the property of SpaceOne Surfaces or its content suppliers and is protected by intellectual property laws.
                        </p>
                        
                        <div className="space-y-4">
                          {[
                            { title: 'Trademarks', desc: 'SpaceOne Surfaces and related logos are trademarks of our company' },
                            { title: 'Copyright', desc: 'All original content is protected by copyright laws' },
                            { title: 'Design Rights', desc: 'Product designs and architectural solutions are protected' },
                            { title: 'Trade Secrets', desc: 'Business methods and processes are confidential' }
                          ].map((item) => (
                            <div key={item.title} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-100">
                              <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                              <p className="text-slate-600 text-sm">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                        <h4 className="font-bold text-slate-900 mb-4">Usage Restrictions</h4>
                        <p className="text-slate-600">
                          You may not use, reproduce, distribute, or create derivative works of any content without our express written permission. Any unauthorized use may violate copyright, trademark, and other laws.
                        </p>
                      </div>
                    </div>
                  )}

                  {section.id === "privacy" && (
                    <div className="space-y-6">
                      <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Privacy Protection</h3>
                        <p className="text-slate-700 mb-6">
                          Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which forms part of these Terms.
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            { 
                              title: 'Data Collection', 
                              desc: 'We collect information you provide directly and through your use of our website',
                              icon: 'M7 20l4-16m2 16l4-16M6 9h14M4 15h14'
                            },
                            { 
                              title: 'Data Usage', 
                              desc: 'We use your information to provide services and improve your experience',
                              icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z'
                            },
                            { 
                              title: 'Data Security', 
                              desc: 'We implement appropriate security measures to protect your information',
                              icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622'
                            },
                            { 
                              title: 'Data Rights', 
                              desc: 'You have rights regarding your personal data as described in our Privacy Policy',
                              icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
                            }
                          ].map((item) => (
                            <div key={item.title} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                  </svg>
                                </div>
                                <h4 className="font-bold text-slate-900">{item.title}</h4>
                              </div>
                              <p className="text-slate-600 text-sm">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                        <h4 className="font-bold text-slate-900 mb-4">Cookies</h4>
                        <p className="text-slate-600 mb-4">
                          We use cookies and similar technologies to enhance your experience. You can control cookie settings through your browser preferences. See our Cookie Policy for more information.
                        </p>
                        <a href="/cookie-policy" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                          View Cookie Policy
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  )}

                  {section.id === "liability" && (
                    <div className="space-y-6">
                      <div className="p-8 rounded-3xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-100">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Limitation of Liability</h3>
                        <p className="text-slate-700 mb-6">
                          To the maximum extent permitted by law, SpaceOne Surfaces shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services.
                        </p>
                        
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-red-200">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.73 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                              </svg>
                            </div>
                            <h4 className="font-bold text-slate-900">Important Notice</h4>
                          </div>
                          <p className="text-slate-600">
                            Our liability is limited to the maximum extent permitted by applicable law. In no event shall our total liability exceed the amount paid by you, if any, for accessing or using our website.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {[
                          'Website availability and uptime',
                          'Accuracy of product information',
                          'Third-party website links',
                          'Business interruptions or delays',
                          'Loss of data or information'
                        ].map((item) => (
                          <div key={item} className="flex items-start gap-3 p-4 rounded-xl border border-slate-100">
                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-3 h-3 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <p className="text-slate-600 text-sm">Not liable for: {item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.id === "termination" && (
                    <div className="space-y-6">
                      <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-100">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Termination Rights</h3>
                        <p className="text-slate-700 mb-6">
                          We reserve the right to terminate or suspend your access to our website immediately, without prior notice or liability, for any reason, including if you breach these Terms.
                        </p>
                        
                        <div className="space-y-4">
                          {[
                            { 
                              title: 'Termination by Us', 
                              desc: 'We may terminate your access for violation of terms, illegal activities, or at our discretion',
                              icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7'
                            },
                            { 
                              title: 'Termination by You', 
                              desc: 'You may stop using our website at any time, but these Terms will continue to apply',
                              icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                            }
                          ].map((item) => (
                            <div key={item.title} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-100">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                  </svg>
                                </div>
                                <h4 className="font-bold text-slate-900">{item.title}</h4>
                              </div>
                              <p className="text-slate-600 text-sm">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                        <h4 className="font-bold text-slate-900 mb-4">Effect of Termination</h4>
                        <p className="text-slate-600">
                          Upon termination, your right to use the website will cease immediately. All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.
                        </p>
                      </div>
                    </div>
                  )}

                  {section.id === "governing" && (
                    <div className="space-y-6">
                      <div className="p-8 rounded-3xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Governing Law & Jurisdiction</h3>
                        <p className="text-slate-700 mb-6">
                          These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-teal-100">
                            <h4 className="font-bold text-slate-900 mb-3">Governing Law</h4>
                            <p className="text-slate-600 text-sm">Laws of India</p>
                          </div>
                          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-teal-100">
                            <h4 className="font-bold text-slate-900 mb-3">Jurisdiction</h4>
                            <p className="text-slate-600 text-sm">Courts in Mumbai, India</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                        <h4 className="font-bold text-slate-900 mb-4">Dispute Resolution</h4>
                        <p className="text-slate-600 mb-4">
                          Any dispute arising from these Terms or your use of our website shall be subject to the exclusive jurisdiction of the courts located in Mumbai, India.
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                            <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                              <span className="text-xs">⚖️</span>
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 text-sm">Legal Venue</p>
                              <p className="text-xs text-slate-500">Mumbai, Maharashtra, India</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {section.id === "contact" && (
                    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-12 text-center group">
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                      <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-indigo-100 font-bold uppercase tracking-[0.3em] text-xs mb-4">Legal Questions?</p>
                        <a href="mailto:info@spaceonesurfaces.com" className="text-3xl md:text-4xl font-black text-white hover:scale-105 transition-transform inline-block mb-4">
                          info@spaceonesurfaces.com
                        </a>
                        <div className="text-indigo-100 text-sm space-y-1">
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