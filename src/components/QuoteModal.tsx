import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { X, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { useQuoteModal, type QuoteService } from '../context/QuoteModalContext';
import { useModalA11y } from '../hooks/useModalA11y';

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/admin@clear-up.com.au';

const serviceLabels: Record<Exclude<QuoteService, null>, string> = {
  window: 'Window Cleaning',
  retail: 'Retail & Commercial Cleaning (offices included)',
  periodical: 'Periodical Cleaning',
};

// Field config per service ------------------------------------------------
type FieldGroup = { name: string; label: string; options: string[]; allowOther?: boolean };

const windowGroups: FieldGroup[] = [
  { name: 'Type of Property', label: 'Type of Property', options: ['Retail shop', 'Office', 'Medical centre / clinic', 'Commercial building', 'Restaurant / café'], allowOther: true },
  { name: 'Window Cleaning Required', label: 'Window Cleaning Required', options: ['Internal windows', 'External windows', 'Shopfront glass', 'Glass doors', 'Mirrors', 'High windows', 'Frames and tracks', 'Screens'], allowOther: true },
  { name: 'Building Level', label: 'Building Level', options: ['Ground level only', '1–2 levels', '3+ levels', 'Access equipment may be required', 'Not sure'] },
  { name: 'Preferred Service', label: 'Preferred Service', options: ['One-off clean', 'Weekly', 'Fortnightly', 'Monthly', 'Quarterly'], allowOther: true },
  { name: 'Preferred Time', label: 'Preferred Time', options: ['Business hours', 'Before opening', 'After hours', 'Weekend', 'Flexible'] },
  { name: 'Access Information', label: 'Access Information', options: ['Easy street access', 'On-site parking available', 'Security access required', 'Site induction required'], allowOther: true },
];

const retailGroups: FieldGroup[] = [
  { name: 'Type of Site', label: 'Type of Site', options: ['Retail store', 'Office', 'Medical centre / clinic', 'Gym / fitness studio', 'Restaurant / café', 'Showroom', 'Childcare / education facility', 'Commercial building'], allowOther: true },
  { name: 'Areas to be Cleaned', label: 'Areas to be Cleaned', options: ['Reception / entry area', 'Offices', 'Meeting rooms', 'Retail floor', 'Kitchen / staff room', 'Toilets / bathrooms', 'Treatment rooms', 'Waiting area', 'Floors', 'Windows / glass', 'Rubbish removal'], allowOther: true },
  { name: 'Cleaning Frequency', label: 'Cleaning Frequency', options: ['Daily', '2–3 times per week', 'Weekly', 'Fortnightly', 'Monthly', 'One-off clean', 'Not sure yet'] },
  { name: 'Preferred Time', label: 'Preferred Time', options: ['Business hours', 'Before opening', 'After hours', 'Weekend', 'Flexible'] },
  { name: 'Approximate Site Size', label: 'Approximate Site Size', options: ['Small', 'Medium', 'Large', 'Multiple areas', 'Not sure'] },
  { name: 'Supplies Required', label: 'Supplies Required', options: ['Cleaning only', 'Cleaning plus consumables', 'Toilet paper', 'Hand towels', 'Soap', 'Bin liners'], allowOther: true },
  { name: 'Site Requirements', label: 'Site Requirements', options: ['Key access required', 'Alarm/security code required', 'Site induction required', 'Compliance or safety requirements', 'Parking available'], allowOther: true },
];

const periodicalGroups: FieldGroup[] = [
  { name: 'Periodical Cleaning Required', label: 'Periodical Cleaning Required', options: ['Deep cleaning', 'Carpet cleaning', 'Floor scrubbing', 'Floor polishing', 'Strip and seal floors', 'Pressure cleaning', 'High dusting', 'Tile and grout cleaning', 'Window cleaning', 'End-of-lease / vacate clean', 'Post-construction clean'], allowOther: true },
  { name: 'Type of Site', label: 'Type of Site', options: ['Retail store', 'Office', 'Medical centre / clinic', 'Commercial building', 'Restaurant / café', 'Industrial / warehouse'], allowOther: true },
  { name: 'When Do You Need the Service?', label: 'When Do You Need the Service?', options: ['As soon as possible', 'This week', 'This month', 'Scheduled maintenance', 'Before an inspection', 'Flexible'] },
  { name: 'Preferred Service Time', label: 'Preferred Service Time', options: ['Business hours', 'Before opening', 'After hours', 'Weekend', 'Flexible'] },
  { name: 'Frequency', label: 'Frequency', options: ['One-off service', 'Monthly', 'Quarterly', 'Every 6 months', 'Annually', 'Not sure yet'] },
  { name: 'Access and Site Information', label: 'Access and Site Information', options: ['Ground level access', 'Stairs', 'Lift access', 'Parking available', 'Site induction required', 'Security access required'], allowOther: true },
];

const groupsByService: Record<Exclude<QuoteService, null>, FieldGroup[]> = {
  window: windowGroups,
  retail: retailGroups,
  periodical: periodicalGroups,
};

// ------------------------------------------------------------------------

interface FormState {
  callBack: boolean;
  callBackPhone: string;
  photos: 'Yes' | 'No' | '';
  notes: string;
  name: string;
  business: string;
  email: string;
  phone: string;
  address: string;
  groups: Record<string, string[]>;
  others: Record<string, string>;
}

const emptyForm: FormState = {
  callBack: false,
  callBackPhone: '',
  photos: '',
  notes: '',
  name: '',
  business: '',
  email: '',
  phone: '',
  address: '',
  groups: {},
  others: {},
};

const DRAFT_KEY = 'clearup:quote-draft';

/** True once the visitor has typed or ticked anything worth protecting. */
function isDirty(form: FormState): boolean {
  return (
    form.callBack ||
    form.callBackPhone.trim() !== '' ||
    form.photos !== '' ||
    form.notes.trim() !== '' ||
    form.name.trim() !== '' ||
    form.business.trim() !== '' ||
    form.email.trim() !== '' ||
    form.phone.trim() !== '' ||
    form.address.trim() !== '' ||
    Object.values(form.groups).some((v) => v.length > 0) ||
    Object.values(form.others).some((v) => v.trim() !== '')
  );
}

export default function QuoteModal() {
  const { isOpen, preselected, closeQuote } = useQuoteModal();
  const [service, setService] = useState<QuoteService>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmDiscard, setConfirmDiscard] = useState(false);

  const dirty = isDirty(form);

  /*
    A misclick on the backdrop used to wipe a form that can run to 47
    checkboxes. Answers are now restored from a saved draft on open, and any
    dismissal while the form has content asks first.
  */
  useEffect(() => {
    if (!isOpen) return;
    setStatus('idle');
    setErrorMsg('');
    setConfirmDiscard(false);

    let restored = false;
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw) as { service: QuoteService; form: FormState };
        if (draft?.form) {
          setService(preselected ?? draft.service ?? null);
          setForm({ ...emptyForm, ...draft.form });
          restored = true;
        }
      }
    } catch {
      // Corrupt or unavailable storage just means no draft.
    }

    if (!restored) {
      setService(preselected ?? null);
      setForm(emptyForm);
    }
  }, [isOpen, preselected]);

  // Save on every change so an accidental dismissal loses nothing.
  useEffect(() => {
    if (!isOpen) return;
    try {
      if (dirty) sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ service, form }));
      else sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      // Storage full or blocked; the form still works, it just will not persist.
    }
  }, [isOpen, dirty, service, form]);

  const clearDraft = useCallback(() => {
    try {
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      /* nothing to do */
    }
  }, []);

  const requestClose = useCallback(() => {
    if (dirty && status !== 'success') {
      setConfirmDiscard(true);
      return;
    }
    clearDraft();
    closeQuote();
  }, [dirty, status, clearDraft, closeQuote]);

  const discardAndClose = useCallback(() => {
    clearDraft();
    setForm(emptyForm);
    setConfirmDiscard(false);
    closeQuote();
  }, [clearDraft, closeQuote]);

  const panelRef = useModalA11y({
    isOpen,
    onClose: requestClose,
    canClose: () => !confirmDiscard,
  });

  const groups = useMemo(() => (service ? groupsByService[service] : []), [service]);

  const toggleOption = (groupName: string, option: string) => {
    setForm((f) => {
      const current = f.groups[groupName] ?? [];
      const next = current.includes(option) ? current.filter((o) => o !== option) : [...current, option];
      return { ...f, groups: { ...f.groups, [groupName]: next } };
    });
  };

  const setOther = (groupName: string, value: string) => {
    setForm((f) => ({ ...f, others: { ...f.others, [groupName]: value } }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;
    setStatus('submitting');
    setErrorMsg('');

    const payload: Record<string, string> = {
      _subject: `New Quote Request: ${serviceLabels[service]}`,
      _template: 'table',
      'Service Requested': serviceLabels[service],
      'Call me back': form.callBack ? 'Yes' : 'No',
      ...(form.callBack && form.callBackPhone ? { 'Call-back phone': form.callBackPhone } : {}),
      'Would you like to upload photos?': form.photos || 'Not specified',
      'Additional Notes': form.notes,
      Name: form.name,
      'Business name': form.business,
      Email: form.email,
      Phone: form.phone,
      'Site address': form.address,
    };

    for (const group of groups) {
      const selected = form.groups[group.name] ?? [];
      const other = form.others[group.name]?.trim();
      const all = [...selected, ...(other ? [`Other: ${other}`] : [])];
      payload[group.name] = all.length ? all.join(', ') : 'Not specified';
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus('success');
      clearDraft();
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err?.message || 'Something went wrong. Please call us on 1300 123 456.');
    }
  };

  return (
    /* Conditional render, not AnimatePresence: see the note in Services.tsx.
       The exit animation left an invisible click-blocking overlay behind. */
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[60] bg-slate-900/70 backdrop-blur-sm flex items-start sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
          onClick={requestClose}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white w-full sm:max-w-2xl sm:rounded-2xl shadow-2xl my-0 sm:my-8 min-h-screen sm:min-h-0 sm:max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Discard confirmation, shown instead of losing a part-filled form */}
            {confirmDiscard && (
              <div className="absolute inset-0 z-10 bg-white/95 backdrop-blur-sm flex items-center justify-center p-6 sm:rounded-2xl">
                <div className="max-w-sm text-center">
                  <h3 className="text-xl font-display font-semibold text-primary-900 mb-2">
                    Discard this quote request?
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Your answers will be lost. They are saved while this tab stays open, so you can also keep editing and come back to it.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      type="button"
                      onClick={() => setConfirmDiscard(false)}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
                    >
                      Keep editing
                    </button>
                    <button
                      type="button"
                      onClick={discardAndClose}
                      className="text-slate-600 hover:text-slate-900 px-6 py-3 rounded-full font-medium border border-slate-200 transition-colors"
                    >
                      Discard
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-slate-100 flex-shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                {service && status !== 'success' && (
                  <button
                    type="button"
                    onClick={() => setService(null)}
                    className="text-slate-400 hover:text-primary-600 flex items-center justify-center w-11 h-11 -ml-2 flex-shrink-0 rounded-lg"
                    aria-label="Back"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <h2 id="quote-modal-title" className="text-lg sm:text-xl font-display font-semibold text-primary-900">
                  Request a Quote
                </h2>
              </div>
              <button
                type="button"
                onClick={requestClose}
                className="text-slate-400 hover:text-slate-700 flex items-center justify-center w-11 h-11 -mr-2 flex-shrink-0 rounded-lg"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto rounded-full bg-leaf-100 text-leaf-600 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-primary-900 mb-2">Thanks, we got it.</h3>
                  <p className="text-slate-600 mb-6 max-w-md mx-auto">
                    We will review your request and strive to contact you with a quote today.
                  </p>
                  <button
                    onClick={() => { clearDraft(); closeQuote(); }}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : !service ? (
                <div>
                  <p className="text-slate-700 mb-6">Please select the service you need a quote for:</p>
                  <div className="space-y-3">
                    {(Object.keys(serviceLabels) as Exclude<QuoteService, null>[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setService(key)}
                        className="w-full text-left p-5 rounded-xl border-2 border-slate-200 hover:border-primary-500 hover:bg-primary-50/40 transition-all flex items-center justify-between group"
                      >
                        <span className="font-medium text-primary-900">{serviceLabels[key]}</span>
                        <span className="text-primary-500 group-hover:translate-x-1 transition-transform">→</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500 mt-6">
                    Once you choose a service, the matching checklist will appear.
                  </p>
                </div>
              ) : (
                <form id="quote-form" onSubmit={handleSubmit} className="space-y-8">
                  <div className="bg-primary-50/60 border border-primary-100 rounded-xl px-4 py-3 text-sm text-primary-900">
                    <strong>Service:</strong> {serviceLabels[service]}
                  </div>

                  <label className="flex items-start gap-3 py-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.callBack}
                      onChange={(e) => setForm((f) => ({ ...f, callBack: e.target.checked }))}
                      className="mt-1 w-4 h-4 accent-primary-600"
                    />
                    <span className="text-sm text-slate-700">
                      Please call me back to discuss my quote request
                    </span>
                  </label>
                  {form.callBack && (
                    <input
                      type="tel"
                      placeholder="Phone number for call back"
                      value={form.callBackPhone}
                      onChange={(e) => setForm((f) => ({ ...f, callBackPhone: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none -mt-4"
                    />
                  )}

                  {groups.map((group) => (
                    <fieldset key={group.name} className="space-y-3">
                      <legend className="font-semibold text-primary-900">{group.label}</legend>
                      <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                        {group.options.map((opt) => {
                          const checked = (form.groups[group.name] ?? []).includes(opt);
                          return (
                            <label key={opt} className="flex items-start gap-2 py-2.5 cursor-pointer text-sm text-slate-700">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleOption(group.name, opt)}
                                className="mt-0.5 w-4 h-4 accent-primary-600"
                              />
                              <span>{opt}</span>
                            </label>
                          );
                        })}
                      </div>
                      {group.allowOther && (
                        <input
                          type="text"
                          placeholder="Other (please specify)"
                          value={form.others[group.name] ?? ''}
                          onChange={(e) => setOther(group.name, e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none text-sm"
                        />
                      )}
                    </fieldset>
                  ))}

                  <fieldset className="space-y-3">
                    <legend className="font-semibold text-primary-900">Would you like to upload photos?</legend>
                    <div className="flex gap-6">
                      {(['Yes', 'No'] as const).map((opt) => (
                        <label key={opt} className="flex items-center gap-2 py-2.5 text-sm text-slate-700 cursor-pointer">
                          <input
                            type="radio"
                            name="photos"
                            checked={form.photos === opt}
                            onChange={() => setForm((f) => ({ ...f, photos: opt }))}
                            className="w-4 h-4 accent-primary-600"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                    {form.photos === 'Yes' && (
                      <p className="text-xs text-slate-500">
                        Please email photos to <a className="text-primary-600 underline" href="mailto:admin@clear-up.com.au">admin@clear-up.com.au</a> after submitting.
                      </p>
                    )}
                  </fieldset>

                  <div>
                    <label className="block font-semibold text-primary-900 mb-2">Additional Notes</label>
                    <textarea
                      rows={4}
                      placeholder="Please include any important details about your site, access, timing or cleaning requirements."
                      value={form.notes}
                      onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                    />
                  </div>

                  <fieldset className="space-y-3">
                    <legend className="font-semibold text-primary-900">Your Details</legend>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input required type="text" placeholder="Full name *" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="px-4 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" />
                      <input type="text" placeholder="Business name" value={form.business} onChange={(e) => setForm((f) => ({ ...f, business: e.target.value }))} className="px-4 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" />
                      <input required type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="px-4 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" />
                      <input required type="tel" placeholder="Phone *" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="px-4 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none" />
                      <input type="text" placeholder="Site address" value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} className="px-4 py-2.5 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none sm:col-span-2" />
                    </div>
                  </fieldset>

                  {status === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                      {errorMsg}
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Footer */}
            {status !== 'success' && service && (
              <div className="border-t border-slate-100 px-6 py-4 flex-shrink-0">
                <button
                  type="submit"
                  form="quote-form"
                  disabled={status === 'submitting'}
                  className="w-full inline-flex justify-center items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-6 py-3 rounded-full font-medium transition-colors"
                >
                  {status === 'submitting' && <Loader2 className="w-4 h-4 animate-spin" />}
                  {status === 'submitting' ? 'Sending…' : 'Submit Quote Request'}
                </button>
                <p className="text-xs text-slate-500 text-center mt-3">
                  We will review your request and strive to contact you with a quote today.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
