"use client";

import { useState, useEffect } from "react";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

export function CookieConsentManager() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    functional: false,
    marketing: false,
  });

  const [savedPreferences, setSavedPreferences] = useState<CookiePreferences | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cookiePreferences");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSavedPreferences(parsed);
      setPreferences(parsed);
    }
  }, []);

  const handleToggle = (category: keyof CookiePreferences) => {
    if (category === "essential") return;
    setIsAnimating(true);
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    setSavedPreferences(preferences);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem("cookiePreferences", JSON.stringify(allAccepted));
    setSavedPreferences(allAccepted);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleRejectAll = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
    };
    setPreferences(essentialOnly);
    localStorage.setItem("cookiePreferences", JSON.stringify(essentialOnly));
    setSavedPreferences(essentialOnly);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const ToggleSwitch = ({ 
    checked, 
    onChange, 
    disabled = false,
    color = "blue"
  }: {
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
    color?: "blue" | "green" | "purple" | "orange";
  }) => {
    const colorClasses = {
      blue: "bg-blue-600 peer-checked:bg-blue-600",
      green: "bg-green-600 peer-checked:bg-green-600",
      purple: "bg-purple-600 peer-checked:bg-purple-600",
      orange: "bg-orange-600 peer-checked:bg-orange-600"
    };

    return (
      <button
        onClick={onChange}
        disabled={disabled}
        className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
          disabled 
            ? "bg-gray-300 cursor-not-allowed" 
            : `${colorClasses[color]} focus:ring-${color}-300`
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${
            checked ? "translate-x-8" : "translate-x-1"
          }`}
        />
      </button>
    );
  };

  return (
    <div className="space-y-8 relative">
      {/* Success Message */}
      {showSuccess && (
        <div className="absolute top-0 right-0 z-50 animate-pulse">
          <div className="bg-green-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Preferences saved!</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
          <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8h8V6z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-bold text-indigo-700">Cookie Control Center</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900">Manage Your Preferences</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Take control of your data privacy. Choose which cookies you're comfortable with and customize your browsing experience.
        </p>
      </div>

      {/* Current Status */}
      {savedPreferences && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-green-800 font-bold">Your preferences are active</p>
            <p className="text-green-600 text-sm">Last saved: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      )}

      {/* Cookie Categories */}
      <div className="space-y-4">
        {/* Essential Cookies */}
        <div className={`group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-gray-50 p-6 transition-all duration-300 hover:shadow-lg hover:border-slate-300 ${isAnimating ? 'scale-[1.02]' : ''}`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full -mr-16 -mt-16 opacity-50" />
          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Essential Cookies</h4>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Required</span>
              </div>
              <p className="text-slate-600 ml-13">Required for the website to function properly. These cannot be disabled.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-green-600">Always Active</span>
              <ToggleSwitch checked={true} onChange={() => {}} disabled={true} color="green" />
            </div>
          </div>
        </div>

        {/* Analytics Cookies */}
        <div className={`group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-300 ${isAnimating ? 'scale-[1.02]' : ''}`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -mr-16 -mt-16 opacity-50" />
          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Analytics Cookies</h4>
                {preferences.analytics && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full animate-pulse">Active</span>
                )}
              </div>
              <p className="text-slate-600 ml-13">Help us understand how visitors interact with our website to improve user experience.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${preferences.analytics ? 'text-blue-600' : 'text-slate-400'}`}>
                {preferences.analytics ? 'Enabled' : 'Disabled'}
              </span>
              <ToggleSwitch checked={preferences.analytics} onChange={() => handleToggle("analytics")} color="blue" />
            </div>
          </div>
        </div>

        {/* Functional Cookies */}
        <div className={`group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:border-purple-300 ${isAnimating ? 'scale-[1.02]' : ''}`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -mr-16 -mt-16 opacity-50" />
          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Functional Cookies</h4>
                {preferences.functional && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full animate-pulse">Active</span>
                )}
              </div>
              <p className="text-slate-600 ml-13">Enable personalized features, remember your preferences, and enhance functionality.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${preferences.functional ? 'text-purple-600' : 'text-slate-400'}`}>
                {preferences.functional ? 'Enabled' : 'Disabled'}
              </span>
              <ToggleSwitch checked={preferences.functional} onChange={() => handleToggle("functional")} color="purple" />
            </div>
          </div>
        </div>

        {/* Marketing Cookies */}
        <div className={`group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:border-orange-300 ${isAnimating ? 'scale-[1.02]' : ''}`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full -mr-16 -mt-16 opacity-50" />
          <div className="relative flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-bold text-slate-900 text-lg">Marketing Cookies</h4>
                {preferences.marketing && (
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full animate-pulse">Active</span>
                )}
              </div>
              <p className="text-slate-600 ml-13">Used to deliver personalized advertisements and measure marketing campaign effectiveness.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${preferences.marketing ? 'text-orange-600' : 'text-slate-400'}`}>
                {preferences.marketing ? 'Enabled' : 'Disabled'}
              </span>
              <ToggleSwitch checked={preferences.marketing} onChange={() => handleToggle("marketing")} color="orange" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={handleAcceptAll}
          className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          <div className="relative flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Accept All
          </div>
        </button>
        
        <button
          onClick={handleRejectAll}
          className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          <div className="relative flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Reject All
          </div>
        </button>
        
        <button
          onClick={handleSavePreferences}
          className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          <div className="relative flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
            </svg>
            Save Preferences
          </div>
        </button>
      </div>

      {/* Information Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-2">What happens next?</h5>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Your preferences are saved locally</li>
                <li>• Selected cookies will be activated</li>
                <li>• You can change settings anytime</li>
                <li>• Some features may be limited</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-2">Privacy First</h5>
              <p className="text-sm text-slate-600">
                We respect your privacy choices. Essential cookies ensure basic functionality, while others enhance your experience. You're in complete control.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
