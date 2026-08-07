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

  /**
   * Main business line, used in the header. Display form and a digits-only
   * form for tel: links.
   */
  phoneDisplay: '1300 301 860',
  phoneTel: '1300301860',

  /**
   * Sonia's direct mobile. Kept separate from the business line and used
   * where the contact is her personally, such as the footer block under her
   * name and the hero call button.
   */
  mobileDisplay: '0407 000 059',
  mobileTel: '0407000059',

  email: 'sonia@clear-up.com.au',

  /**
   * General business inbox. Quote submissions and privacy enquiries go
   * here, kept separate from Sonia's direct address on purpose.
   */
  officeEmail: 'admin@clear-up.com.au',

  websiteDisplay: 'clear-up.com.au',
  websiteUrl: 'https://clear-up.com.au',
} as const;
