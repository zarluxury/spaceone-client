"use client";
import React, { useState } from "react";
import { Footer } from "../ui/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const contactData = {
  title: "Headquarters",
  address: "120/A, Bombay Talkies compound, Dadiseth Lane,\nOff S.V. Road, Opp. Malad Sahakari Bank,\nMalad West, Mumbai 400064. India",
  phone: "+91 96533 18434",
  email: "info@spaceonesurfaces.com",
  openingHours: {
    title: "Opening hours",
    days: "Monday – Saturday",
    hours: "10am – 8pm"
  }
};

interface FormData {
  [key: string]: string | boolean;
}

const ContactUs = () => {
  const [form, setForm] = useState<FormData>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    setForm({ ...form, [target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      
      // Add all form fields
      Object.keys(form).forEach(key => {
        const value = form[key];
        if (typeof value === 'boolean') {
          formData.append(key, value.toString());
        } else {
          formData.append(key, value);
        }
      });

      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Your message has been sent successfully! We will contact you soon.');
        setMessageType('success');
        // Reset form
        setForm({});
        // Reset checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
        checkboxes.forEach(checkbox => checkbox.checked = false);
      } else {
        setMessage(data.message || 'Failed to send message. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Failed to send message. Please check your connection and try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      {/* Main Container - Takes full height */}
      <div className="flex-grow flex flex-col">
        {/* Details Section - 75% of viewport height */}
        <section className="min-h-[75vh] flex items-center justify-center px-6 py-20">
          <div className="max-w-3xl w-full">
            
            {/* Header Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-light tracking-tight text-neutral-900 mb-4">
                Get in Touch
              </h1>
              <div className="h-px w-12 bg-neutral-300 mx-auto"></div>
            </div>

            {/* Contact Card */}
            <div className="bg-white border border-neutral-100 shadow-sm rounded-2xl p-8 md:p-16 text-center">
              <h2 className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-8">
                {contactData.title}
              </h2>

              <div className="space-y-10">
                {/* Address */}
                <p className="text-lg md:text-xl text-neutral-800 leading-relaxed font-light whitespace-pre-line">
                  {contactData.address}
                </p>

                {/* Contact Details */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 pt-4">
                  <div className="group">
                    <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1">Phone</p>
                    <a href={`tel:${contactData.phone}`} className="text-neutral-900 hover:text-neutral-500 transition-colors">
                      {contactData.phone}
                    </a>
                  </div>
                  <div className="group">
                    <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1">Email</p>
                    <a href={`mailto:${contactData.email}`} className="text-neutral-900 hover:text-neutral-500 transition-colors">
                      {contactData.email}
                    </a>
                  </div>
                </div>

                {/* Divider */}
                <div className="pt-10 border-t border-neutral-50">
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-medium mb-4">
                    {contactData.openingHours.title}
                  </p>
                  <div className="text-neutral-700 font-light">
                    <p>{contactData.openingHours.days}</p>
                    <p className="text-neutral-500 mt-1">{contactData.openingHours.hours}</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* Contact Form Section - Takes remaining space */}
        <section className="flex-grow bg-white px-6 md:px-16 py-10 font-light flex items-center">
          <div className="w-full max-w-6xl mx-auto">
            {/* Heading */}
            <h1 className="text-3xl mb-3 tracking-wide">
              Fill out the form for more information
            </h1>

            <p className="text-sm text-gray-600 mb-12 max-w-2xl">
              Those interested in having further information on our solutions are
              invited to fill out the request form to be contacted directly by our office.
            </p>

            {/* Form */}
            <form className="space-y-10" onSubmit={handleSubmit}>
              {/* ===== 2 column grid ===== */}
              <div className="grid md:grid-cols-2 gap-x-16 gap-y-3">
                {["Name", "Surname", "Company", "Phone", "Address", "", "City", "Zip code", "Country", "Email"].map((label, i) =>
                  label ? (
                    <Input key={i} label={label} onChange={handleChange} value={(form[label.toLowerCase() === 'zip code' ? 'zipCode' : label.toLowerCase()] as string) || ''} />
                  ) : (
                    <div key={i}></div>
                  )
                )}
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  placeholder="Message*"
                  rows={5}
                  value={(form.message as string) || ''}
                  onChange={handleChange}
                  className="w-full border border-black p-4 outline-none resize-none text-sm"
                  required
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-4 text-sm text-gray-600">
                <Checkbox text="I declare that I have read the Privacy Policy." name="privacyPolicy" onChange={handleChange} required />
                <Checkbox text="I declare that I give my consent for newsletter subscription and for receiving marketing communications in accordance with the Privacy Policy." name="newsletter" onChange={handleChange} />
                <Checkbox text="I declare that I give my consent for profiling activities, analysis of my preferences, and for the provision of a personalized service in accordance with the Privacy Policy." name="profiling" onChange={handleChange} />
              </div>

              {/* Message Display */}
              {message && (
                <div className={`text-center p-4 rounded-lg ${messageType === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {message}
                </div>
              )}

              {/* Submit */}
              <div className="flex justify-center pt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-10 py-3 border border-black rounded-full text-sm hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'SENDING...' : 'SEND REQUEST'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

/* ---------- Small reusable components ---------- */

interface InputProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value: string;
}

function Input({ label, onChange, value }: InputProps) {
  return (
    <div className="flex flex-col">
      <input
        name={label.toLowerCase() === 'zip code' ? 'zipCode' : label.toLowerCase()}
        placeholder={`${label}*`}
        value={value}
        onChange={onChange}
        className="border-b border-black outline-none py-2 text-sm bg-transparent"
        required={label === 'Name' || label === 'Surname' || label === 'Email'}
        type={label === 'Email' ? 'email' : 'text'}
      />
    </div>
  );
}

interface CheckboxProps {
  text: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

function Checkbox({ text, name, onChange, required }: CheckboxProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input 
        type="checkbox" 
        name={name}
        onChange={(e) => {
          const target = e.target;
          onChange({
            ...e,
            target: {
              ...target,
              name: target.name,
              value: target.checked.toString(),
              checked: target.checked
            }
          });
        }}
        className="mt-1"
        required={required}
      />
      <span>{text}</span>
    </label>
  );
}

export default ContactUs;