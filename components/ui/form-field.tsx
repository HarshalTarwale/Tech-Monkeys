"use client";

import type { ReactNode, TextareaHTMLAttributes } from "react";

/**
 * Shared visual for every /contact form control: a mono label, a borderless
 * input sitting on a hairline, and an accent underline that scales in from
 * the centre on focus — the site's existing hairline/mono-label language
 * (Eyebrow, the FAQ's bordered rows) applied to an input, rather than a
 * boxed-input style that would look like it arrived from a different site.
 *
 * Pure CSS via the `peer`/`group-has` variants — no JS, no motion library,
 * and the global `prefers-reduced-motion` rule already zeroes every
 * `transition-duration` on the page, so this needs no separate branch.
 */

function Frame({
  label,
  htmlFor,
  error,
  hint,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  /** Quiet helper text, shown only while there's no error to show instead. */
  hint?: string;
  /**
   * Grid placement for the field as a whole (e.g. `sm:col-span-2`) — kept
   * separate from the input's own class, which is fixed by `FIELD_CLASS`
   * and not caller-overridable. A shared `className` prop would otherwise
   * apply to whichever native element it landed on, not the grid cell.
   */
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`group/field relative ${className}`}>
      <label
        htmlFor={htmlFor}
        className="font-mono text-[10px] uppercase tracking-[.18em] text-faint transition-colors group-has-focus/field:text-accent-deep"
      >
        {label}
      </label>

      <div className="relative mt-2">
        {children}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-center scale-x-0 bg-accent transition-transform duration-300 ease-out peer-focus:scale-x-100"
        />
      </div>

      {/* Absolutely positioned into the grid gap below the field: an error
          appearing mid-form never pushes the remaining fields down, and no
          dead space is reserved under every field when there's nothing to
          say — which was leaving the form looking loose. */}
      {(error || hint) && (
        <p
          className={`absolute left-0 top-full mt-1.5 text-xs ${
            error ? "text-accent-deep" : "text-faint"
          }`}
        >
          {error || hint}
        </p>
      )}
    </div>
  );
}

const FIELD_CLASS =
  "peer w-full border-0 border-b border-line-strong bg-transparent py-2.5 text-lg text-ink outline-none transition-colors placeholder:text-faint focus:border-ink";

export function TextField({
  label,
  error,
  hint,
  className,
  ...props
}: {
  label: string;
  error?: string;
  hint?: string;
  /** Grid placement for the field, e.g. `sm:col-span-2`. */
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Frame
      label={label}
      htmlFor={props.id ?? props.name!}
      error={error}
      hint={hint}
      className={className}
    >
      <input {...props} className={FIELD_CLASS} />
    </Frame>
  );
}

export function TextAreaField({
  label,
  error,
  hint,
  className,
  ...props
}: {
  label: string;
  error?: string;
  hint?: string;
  /** Grid placement for the field, e.g. `sm:col-span-2`. */
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Frame
      label={label}
      htmlFor={props.id ?? props.name!}
      error={error}
      hint={hint}
      className={className}
    >
      <textarea {...props} className={`${FIELD_CLASS} resize-none`} />
    </Frame>
  );
}
