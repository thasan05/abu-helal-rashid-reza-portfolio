"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Send, CheckCircle2, AlertCircle, Copy, Check, Clock, Mail, Phone, MapPin } from "lucide-react";
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
  const [copiedField, setCopiedField] = useState<"email" | "phone" | null>(null);
  const [dhakaTime, setDhakaTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(now);
        setDhakaTime(formatted);
      } catch {
        // Fallback for environments without Intl timezone support
        setDhakaTime("GMT+6 (BST)");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = async (text: string, field: "email" | "phone") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2200);
    } catch {
      // Fallback if clipboard API is restricted
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2200);
    }
  };

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

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        `[Executive Contact] ${formData.subject} - from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nOrganization: ${formData.organization}\n\nMessage:\n${formData.message}`
      )}`;

      window.location.href = mailtoUrl;
    }, 400);
  };

  const cleanPhone = personalInfo.phone.replace(/[^0-9+]/g, "");

  return (
    <section id="contact" className="py-20 sm:py-28 lg:py-32 bg-[#0B121E] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-[0.14em] font-semibold text-[#CBB077] mb-3">
            Chapter X &bull; Direct Executive Consultation
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight">
            Executive consultation &amp; direct dialogue.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            {contact.subheadline}
          </p>
        </div>

        {/* 2-Column Boardroom Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Direct Official Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-[8px] bg-[#142236] border border-white/10 space-y-6 shadow-md">
              
              {/* Dhaka Time & Availability Badge */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock className="w-4 h-4 text-[#CBB077]" />
                  <span className="text-xs uppercase tracking-[0.08em] font-medium text-slate-400">Dhaka (BST):</span>
                  <span className="text-white tabular-nums font-medium">
                    {dhakaTime || "Loading..."}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs uppercase tracking-[0.08em] font-medium">Channel Active</span>
                </div>
              </div>

              {/* Email with 1-Click Copy */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs uppercase tracking-[0.1em] font-medium text-[#CBB077] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Confidential Email</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(personalInfo.email, "email")}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[4px] bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white transition-colors min-h-[32px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B79A63]"
                    aria-label="Copy email address to clipboard"
                  >
                    {copiedField === "email" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="font-serif text-lg text-white hover:text-[#CBB077] transition-colors break-all block min-h-[28px]"
                >
                  {personalInfo.email}
                </a>
                <p className="text-xs text-slate-400 mt-1">
                  Official correspondence &amp; board consultations
                </p>
              </div>

              {/* Telephone with 1-Click Copy */}
              <div className="pt-5 border-t border-white/10">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs uppercase tracking-[0.1em] font-medium text-[#CBB077] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Direct Telephone</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(cleanPhone, "phone")}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[4px] bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white transition-colors min-h-[32px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B79A63]"
                    aria-label="Copy telephone number to clipboard"
                  >
                    {copiedField === "phone" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={`tel:${cleanPhone}`}
                  className="font-serif text-lg text-white hover:text-[#CBB077] transition-colors block min-h-[28px]"
                >
                  {personalInfo.phone}
                </a>
                <p className="text-xs text-slate-400 mt-1">
                  Available during standard corporate hours (BST)
                </p>
              </div>

              {/* Headquarters */}
              <div className="pt-5 border-t border-white/10">
                <span className="text-xs uppercase tracking-[0.1em] font-medium text-[#CBB077] flex items-center gap-1.5 mb-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Corporate Headquarters</span>
                </span>
                <div className="font-serif text-base text-white">
                  Edison Real Estate Limited
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dhaka, Bangladesh &bull; Active Project Directorate
                </p>
              </div>

              {/* LinkedIn */}
              <div className="pt-5 border-t border-white/10">
                <a
                  href={personalInfo.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#CBB077] hover:text-white transition-colors min-h-[44px]"
                >
                  <LinkedInIcon className="w-4 h-4" />
                  <span>Verify Profile on LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

            {/* Protocol Notice */}
            <div className="p-4 rounded-lg bg-[#070C14] border border-white/10 text-xs text-slate-400 leading-relaxed font-light">
              <span className="text-white font-medium">Protocol Note: </span>
              {contact.availabilityNote}
            </div>

          </div>

          {/* Right Column: Executive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 lg:p-10 rounded-[8px] bg-[#142236] border border-white/15 shadow-xl">
              
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mb-2">
                Initiate an executive inquiry
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6 font-light">
                Complete the fields below to open a direct confidential channel with Engr. Abu Helal Rashid Reza.
              </p>

              {submitted ? (
                <div className="p-6 rounded-lg bg-emerald-950/40 border border-emerald-700/60 text-emerald-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="font-serif text-base font-medium text-white">
                      Inquiry Dispatched
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-300 leading-relaxed">
                    Your email client has been prepared with pre-formatted correspondence to <strong className="text-white">{personalInfo.email}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-5 py-2.5 rounded bg-[#B79A63] text-[#070C14] text-xs font-semibold uppercase tracking-wider min-h-[44px] hover:bg-[#CBB077] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                        Your Name <span className="text-[#B79A63]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Tariq Ahmed"
                        className="w-full h-11 px-3.5 rounded bg-[#0B121E] border border-white/15 text-white text-sm focus:outline-none focus:border-[#B79A63] placeholder-slate-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                        Email Address <span className="text-[#B79A63]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="name@organization.com"
                        className="w-full h-11 px-3.5 rounded bg-[#0B121E] border border-white/15 text-white text-sm focus:outline-none focus:border-[#B79A63] placeholder-slate-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                        Organization / Venture
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="Company or Fund"
                        className="w-full h-11 px-3.5 rounded bg-[#0B121E] border border-white/15 text-white text-sm focus:outline-none focus:border-[#B79A63] placeholder-slate-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                        Inquiry Topic
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full h-11 px-3 rounded bg-[#0B121E] border border-white/15 text-white text-sm focus:outline-none focus:border-[#B79A63] transition-colors"
                      >
                        <option value="Executive Inquiry / Real Estate Consultation">
                          Executive Consultation
                        </option>
                        <option value="Condominium & Master Plan Partnership">
                          Condominium &amp; Master Plan Inquiry
                        </option>
                        <option value="Board / Operational Leadership Review">
                          Board / Leadership Review
                        </option>
                        <option value="Keynote Speaking & Mentorship">
                          Keynote Speaking / Mentorship
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      Executive Message <span className="text-[#B79A63]">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Outline the nature of your inquiry, project scope, or proposed engagement..."
                      className="w-full p-3.5 rounded bg-[#0B121E] border border-white/15 text-white text-sm focus:outline-none focus:border-[#B79A63] placeholder-slate-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 inline-flex items-center justify-center gap-2 rounded bg-[#B79A63] hover:bg-[#CBB077] active:bg-[#CBB077] text-[#070C14] text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md disabled:opacity-50 min-h-[48px]"
                  >
                    <span>{isSubmitting ? "Dispatching..." : "Transmit Executive Message"}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
