"use client";

import React, { useState } from "react";
import { Mail, MapPin, Linkedin, Github, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import profileData from "@/data/profile.json";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const emailHref = profileData.personal.email.startsWith("[")
    ? `mailto:rufaidarishat@gmail.com`
    : `mailto:${profileData.personal.email}`;
  const githubHref = profileData.personal.github.replace(/^\[|\]$/g, "");
  const linkedinHref = profileData.personal.linkedin.replace(/^\[|\]$/g, "");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const endpoint = profileData.contact.formspreeEndpoint;
      
      // If default placeholder is untouched, simulate success smoothly in dev/demo
      if (endpoint.includes("YOUR_FORM_ID")) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsSubmitting(false);
        return;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const errorData = await res.json().catch(() => ({}));
        setSubmitStatus("error");
        setErrorMessage(
          errorData.error || "Unable to send your message. Please try again or email directly."
        );
      }
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage("Network error occurred. Please check your connection or email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedSection id="contact" className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={profileData.contact.eyebrow}
          title={profileData.contact.title}
          description={profileData.contact.description}
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <GlassCard className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2"
                    >
                      Name <span className="text-[#06B6D4]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Your Full Name"
                      className={`w-full px-4 py-3 rounded-xl bg-[#0A0A0F]/60 border text-white placeholder-[#64748B] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] transition-all ${
                        errors.name ? "border-rose-500/70" : "border-white/10 focus:border-[#7C3AED]"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2"
                    >
                      Email <span className="text-[#06B6D4]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="your.email@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-[#0A0A0F]/60 border text-white placeholder-[#64748B] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] transition-all ${
                        errors.email ? "border-rose-500/70" : "border-white/10 focus:border-[#7C3AED]"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2"
                  >
                    Subject <span className="text-[#06B6D4]">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="Inquiry or Project Topic"
                    className={`w-full px-4 py-3 rounded-xl bg-[#0A0A0F]/60 border text-white placeholder-[#64748B] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] transition-all ${
                      errors.subject ? "border-rose-500/70" : "border-white/10 focus:border-[#7C3AED]"
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2"
                  >
                    Message <span className="text-[#06B6D4]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Write your note or collaboration details..."
                    className={`w-full px-4 py-3 rounded-xl bg-[#0A0A0F]/60 border text-white placeholder-[#64748B] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] transition-all resize-none ${
                      errors.message ? "border-rose-500/70" : "border-white/10 focus:border-[#7C3AED]"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Feedback notices */}
                {submitStatus === "success" && (
                  <div className="p-4 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-sm flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Message sent successfully!</p>
                      <p className="text-xs text-[#10B981]/80 mt-0.5">
                        Thank you for reaching out. I will respond as soon as possible.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-sm flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Failed to send message</p>
                      <p className="text-xs text-rose-300/80 mt-0.5">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <GradientButton
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-w-[160px]"
                  icon={
                    isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )
                  }
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </GradientButton>
              </form>
            </GlassCard>
          </div>

          {/* Right Column: Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard className="p-6 sm:p-8">
              <h3 className="text-xl font-bold font-display text-white mb-6">
                Direct Contact Information
              </h3>

              <div className="space-y-5">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#06B6D4] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#64748B]">
                      Email
                    </span>
                    <p className="text-sm sm:text-base font-medium text-white hover:text-[#06B6D4] transition-colors mt-0.5">
                      <a href={emailHref}>
                        {profileData.personal.email}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#10B981] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#64748B]">
                      Location
                    </span>
                    <p className="text-sm sm:text-base font-medium text-white mt-0.5">
                      {profileData.contact.location}
                    </p>
                  </div>
                </div>

                {/* Availability with pulsing green indicator */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981]" />
                  </span>
                  <span className="text-sm font-medium text-[#10B981]">
                    {profileData.contact.availability}
                  </span>
                </div>
              </div>
            </GlassCard>

            {/* Social profiles card */}
            <GlassCard className="p-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#64748B] mb-4">
                Connect on Professional Platforms
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={linkedinHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#0A0A0F]/60 border border-white/10 hover:border-[#7C3AED]/50 hover:bg-[#1A1A2E] text-white text-sm font-medium transition-all"
                >
                  <Linkedin className="w-4 h-4 text-[#06B6D4]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={githubHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#0A0A0F]/60 border border-white/10 hover:border-[#7C3AED]/50 hover:bg-[#1A1A2E] text-white text-sm font-medium transition-all"
                >
                  <Github className="w-4 h-4 text-[#7C3AED]" />
                  <span>GitHub</span>
                </a>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
