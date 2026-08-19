"use client";

import { useEffect, useRef, useState } from "react";

import { TextAreaField, TextField } from "@/components/ui/form-field";
import { SubmitButton } from "@/components/ui/submit-button";
import { site } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * The /contact enquiry form — posts to `app/api/contact/route.ts`, which
 * delivers it via Resend. See the TODO(client) there: nothing sends until
 * an API key is configured, which this surfaces as a plain error message
 * rather than a silent failure.
 *
 * Deliberately short: four inputs, one of them optional, and only one that
 * takes real thought to answer — every additional field on an enquiry form
 * is another reason to abandon it. Budget and "what do you need" were both
 * removed at the client's request for exactly that reason; scope, cost and
 * which service fits are what the first reply is *for*, so asking up front
 * extracts a decision from the visitor without telling us anything the
 * project description wouldn't.
 *
 * Two anti-spam checks travel with every submission: a honeypot field
 * (`website`, visually hidden, real visitors never touch it) and
 * `startedAt` (captured on mount, so the server can reject anything
 * answered faster than a person plausibly could). Both are enforced
 * server-side — this component's only job is to carry them along.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState("");

  // `Date.now()` is impure, so it can't be called during render (the React
  // Compiler flags it) — captured in an effect instead, which only ever
  // runs after mount, same timing `useRef(Date.now())` was aiming for.
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});
    setErrorMessage("");

    const data = new FormData(event.currentTarget);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      company: data.get("company"),
      message: data.get("message"),
      website: data.get("website"),
      startedAt: startedAt.current,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();

      if (res.ok) {
        setStatus("success");
        return;
      }

      setErrors(body.fields ?? {});
      setErrorMessage(body.error || "Something went wrong — please try again.");
      setStatus("error");
    } catch {
      setErrorMessage(
        `Couldn't reach the server — email us directly at ${site.email} instead.`,
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-100 flex-col justify-center border border-line-strong bg-surface p-8 md:p-12">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h3 className="mt-7 text-3xl font-black tracking-[-.03em] text-ink">
          Message sent.
        </h3>
        <p className="mt-3 max-w-sm leading-relaxed text-muted">
          That reached us — you&apos;ll hear back from a real person, not an
          autoresponder queue.
        </p>
        <button
          type="button"
          onClick={() => {
            formRef.current?.reset();
            startedAt.current = Date.now();
            setStatus("idle");
          }}
          className="group mt-8 self-start font-mono text-[11px] uppercase tracking-[.18em] text-accent-deep transition-colors hover:text-accent"
        >
          Send another
          <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="border border-line-strong bg-surface p-8 md:p-12"
    >
      {/* Honeypot: visually hidden, off the tab order, never `display:none`
          (some bots skip hidden fields specifically to look convincing —
          off-screen positioning is harder to distinguish from a real
          field). */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto">
        <label htmlFor="website">Leave this field empty</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-x-7 gap-y-9 sm:grid-cols-2">
        <TextField
          label="Name"
          name="name"
          id="contact-name"
          required
          autoComplete="name"
          placeholder="Your name"
          error={errors.name}
        />
        <TextField
          label="Email"
          name="email"
          id="contact-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          error={errors.email}
        />
        <TextField
          label="Company"
          name="company"
          id="contact-company"
          autoComplete="organization"
          placeholder="Optional"
          className="sm:col-span-2"
        />

        <TextAreaField
          label="Project"
          name="message"
          id="contact-message"
          required
          rows={4}
          placeholder="What are you building, and what does it need to do?"
          className="sm:col-span-2"
          error={errors.message}
          hint="A couple of sentences is plenty to start."
        />
      </div>

      <div className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-3">
        <SubmitButton pending={status === "submitting"}>
          Send message
        </SubmitButton>
        {status === "error" && (
          <p className="text-sm text-accent-deep">{errorMessage}</p>
        )}
      </div>
    </form>
  );
}
