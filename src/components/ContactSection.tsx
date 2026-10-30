"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Send, CheckCircle2, AlertCircle, Copy, Check, Clock, Mail, Phone, MapPin } from "lucide-react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { portfolioContent } from "@/data/content";
import { submitPublicInquiry } from "@/app/admin/cms-actions";
import type { DatabasePortfolioData } from "@/lib/db/data";

interface ContactSectionProps {
  data?: DatabasePortfolioData;
}

export default function ContactSection({ data }: ContactSectionProps) {
  const contact = data?.contact || portfolioContent.contact;
  const personalInfo = data?.personalInfo || portfolioContent.personalInfo;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("Please complete all required fields (Name, Email, and Message).");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const fData = new FormData();
      fData.append("name", formData.name);
      fData.append("email", formData.email);
      fData.append("organization", formData.organization);
      fData.append("subject", formData.subject);
      fData.append("message", formData.message);

      const res = await submitPublicInquiry(fData);
      if (res?.error) {
        setErrorMsg(res.error);
        setIsSubmitting(false);
        return;
      }
      setIsSubmitting(false);
      setSubmitted(true);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMsg(err?.message || "Failed to submit inquiry. Please reach out via direct email.");
    }
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
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs uppercase tracking-[0.12em] font-medium text-[#CBB077]">
                  Official Executive Registry
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#B79A63]" />
                  <span>{dhakaTime || "Dhaka (BST)"}</span>
                </div>
              </div>

              {/* Direct Email */}
              <div>
                <span className="text-xs text-slate-400 block mb-1">Direct Correspondence</span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="font-serif text-lg sm:text-xl text-white hover:text-[#CBB077] transition-colors break-all"
                  >
                    {personalInfo.email}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(personalInfo.email, "email")}
                    className="p-2 rounded-[4px] bg-[#0B121E] hover:bg-[#18283E] text-slate-300 hover:text-white transition-colors border border-white/10 shrink-0"
                    title="Copy Email Address"
                    aria-label="Copy Email Address"
                  >
                    {copiedField === "email" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Direct Telephone */}
              <div>
                <span className="text-xs text-slate-400 block mb-1">Direct Telephone</span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="font-serif text-lg sm:text-xl text-white hover:text-[#CBB077] transition-colors"
                  >
                    {personalInfo.phone}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(personalInfo.phone, "phone")}
                    className="p-2 rounded-[4px] bg-[#0B121E] hover:bg-[#18283E] text-slate-300 hover:text-white transition-colors border border-white/10 shrink-0"
                    title="Copy Phone Number"
                    aria-label="Copy Phone Number"
                  >
                    {copiedField === "phone" ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Physical Corporate Presence */}
              <div>
                <span className="text-xs text-slate-400 block mb-1">Executive Office Presence</span>
                <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#B79A63] shrink-0 mt-0.5" />
                  <span>{contact.officeLocation}</span>
                </div>
              </div>

              {/* LinkedIn Direct Connect */}
              <div className="pt-2">
                <a
                  href={personalInfo.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-[4px] bg-[#0B121E] hover:bg-[#18283E] border border-white/15 hover:border-[#B79A63]/60 text-slate-200 text-xs font-medium uppercase tracking-wider transition-all min-h-[44px]"
                >
                  <LinkedInIcon className="w-4 h-4 text-[#B79A63]" />
                  <span>Connect via LinkedIn Professional Network</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>

            </div>

            {/* Availability Protocol Plate */}
            <div className="p-4 rounded-[6px] bg-[#0B121E] border border-white/10 text-xs text-slate-400 space-y-1">
              <span className="text-slate-300 font-medium block">Advisory &amp; Engagement Protocol:</span>
              <p className="font-light leading-relaxed">
                {contact.availabilityNote}
              </p>
            </div>

          </div>

          {/* Right Column: Formal Direct Inquiry Dispatch */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-[8px] bg-[#142236] border border-white/10 shadow-lg">
              
              <h3 className="font-serif text-2xl font-normal text-white mb-2">
                Dispatch an Executive Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
                Directly reaches Engr. Reza&apos;s executive desk for strategic developments, board appointments, and development consultation.
              </p>

              {submitted ? (
                <div className="p-6 rounded-[6px] bg-[#0B121E] border border-[#B79A63]/40 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#B79A63] mx-auto" />
                  <h4 className="font-serif text-lg text-white">Inquiry Successfully Transmitted</h4>
                  <p className="text-xs text-slate-300 font-light max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-medium">{formData.name}</span>. Your inquiry has been securely logged to Engr. Reza&apos;s executive desk. Direct follow-up will be initiated promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        organization: "",
                        subject: "Executive Inquiry / Real Estate Consultation",
                        message: "",
                      });
                    }}
                    className="mt-4 px-4 py-2 text-xs uppercase tracking-wider font-semibold text-[#B79A63] hover:text-[#CBB077] underline"
                  >
                    Send Another Dispatch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded-[4px] bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs uppercase tracking-[0.08em] font-medium text-slate-300 mb-1.5">
                        Your Full Name <span className="text-[#B79A63]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 rounded-[4px] bg-[#0B121E] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#B79A63] transition-colors"
                        placeholder="e.g., Brig. Gen. (Retd.) / Managing Director"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs uppercase tracking-[0.08em] font-medium text-slate-300 mb-1.5">
                        Direct Email Address <span className="text-[#B79A63]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 rounded-[4px] bg-[#0B121E] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#B79A63] transition-colors"
                        placeholder="e.g., corporate.email@domain.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="organization" className="block text-xs uppercase tracking-[0.08em] font-medium text-slate-300 mb-1.5">
                        Organization / Firm
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-[4px] bg-[#0B121E] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#B79A63] transition-colors"
                        placeholder="e.g., Development Group / Financial Institution"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs uppercase tracking-[0.08em] font-medium text-slate-300 mb-1.5">
                        Nature of Consultation <span className="text-[#B79A63]">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-[4px] bg-[#0B121E] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#B79A63] transition-colors"
                      >
                        <option value="Executive Inquiry / Real Estate Consultation">Executive Consultation</option>
                        <option value="Landmark Condominium & High-Rise Development">Landmark Condominium Development</option>
                        <option value="Strategic Joint Venture / Landowner Partnership">Strategic Joint Venture Partnership</option>
                        <option value="Executive Leadership / Board Advisory">Executive Leadership / Board Advisory</option>
                        <option value="Professional Mentorship / Academic Discourse">Professional Mentorship & Discourse</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs uppercase tracking-[0.08em] font-medium text-slate-300 mb-1.5">
                      Executive Message / Proposal Outline <span className="text-[#B79A63]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-3.5 py-2.5 rounded-[4px] bg-[#0B121E] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-[#B79A63] transition-colors resize-none leading-relaxed"
                      placeholder="Outline the development scope, timeline, land parcel katha size, or strategic objective..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-[4px] bg-[#B79A63] hover:bg-[#CBB077] disabled:opacity-50 text-[#070C14] text-xs font-semibold uppercase tracking-wider transition-all min-h-[46px]"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Executive Dispatch...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Transmit Official Consultation Dispatch</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-400 text-center font-light pt-2">
                    Directly delivered to Engr. Abu Helal Rashid Reza&apos;s private executive repository.
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
