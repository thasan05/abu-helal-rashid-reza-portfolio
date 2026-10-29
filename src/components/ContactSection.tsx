"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, ArrowUpRight, Send, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
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
    }, 600);
  };

  const cleanPhone = personalInfo.phone.replace(/[^0-9+]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone.replace("+", "")}`;

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-[#0B131F] text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B79A63] mb-2 sm:mb-3">
            <span className="w-6 h-[1.5px] bg-[#B79A63]" />
            <span>Executive Dialogue</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight tracking-tight">
            {contact.headline}
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-300 font-light leading-relaxed">
            {contact.subheadline}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
          
          {/* Left Column: Direct Executive Contact Channels */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              Whether you are exploring a real estate development partnership, seeking an executive operations perspective, or organizing an industry mentorship event, direct inquiries are welcomed.
            </p>

            <div className="space-y-3 sm:space-y-4">
              
              {/* LinkedIn Direct Connect */}
              <a
                href={personalInfo.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg bg-[#101C2C] border border-slate-800 hover:border-[#B79A63]/60 active:bg-[#18283E] transition-all group min-h-[48px]"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#18283E] flex items-center justify-center shrink-0 group-hover:bg-[#B79A63]/20 transition-colors">
                  <LinkedInIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#B79A63]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#CBB077]">
                    <span>Primary Professional Network</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </div>
                  <p className="font-serif text-sm sm:text-base font-medium text-white mt-0.5">
                    Connect on LinkedIn
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                    Direct messaging for corporate leadership and speaking requests.
                  </p>
                </div>
              </a>

              {/* Verified Email */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg bg-[#101C2C] border border-slate-800 hover:border-[#B79A63]/60 active:bg-[#18283E] transition-all group min-h-[48px]"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#18283E] flex items-center justify-center shrink-0 group-hover:bg-[#B79A63]/20 transition-colors">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#B79A63]" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#CBB077]">
                    Direct Executive Email
                  </div>
                  <p className="font-mono text-xs sm:text-sm md:text-base font-medium text-white mt-0.5 truncate">
                    {personalInfo.email}
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                    Formal correspondence and project documentation.
                  </p>
                </div>
              </a>

              {/* Direct WhatsApp Channel */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg bg-[#101C2C] border border-slate-800 hover:border-emerald-500/60 active:bg-[#18283E] transition-all group min-h-[48px]"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#18283E] flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    Instant Messaging via WhatsApp
                  </div>
                  <p className="font-mono text-xs sm:text-sm md:text-base font-medium text-white mt-0.5">
                    {personalInfo.phone}
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                    Fast response for scheduling and preliminary queries.
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg bg-[#101C2C] border border-slate-800 hover:border-[#B79A63]/60 active:bg-[#18283E] transition-all group min-h-[48px]"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#18283E] flex items-center justify-center shrink-0 group-hover:bg-[#B79A63]/20 transition-colors">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#B79A63]" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#CBB077]">
                    Telephone Direct
                  </div>
                  <p className="font-mono text-xs sm:text-sm md:text-base font-medium text-white mt-0.5">
                    {personalInfo.phone}
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                    Available during corporate working hours (BST).
                  </p>
                </div>
              </a>

              {/* Office Location */}
              <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg bg-[#101C2C] border border-slate-800">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#18283E] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#B79A63]" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#CBB077]">
                    Corporate Headquarters
                  </div>
                  <p className="font-serif text-sm sm:text-base font-medium text-white mt-0.5">
                    Edison Real Estate Limited
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

            </div>

            {/* Availability Note */}
            <div className="p-3.5 sm:p-4 rounded-lg bg-[#18283E]/60 border border-slate-800 text-xs text-slate-400 leading-relaxed">
              <span className="text-[#CBB077] font-semibold">Response Protocol: </span>
              {contact.availabilityNote}
            </div>

          </div>

          {/* Right Column: Executive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#101C2C] rounded-xl p-5 sm:p-8 lg:p-10 border border-slate-800 shadow-2xl">
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mb-1.5 sm:mb-2">
                Send an Executive Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6 sm:mb-8 font-light">
                Fill in the details below to open a direct email channel with Engr. Abu Helal Rashid Reza.
              </p>

              {submitted ? (
                <div className="p-5 sm:p-6 rounded-lg bg-emerald-950/40 border border-emerald-700/60 text-emerald-200 space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    <h4 className="font-serif text-base sm:text-lg font-semibold text-white">
                      Inquiry Prepared Successfully
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-300 leading-relaxed">
                    Your email client has been launched with your message pre-formatted for <strong className="text-white">{personalInfo.email}</strong>. If your email client did not open automatically, please email directly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider text-[#101C2C] bg-[#B79A63] hover:bg-[#CBB077] min-h-[44px]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {errorMsg && (
                    <div className="p-3.5 rounded bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5 sm:mb-2">
                        Your Name <span className="text-[#B79A63]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Tariq Ahmed"
                        className="w-full px-3.5 sm:px-4 py-3 rounded bg-[#18283E] border border-slate-700 text-white text-base sm:text-sm focus:outline-none focus:border-[#B79A63] placeholder-slate-500 transition-colors min-h-[46px]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5 sm:mb-2">
                        Email Address <span className="text-[#B79A63]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="name@company.com"
                        className="w-full px-3.5 sm:px-4 py-3 rounded bg-[#18283E] border border-slate-700 text-white text-base sm:text-sm focus:outline-none focus:border-[#B79A63] placeholder-slate-500 transition-colors min-h-[46px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5 sm:mb-2">
                        Organization / Affiliation
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="Company or Institution"
                        className="w-full px-3.5 sm:px-4 py-3 rounded bg-[#18283E] border border-slate-700 text-white text-base sm:text-sm focus:outline-none focus:border-[#B79A63] placeholder-slate-500 transition-colors min-h-[46px]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5 sm:mb-2">
                        Inquiry Topic
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-3.5 sm:px-4 py-3 rounded bg-[#18283E] border border-slate-700 text-white text-base sm:text-sm focus:outline-none focus:border-[#B79A63] transition-colors min-h-[46px]"
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
                    <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5 sm:mb-2">
                      Message <span className="text-[#B79A63]">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Please outline your project, proposed collaboration, or speaking engagement details..."
                      className="w-full px-3.5 sm:px-4 py-3 rounded bg-[#18283E] border border-slate-700 text-white text-base sm:text-sm focus:outline-none focus:border-[#B79A63] placeholder-slate-500 transition-colors resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#101C2C] bg-[#B79A63] hover:bg-[#CBB077] active:bg-[#CBB077] transition-all duration-200 shadow-lg shadow-[#B79A63]/15 disabled:opacity-50 min-h-[50px] active:scale-98"
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

                  <p className="text-[10px] sm:text-[11px] text-slate-500 text-center mt-2">
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
