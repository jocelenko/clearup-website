/**
 * Single source of truth for contact details.
 *
 * These were previously hard-coded in four separate files, so a number
 * change meant four edits and a placeholder survived in the hero. Change
 * them here and every surface follows.
 */
export const CONTACT = {
  name: 'Sonia Alano',
  role: 'Business Development',

  /** As displayed on the page. */
  phoneDisplay: '0407 000 059',
  /** Digits only, for tel: links. */
  phoneTel: '0407000059',

  email: 'sonia@clear-up.com.au',

  /**
   * General business inbox. Quote submissions and privacy enquiries go
   * here, kept separate from Sonia's direct address on purpose.
   */
  officeEmail: 'admin@clear-up.com.au',

  websiteDisplay: 'clear-up.com.au',
  websiteUrl: 'https://clear-up.com.au',
} as const;
