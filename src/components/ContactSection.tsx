"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, ArrowUpRight, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { portfolioContent } from "@/data/content";

export default function ContactSection() {
  const { contact, personalInfo } = portfolioContent;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "Executive Inquiry / Real Estate Consultation",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("Please complete all required fields (Name, Email, and Message).");
      return;
    }

    setIsSubmitting(true);

    // Form client-side processing & mailto fallback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Create a direct mailto action to ensure inquiry is delivered safely
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        `[Executive Contact] ${formData.subject} - from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nOrganization: ${formData.organization}\n\nMessage:\n${formData.message}`
      )}`;

      window.location.href = mailtoUrl;
    }, 700);
  };

  return (
    <section id="contact" className="py-24 bg-[#0B131F] text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B79A63] mb-3">
            <span className="w-6 h-[1.5px] bg-[#B79A63]" />
            <span>Executive Dialogue</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight tracking-tight">
            {contact.headline}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            {contact.subheadline}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Direct Executive Contact Channels */}
          <div className="lg:col-span-5 space-y-8">
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              Whether you are exploring a real estate development partnership, seeking an executive operations perspective, or organizing an industry mentorship event, direct inquiries are welcomed.
            </p>

            <div className="space-y-5">
              
              {/* LinkedIn Direct Connect */}
              <a
                href={personalInfo.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 rounded-lg bg-[#101C2C] border border-slate-800 hover:border-[#B79A63]/60 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#18283E] flex items-center justify-center shrink-0 group-hover:bg-[#B79A63]/20 transition-colors">
                  <LinkedInIcon className="w-5 h-5 text-[#B79A63]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#CBB077]">
                    <span>Primary Professional Network</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                  <p className="font-serif text-base font-medium text-white mt-0.5">
                    Connect on LinkedIn
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Direct messaging for corporate leadership and speaking requests.
                  </p>
                </div>
              </a>

              {/* Verified Email */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-start gap-4 p-5 rounded-lg bg-[#101C2C] border border-slate-800 hover:border-[#B79A63]/60 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#18283E] flex items-center justify-center shrink-0 group-hover:bg-[#B79A63]/20 transition-colors">
                  <Mail className="w-5 h-5 text-[#B79A63]" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#CBB077]">
                    Direct Executive Email
                  </div>
                  <p className="font-mono text-sm sm:text-base font-medium text-white mt-0.5">
                    {personalInfo.email}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Formal correspondence and project documentation.
                  </p>
                </div>
              </a>

              {/* Phone / WhatsApp */}
              <a
                href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
                className="flex items-start gap-4 p-5 rounded-lg bg-[#101C2C] border border-slate-800 hover:border-[#B79A63]/60 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#18283E] flex items-center justify-center shrink-0 group-hover:bg-[#B79A63]/20 transition-colors">
                  <Phone className="w-5 h-5 text-[#B79A63]" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#CBB077]">
                    Telephone &amp; WhatsApp
                  </div>
                  <p className="font-mono text-sm sm:text-base font-medium text-white mt-0.5">
                    {personalInfo.phone}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Available during corporate working hours (BST).
                  </p>
                </div>
              </a>

              {/* Office Location */}
              <div className="flex items-start gap-4 p-5 rounded-lg bg-[#101C2C] border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-[#18283E] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#B79A63]" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#CBB077]">
                    Corporate Headquarters
                  </div>
                  <p className="font-serif text-base font-medium text-white mt-0.5">
                    Edison Real Estate Limited
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

            </div>

            {/* Availability Note */}
            <div className="p-4 rounded-lg bg-[#18283E]/60 border border-slate-800 text-xs text-slate-400 leading-relaxed">
              <span className="text-[#CBB077] font-semibold">Response Protocol: </span>
              {contact.availabilityNote}
            </div>

          </div>

          {/* Right Column: Executive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#101C2C] rounded-xl p-8 sm:p-10 border border-slate-800 shadow-2xl">
              <h3 className="font-serif text-2xl font-normal text-white mb-2">
                Send an Executive Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-8 font-light">
                Fill in the details below to open a direct email channel with Engr. Abu Helal Rashid Reza.
              </p>

              {submitted ? (
                <div className="p-6 rounded-lg bg-emerald-950/40 border border-emerald-700/60 text-emerald-200 space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    <h4 className="font-serif text-lg font-semibold text-white">
                      Inquiry Prepared Successfully
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-300 leading-relaxed">
                    Your email client has been launched with your message pre-formatted for <strong className="text-white">{personalInfo.email}</strong>. If your email client did not open automatically, please email directly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider text-[#101C2C] bg-[#B79A63] hover:bg-[#CBB077]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMsg && (
                    <div className="p-3.5 rounded bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                        Your Name <span className="text-[#B79A63]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Tariq Ahmed"
                        className="w-full px-4 py-3 rounded bg-[#18283E] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#B79A63] placeholder-slate-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                        Email Address <span className="text-[#B79A63]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="name@company.com"
                        className="w-full px-4 py-3 rounded bg-[#18283E] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#B79A63] placeholder-slate-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                        Organization / Affiliation
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="Company or Institution"
                        className="w-full px-4 py-3 rounded bg-[#18283E] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#B79A63] placeholder-slate-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                        Inquiry Topic
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded bg-[#18283E] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#B79A63] transition-colors"
                      >
                        <option>Real Estate Project Direction / Advisory</option>
                        <option>Construction Operations Consultation</option>
                        <option>LCB / University Mentorship &amp; Speaking</option>
                        <option>PMI Chapter / Professional Networking</option>
                        <option>General Executive Connection</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-2">
                      Message <span className="text-[#B79A63]">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Please outline your project, proposed collaboration, or speaking engagement details..."
                      className="w-full px-4 py-3 rounded bg-[#18283E] border border-slate-700 text-white text-sm focus:outline-none focus:border-[#B79A63] placeholder-slate-500 transition-colors resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#101C2C] bg-[#B79A63] hover:bg-[#CBB077] transition-all duration-200 shadow-lg shadow-[#B79A63]/15 disabled:opacity-50 active:scale-98"
                  >
                    {isSubmitting ? (
                      <span>Preparing Transmission...</span>
                    ) : (
                      <>
                        <span>Submit Executive Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    Direct transmission protected &bull; Strictly confidential executive communications.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
