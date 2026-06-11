import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <Link to="/" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          ← Back to home
        </Link>
        <h1 className="text-4xl sm:text-5xl font-display font-semibold text-primary-900 mt-6 mb-4">
          Privacy Policy
        </h1>
        <p className="text-slate-500 mb-12">Last updated: 28 May 2026</p>

        <div className="text-slate-700 space-y-6 leading-relaxed">
          <p>
            Clear Up Pty Ltd is committed to protecting your privacy and managing personal information in a responsible, transparent and secure way.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, store, disclose and protect personal information in accordance with the <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles (APPs).
          </p>
          <p>
            A copy of the Australian Privacy Principles is available from the Office of the Australian Information Commissioner at{' '}
            <a className="text-primary-600 underline" href="https://www.oaic.gov.au" target="_blank" rel="noreferrer">www.oaic.gov.au</a>.
          </p>

          <Section title="What is Personal Information?">
            <p>Personal information is information or an opinion that identifies, or could reasonably identify, an individual.</p>
            <p>The types of personal information we may collect include:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>names;</li>
              <li>business names;</li>
              <li>job titles;</li>
              <li>phone numbers;</li>
              <li>email addresses;</li>
              <li>addresses and service locations;</li>
              <li>enquiry, quote and client information;</li>
              <li>service records, cleaning reports and site notes;</li>
              <li>photos or records relating to service delivery, where required;</li>
              <li>payment or billing information;</li>
              <li>information submitted through our website, forms, emails, phone calls or app; and</li>
              <li>employment, contractor or job application information, where relevant.</li>
            </ul>
          </Section>

          <Section title="Why We Collect Personal Information">
            <p>We collect personal information so we can operate our business and provide our cleaning services effectively. This may include:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>responding to enquiries;</li>
              <li>preparing quotes and service proposals;</li>
              <li>delivering commercial cleaning services;</li>
              <li>managing client relationships;</li>
              <li>scheduling, tracking and reporting service delivery;</li>
              <li>communicating with clients, staff, contractors and suppliers;</li>
              <li>managing quality, safety and compliance requirements;</li>
              <li>processing payments and accounts;</li>
              <li>improving our services, website and systems; and</li>
              <li>sending relevant business updates or marketing communications, where permitted.</li>
            </ul>
            <p>You may unsubscribe from marketing communications at any time by contacting us in writing.</p>
          </Section>

          <Section title="Our Website and In-House App">
            <p>Clear Up Pty Ltd may collect information through our website, online forms and in-house app.</p>
            <p>
              Our app may be used to help streamline operations, track service delivery, support communication and provide reporting. Depending on how the app is used, this may include service records, task completion information, site notes, timestamps, photos, client requests or staff activity related to service delivery.
            </p>
            <p>
              We only collect information that is reasonably necessary for our business operations, service delivery, safety, reporting and client support.
            </p>
          </Section>

          <Section title="Sensitive Information">
            <p>
              Sensitive information includes information about matters such as health information, racial or ethnic origin, political opinions, religious beliefs, trade union membership, criminal record or biometric information.
            </p>
            <p>Clear Up Pty Ltd will only collect sensitive information where it is reasonably necessary for our business activities and:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>you have given consent;</li>
              <li>it is required or authorised by law; or</li>
              <li>another permitted exception applies under the Privacy Act.</li>
            </ul>
            <p>Sensitive information will only be used for the purpose for which it was collected, or for a directly related purpose where permitted by law.</p>
          </Section>

          <Section title="How We Collect Personal Information">
            <p>Where reasonable and practicable, we collect personal information directly from you. We may collect personal information when you:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>contact us by phone, email, website form or social media;</li>
              <li>request a quote or service;</li>
              <li>enter into a service agreement with us;</li>
              <li>use our app or online systems;</li>
              <li>provide information to our team during service delivery;</li>
              <li>apply for work with us; or</li>
              <li>communicate with us as a supplier, contractor or business contact.</li>
            </ul>
            <p>
              In some cases, we may receive personal information from third parties, such as clients, site managers, contractors, recruitment providers or service providers. Where appropriate, we will take reasonable steps to ensure you are aware of this.
            </p>
          </Section>

          <Section title="Disclosure of Personal Information">
            <p>We may disclose personal information where necessary for our business operations, including to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>employees, contractors and supervisors;</li>
              <li>clients or authorised site contacts;</li>
              <li>technology, software and app service providers;</li>
              <li>accountants, insurers, legal advisers or professional service providers;</li>
              <li>payment and administration providers;</li>
              <li>regulators, government agencies or authorities where required by law; and</li>
              <li>other third parties where you have consented or where disclosure is required or authorised by law.</li>
            </ul>
            <p><strong>We do not sell personal information.</strong></p>
          </Section>

          <Section title="Overseas Disclosure">
            <p>Some of our technology, software, cloud storage, website or app service providers may store or process information in Australia or overseas.</p>
            <p>Where we use third-party providers, we take reasonable steps to ensure personal information is handled securely and in accordance with applicable privacy obligations.</p>
          </Section>

          <Section title="Security of Personal Information">
            <p>We take reasonable steps to protect personal information from misuse, interference, loss, unauthorised access, modification or disclosure.</p>
            <p>This may include physical, electronic and administrative safeguards such as password protection, access controls, secure storage, staff training and limiting access to information to those who need it for business purposes.</p>
          </Section>

          <Section title="Data Breaches">
            <p>If a data breach occurs, we will take reasonable steps to contain and assess the incident.</p>
            <p>Where required by law, we will notify affected individuals and the Office of the Australian Information Commissioner in accordance with the Notifiable Data Breaches scheme.</p>
          </Section>

          <Section title="Retention of Personal Information">
            <p>We keep personal information for as long as it is reasonably necessary for the purpose for which it was collected, or as required by law.</p>
            <p>When personal information is no longer required, we will take reasonable steps to destroy it or permanently de-identify it.</p>
            <p>Business, client, financial and compliance records may be retained for a minimum period where required by law or for legitimate business purposes.</p>
          </Section>

          <Section title="Accessing or Correcting Your Personal Information">
            <p>You may request access to the personal information we hold about you. You may also ask us to correct information if you believe it is inaccurate, incomplete or out of date.</p>
            <p>To protect your privacy, we may require proof of identity before releasing or correcting personal information.</p>
            <p>We will not charge a fee for making an access request, but we may charge a reasonable administrative fee for providing copies of information where permitted by law.</p>
          </Section>

          <Section title="Quality of Personal Information">
            <p>We take reasonable steps to ensure the personal information we collect, use and disclose is accurate, complete and up to date.</p>
            <p>If you believe any information we hold about you is incorrect, please contact us so we can update our records.</p>
          </Section>

          <Section title="Website Links and Third Parties">
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices, content or security of those websites.</p>
            <p>We recommend that you review the privacy policies of any third-party websites you visit.</p>
          </Section>

          <Section title="Cookies and Analytics">
            <p>Our website may use cookies or analytics tools to help us understand website traffic, improve user experience and monitor website performance.</p>
            <p>You can adjust your browser settings to refuse cookies, although this may affect how some parts of the website function.</p>
          </Section>

          <Section title="Policy Updates">
            <p>This Privacy Policy may be updated from time to time. The latest version will be available on our website.</p>
          </Section>

          <Section title="Privacy Complaints and Enquiries">
            <p>If you have any questions, concerns or complaints about this Privacy Policy or how we handle personal information, please contact us:</p>
            <p>
              Clear Up Pty Ltd<br />
              Email: <a className="text-primary-600 underline" href="mailto:admin@clear-up.com.au">admin@clear-up.com.au</a>
            </p>
            <p>We will review and respond to privacy complaints within a reasonable time.</p>
            <p>
              If you are not satisfied with our response, you may contact the Office of the Australian Information Commissioner at{' '}
              <a className="text-primary-600 underline" href="https://www.oaic.gov.au" target="_blank" rel="noreferrer">www.oaic.gov.au</a>.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-display font-semibold text-primary-900 mt-10 mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
