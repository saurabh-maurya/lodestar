'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import {
  AlertIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  SpinnerIcon,
} from './icons';
import { toast } from './toast';
import { Roll } from './ui';
import { rupees, type Program } from '@/lib/content/programs';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Shared submit-to-API-route behaviour for every form on the site, plus the
 * completion count behind the progress bar.
 *
 * Progress is read off the DOM rather than tracked in state per field: the
 * fields are uncontrolled, and querying `[required]` on input means the bar
 * needs no wiring at the call site and stays correct if a form gains or
 * loses a field. The honeypot is not required, so it is never counted.
 */
function useFormFlow(endpoint: string) {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  /** Bumped on each failed attempt; see the shake in motion.css. */
  const [shake, setShake] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const readProgress = useCallback(() => {
    const form = formRef.current;
    if (!form) return;
    const fields = Array.from(
      form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
        '[required]',
      ),
    );
    // A field only counts once it is actually valid — a half-typed email is
    // not progress, and a bar that says otherwise is lying.
    const done = fields.filter(
      (el) => el.value.trim() !== '' && el.checkValidity(),
    ).length;
    setProgress({ done, total: fields.length });
  }, []);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const onEdit = () => {
      readProgress();
      // Editing after a finished attempt starts a new one: the bar goes back
      // to counting, and a stale "Sent" or error message clears itself.
      setStatus((s) => (s === 'success' || s === 'error' ? 'idle' : s));
    };

    readProgress();
    form.addEventListener('input', onEdit);
    form.addEventListener('change', onEdit);
    return () => {
      form.removeEventListener('input', onEdit);
      form.removeEventListener('change', onEdit);
    };
  }, [readProgress]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus('submitting');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !body.ok) {
        throw new Error(body.error ?? 'Something went wrong.');
      }
      setStatus('success');
      setMessage('Thanks — we have your details and will be in touch.');
      // Three confirmations, each answering a different question. The button
      // says "your press landed", the note under the form says "here is what
      // happens next", and the toast survives the form being reset — which
      // is what makes an emptied form read as sent rather than as lost.
      toast('Sent. We have your details and will be in touch.');
      form.reset();
      // reset() fires no input event, so the bar has to be told to re-read.
      readProgress();
      // Clear the per-field ticks the reset just invalidated.
      form.dispatchEvent(new CustomEvent('form-reset-fields'));
    } catch (err) {
      const text =
        err instanceof Error
          ? err.message
          : 'We could not submit that. Please try again.';
      setStatus('error');
      setMessage(text);
      toast(text, { tone: 'error' });
      // One shake, keyed so a second failure re-triggers the animation
      // instead of the class sitting there already applied and doing nothing.
      setShake((n) => n + 1);
    }
  }

  return { status, message, onSubmit, formRef, progress, shake };
}

/**
 * How much of the form is filled in. Determinate while the user works,
 * indeterminate while the request is in flight, and full on success.
 */
function FormProgress({
  done,
  total,
  status,
}: {
  done: number;
  total: number;
  status: Status;
}) {
  if (total === 0) return null;

  const complete = status === 'success';
  const state =
    status === 'submitting'
      ? 'submitting'
      : complete
        ? 'complete'
        : 'filling';
  const fraction = complete ? 1 : done / total;

  const label = complete
    ? 'Sent'
    : status === 'submitting'
      ? 'Sending…'
      : `${done} of ${total} details complete`;

  return (
    <div className="progress" data-state={state}>
      <div
        className="progress__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={status === 'submitting' ? undefined : done}
        aria-valuetext={label}
        aria-label="Form completion"
      >
        <span
          className="progress__fill"
          style={{ '--progress': fraction } as React.CSSProperties}
          aria-hidden="true"
        />
      </div>
      <p className="progress__label">{label}</p>
    </div>
  );
}

/**
 * The submit control, through all four of its states.
 *
 * The label is the state: "Send me the free test" → "Sending…" → "Sent".
 * Its icon slot carries the same message a second time — arrow, spinner,
 * check — so the change is visible from the corner of the eye, and the
 * button never silently swaps meaning while holding the same shape.
 *
 * The width is left free to change with the label rather than pinned: these
 * are full-width block buttons, so it never actually does.
 */
function SubmitButton({
  status,
  idleLabel,
  busyLabel,
  doneLabel = 'Sent',
  variant = 'primary',
  arrow = false,
}: {
  status: Status;
  idleLabel: string;
  busyLabel: string;
  doneLabel?: string;
  variant?: 'primary' | 'navy';
  arrow?: boolean;
}) {
  const busy = status === 'submitting';
  const done = status === 'success';
  const label = busy ? busyLabel : done ? doneLabel : idleLabel;

  return (
    <button
      className={`btn btn--${variant} btn--block`}
      type="submit"
      // Only the in-flight state blocks a second press. A finished form is
      // still submittable — the user may have more than one child.
      disabled={busy}
      data-state={busy ? 'loading' : done ? 'success' : undefined}
      // Announces the wait without hijacking focus.
      aria-busy={busy}
    >
      {busy && <SpinnerIcon />}
      <Roll>{label}</Roll>
      {done && <CheckIcon className="btn__check" width={16} height={16} />}
      {arrow && !busy && !done && <ArrowRightIcon />}
    </button>
  );
}

function FormStatus({ status, message }: { status: Status; message: string }) {
  if (status !== 'success' && status !== 'error') return null;
  return (
    <p
      className="form-note"
      role="status"
      aria-live="polite"
      style={{
        color: status === 'error' ? '#c0392b' : 'var(--accent)',
        fontWeight: 600,
      }}
    >
      {message}
    </p>
  );
}

function Honeypot() {
  // Bots fill every field; humans never see this one.
  return (
    <div className="sr-only" aria-hidden="true">
      <label htmlFor="company-website">Leave this field empty</label>
      <input id="company-website" name="companyWebsite" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

function ChipRadios({
  name,
  legend,
  options,
  defaultValue,
}: {
  name: string;
  legend: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
      <legend className="field__label" style={{ marginBottom: 'var(--space-3)' }}>
        {legend}
      </legend>
      <div className="chip-group">
        {options.map((option) => (
          <label className="chip" key={option}>
            <input
              type="radio"
              name={name}
              value={option}
              defaultChecked={option === defaultValue}
            />
            {/* The check is laid out at zero width and grows when the chip is
                chosen, so selecting one widens it smoothly instead of the row
                snapping to a new set of widths. The fill already carries the
                state; the check makes it readable at a glance in a row where
                every chip is the same shape. */}
            <span>
              <CheckIcon className="chip__check" aria-hidden="true" />
              {option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * A single field, with its own answer to "is what I typed usable?".
 *
 * Validity is judged on blur, never on keystroke: an email address is
 * invalid for most of the time it takes to type one, and a field that turns
 * red at the second character is a field that is wrong more often than the
 * person filling it in. Once a field has been marked invalid it re-checks on
 * every keystroke, so the correction clears the moment it is made rather
 * than making the user leave the field again to be told they fixed it.
 */
/**
 * The phone rule, mirroring PHONE in lib/leads.ts.
 *
 * `type="tel"` carries no format constraint of its own, so without this the
 * browser calls "12" valid, the field ticks green, and the server is the one
 * that says no — after a round trip, on a form the user thought was done.
 * The pattern attribute moves that answer to the moment they leave the field.
 * If the server rule changes, this changes with it.
 *
 * The hyphen is escaped, and has to be: the browser compiles a `pattern` with
 * the RegExp `v` flag, under which a bare `-` after `\s` in a character class
 * is a syntax error. An invalid pattern is not an error the user ever sees —
 * the spec says to ignore it — so the unescaped version silently accepts
 * every value and the field only looks like it is being checked.
 */
const PHONE_PATTERN = '[+\\d][\\d\\s\\-]{7,17}';

function Input({
  name,
  placeholder,
  label,
  type = 'text',
  required = true,
  autoComplete,
  pattern,
  invalidMessage,
}: {
  name: string;
  placeholder: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  pattern?: string;
  /**
   * Shown instead of the browser's own text. A pattern mismatch otherwise
   * reports "Please match the requested format", which tells the user that
   * something is wrong and nothing about what would be right.
   */
  invalidMessage?: string;
}) {
  const [state, setState] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [error, setError] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  const check = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (el.value.trim() === '') {
      // Empty is not yet wrong — the progress bar is what tracks "not done".
      setState('idle');
      setError('');
      return;
    }
    if (el.checkValidity()) {
      setState('valid');
      setError('');
    } else {
      setState('invalid');
      setError(invalidMessage ?? el.validationMessage);
    }
  }, [invalidMessage]);

  // A successful submit resets the form; the ticks have to go with it.
  useEffect(() => {
    const form = ref.current?.form;
    if (!form) return;
    const clear = () => {
      setState('idle');
      setError('');
    };
    form.addEventListener('form-reset-fields', clear);
    return () => form.removeEventListener('form-reset-fields', clear);
  }, []);

  const errorId = `${name}-error`;

  return (
    <div
      className="field"
      data-valid={state === 'valid' || undefined}
      data-invalid={state === 'invalid' || undefined}
    >
      <label className="sr-only" htmlFor={name}>
        {label}
      </label>
      <input
        ref={ref}
        className="input"
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        pattern={pattern}
        onBlur={check}
        onInput={state === 'invalid' ? check : undefined}
        aria-invalid={state === 'invalid' || undefined}
        aria-describedby={state === 'invalid' ? errorId : undefined}
      />
      <CheckIcon className="field__tick" aria-hidden="true" />
      {state === 'invalid' && (
        <p className="field__error" id={errorId}>
          <AlertIcon />
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * A select, with the same blur-time validity treatment the text fields get.
 *
 * The placeholder is a disabled empty option rather than a real choice, so
 * "Select gender" can never be submitted as an answer — `required` rejects
 * an empty value, which is exactly what an untouched select still holds.
 */
function Select({
  name,
  label,
  placeholder,
  options,
  required = true,
}: {
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  required?: boolean;
}) {
  const [state, setState] = useState<'idle' | 'valid'>('idle');
  const ref = useRef<HTMLSelectElement>(null);

  const check = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setState(el.value ? 'valid' : 'idle');
  }, []);

  useEffect(() => {
    const form = ref.current?.form;
    if (!form) return;
    const clear = () => setState('idle');
    form.addEventListener('form-reset-fields', clear);
    return () => form.removeEventListener('form-reset-fields', clear);
  }, []);

  return (
    <div className="field" data-valid={state === 'valid' || undefined}>
      <label className="field__label" htmlFor={name}>
        {label}
      </label>
      <div className="select-wrap">
        <select
          ref={ref}
          className="input select"
          id={name}
          name={name}
          required={required}
          defaultValue=""
          onChange={check}
          onBlur={check}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="select-wrap__chevron" />
      </div>
    </div>
  );
}

/** A labelled text field — the registration form shows its labels. */
function LabelledInput({
  name,
  label,
  placeholder,
  type = 'text',
  required = true,
  autoComplete,
  pattern,
  invalidMessage,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  pattern?: string;
  invalidMessage?: string;
}) {
  return (
    <div className="field-group">
      <label className="field__label" htmlFor={name}>
        {label}
      </label>
      <Input
        name={name}
        label={label}
        placeholder={placeholder}
        type={type}
        required={required}
        autoComplete={autoComplete}
        pattern={pattern}
        invalidMessage={invalidMessage}
      />
    </div>
  );
}

function FormShell({
  title,
  lead,
  children,
  variant = '',
  shake = 0,
}: {
  title: string;
  lead?: ReactNode;
  children: ReactNode;
  variant?: string;
  /** Counter from useFormFlow; each increment is one failed attempt. */
  shake?: number;
}) {
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    if (shake === 0) return;
    // Toggled off and on rather than left applied: a CSS animation only
    // restarts when the attribute that selects it is removed and re-added,
    // so a second failure with the flag already set would show nothing.
    setShaking(true);
    const timer = window.setTimeout(() => setShaking(false), 360);
    return () => window.clearTimeout(timer);
  }, [shake]);

  return (
    <div
      className={`form-card ${variant}`.trim()}
      data-shake={shaking ? 'true' : undefined}
    >
      <div>
        <h2 className="h3">{title}</h2>
        {lead && <p className="body mt-3">{lead}</p>}
      </div>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------
   For Schools — institutional lead
   ---------------------------------------------------------------------- */
export function SchoolsInquiryForm() {
  const { status, message, onSubmit, formRef, progress, shake } =
    useFormFlow('/api/schools-inquiry');

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate={false}>
      <FormShell
        title="Request a consultation"
        variant="form-card--subtle"
        shake={shake}
      >
        <Honeypot />
        <FormProgress done={progress.done} total={progress.total} status={status} />
        <Input name="schoolName" label="School name" placeholder="School name" autoComplete="organization" />
        <Input
          name="contactName"
          label="Principal or coordinator name"
          placeholder="Principal / Coordinator name"
          autoComplete="name"
        />
        <Input name="city" label="City" placeholder="City" autoComplete="address-level2" />
        <Input
          name="phone"
          label="Phone"
          placeholder="Phone"
          type="tel"
          autoComplete="tel"
          pattern={PHONE_PATTERN}
          invalidMessage="Enter a phone number with 8–18 digits, e.g. +91 98765 43210."
        />
        <Input name="email" label="Email" placeholder="Email" type="email" autoComplete="email" />
        <Input
          name="studentStrength"
          label="Approximate student strength"
          placeholder="Approximate student strength (Grades 8–12)"
        />
        <ChipRadios
          name="preferredProgram"
          legend="Preferred grade levels"
          options={['Class 8', 'Class 9', 'Class 10', 'Class 11–12']}
        />
        <SubmitButton
          status={status}
          variant="navy"
          idleLabel="Schedule my consultation"
          busyLabel="Sending…"
          doneLabel="Request received"
        />
        <p className="form-note">
          We reply within one working day. No spam, ever. Your institutional
          brochure is emailed instantly on submit.
        </p>
        <FormStatus status={status} message={message} />
      </FormShell>
    </form>
  );
}

/* -------------------------------------------------------------------------
   Free assessment — primary conversion
   ---------------------------------------------------------------------- */
export function FreeAssessmentForm() {
  const { status, message, onSubmit, formRef, progress, shake } =
    useFormFlow('/api/free-assessment');

  return (
    <form ref={formRef} onSubmit={onSubmit}>
      <FormShell
        title="Start the free assessment"
        lead="Step 1 of 2 — we'll send the test link straight to your child."
        shake={shake}
      >
        <Honeypot />
        <FormProgress done={progress.done} total={progress.total} status={status} />
        <Input name="parentName" label="Parent name" placeholder="Parent name" autoComplete="name" />
        <Input
          name="mobile"
          label="Mobile number"
          placeholder="Mobile number"
          type="tel"
          autoComplete="tel"
          pattern={PHONE_PATTERN}
          invalidMessage="Enter a mobile number with 8–18 digits, e.g. +91 98765 43210."
        />
        <Input name="email" label="Email address" placeholder="Email address" type="email" autoComplete="email" />
        <Input name="studentName" label="Student name" placeholder="Student name" />
        <Input name="city" label="City" placeholder="City" autoComplete="address-level2" />
        <ChipRadios
          name="grade"
          legend="Current grade"
          options={['Class 8', 'Class 9', 'Class 10', 'Class 11–12']}
          defaultValue="Class 10"
        />
        <SubmitButton
          status={status}
          idleLabel="Send me the free test"
          busyLabel="Sending…"
          doneLabel="Test link on its way"
          arrow
        />
        <p className="form-note">
          By continuing you agree to our{' '}
          <a href="/legal/privacy-policy" style={{ textDecoration: 'underline' }}>
            Privacy Policy
          </a>
          . We never sell your data.
        </p>
        <FormStatus status={status} message={message} />
      </FormShell>
    </form>
  );
}

/* -------------------------------------------------------------------------
   Enrolment — the registration form behind "Register Now"
   ---------------------------------------------------------------------- */
export function EnrolmentForm({ program }: { program: Program }) {
  const { status, message, onSubmit, formRef, progress, shake } =
    useFormFlow('/api/enrol');

  return (
    <form ref={formRef} onSubmit={onSubmit} className="enrol">
      {/* What is being bought sits in its own column on the left, and stays
          there while the fields are filled. Stacked under the seven fields
          it pushed the total — the number the page turns on — below the fold
          on every laptop. */}
      <aside className="enrol__pay">
        <div className="pay">
          <p className="pay__title">Program &amp; payment details</p>

          <input type="hidden" name="programSlug" value={program.slug} />
          <input type="hidden" name="course" value={program.title} />
          <input type="hidden" name="grade" value={program.gradeLabel} />

          <dl className="pay__rows">
            <div>
              <dt>Grade</dt>
              <dd>{program.gradeLabel}</dd>
            </div>
            <div>
              <dt>Course</dt>
              <dd>{program.title}</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>{program.duration}</dd>
            </div>
          </dl>

          <div className="field-group">
            <label className="field__label" htmlFor="discountCode">
              Discount code
            </label>
            <Input
              name="discountCode"
              label="Discount code"
              placeholder="Enter code"
              required={false}
            />
          </div>

          <div className="pay__total">
            <span>Total amount</span>
            <strong>{rupees(program.amount)}</strong>
          </div>

          <p className="pay__note">
            You will not be charged on this screen. We confirm your slot and
            send a payment link by email within one working day.
          </p>
        </div>
      </aside>

      <FormShell title="Share your details" shake={shake}>
        <Honeypot />
        <FormProgress done={progress.done} total={progress.total} status={status} />

        {/* Two columns. Seven fields in a single stack made this form taller
            than a laptop screen on its own, which put the submit button —
            and the total beside it — permanently below the fold. Paired
            fields also read as pairs: the two names, then the two things we
            need to know about the student, then the two ways to reach the
            parent. */}
        <div className="enrol__grid">
        <LabelledInput
          name="parentName"
          label="Parent name"
          placeholder="Enter parent name"
          autoComplete="name"
        />
        <LabelledInput
          name="studentName"
          label="Student name"
          placeholder="Enter name"
        />
        <Select
          name="gender"
          label="Gender"
          placeholder="Select gender"
          options={['Female', 'Male', 'Other', 'Prefer not to say']}
        />
        <Select
          name="studentClass"
          label="Class"
          placeholder="Select class"
          options={['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12']}
        />
        <LabelledInput
          name="parentEmail"
          label="Parent email ID"
          placeholder="Enter email ID"
          type="email"
          autoComplete="email"
        />
        <LabelledInput
          name="parentMobile"
          label="Parent mobile no."
          placeholder="Enter mobile no."
          type="tel"
          autoComplete="tel"
          pattern={PHONE_PATTERN}
          invalidMessage="Enter a mobile number with 8–18 digits, e.g. +91 98765 43210."
        />
        <LabelledInput
          name="testEmail"
          label="Email ID for test link"
          placeholder="Enter email ID"
          type="email"
        />
        </div>

        <SubmitButton
          status={status}
          idleLabel={`Register and pay ${rupees(program.amount)}`}
          busyLabel="Submitting…"
          doneLabel="Registration received"
          arrow
        />
        <FormStatus status={status} message={message} />
      </FormShell>
    </form>
  );
}

/* -------------------------------------------------------------------------
   Contact — B2C callback request
   ---------------------------------------------------------------------- */
export function CallbackForm() {
  const { status, message, onSubmit, formRef, progress, shake } =
    useFormFlow('/api/contact');

  return (
    <form ref={formRef} onSubmit={onSubmit}>
      <FormShell
        title="Request a callback"
        lead="Tell us where you are in the decision and we'll call you back — usually the same working day."
        variant="form-card--tint"
        shake={shake}
      >
        <Honeypot />
        <FormProgress done={progress.done} total={progress.total} status={status} />
        <Input name="name" label="Your name" placeholder="Your name" autoComplete="name" />
        <Input
          name="phone"
          label="Phone number"
          placeholder="Phone number"
          type="tel"
          autoComplete="tel"
          pattern={PHONE_PATTERN}
          invalidMessage="Enter a phone number with 8–18 digits, e.g. +91 98765 43210."
        />
        <Input name="email" label="Email address" placeholder="Email address" type="email" autoComplete="email" />
        <Input
          name="grade"
          label="Student's current grade"
          placeholder="Student's current grade"
        />
        <div className="field">
          <label className="sr-only" htmlFor="topic">
            What would you like to discuss?
          </label>
          <textarea
            className="textarea"
            id="topic"
            name="topic"
            placeholder="What would you like to discuss?"
            required
          />
        </div>
        <SubmitButton
          status={status}
          idleLabel="Request my callback"
          busyLabel="Sending…"
          doneLabel="Callback requested"
        />
        <a className="arrow-row" href="/for-schools#inquiry" style={{ background: 'var(--bg-brand-soft)', color: 'var(--fg-on-soft)', fontWeight: 600 }}>
          Representing a school? Use the institutional form instead
          <ArrowRightIcon style={{ marginLeft: 'auto', color: 'currentColor' }} />
        </a>
        <FormStatus status={status} message={message} />
      </FormShell>
    </form>
  );
}
