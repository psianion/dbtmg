import Footer from '@/components/Footer';
import InvestorHero from '@/components/InvestorRelations/InvestorHero';
import Nav from '@/components/Nav';
import React from 'react';

const Section = ({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className='mb-8'>
    <h2 className='text-xl font-medium text-slate-600 mb-2'>{title}</h2>
    <div className='text-slate-500 font-light'>{children}</div>
  </section>
);

const TermsOfUse = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-50'>
      <Nav />
      <InvestorHero />
      <div className='flex flex-col w-[1080px]'>
        <h1 className='text-8xl text-slate-600 font-thin my-6'>
          Terms Of Use.
        </h1>
        <Section title='Legal Information and Terms of Use'>
          <p>
            All of the information provided in and through the website located
            at{' '}
            <a
              href='http://www.dbrealty.in'
              className='text-blue-600 underline'
            >
              http://www.dbrealty.in
            </a>{' '}
            (this "Web Site") is intended solely for general information.
          </p>
        </Section>

        <Section title='Scope of Use'>
          <p>
            Valor Estate Ltd. invites you to view the content for your personal
            informational, non-commercial use and requires that all copyright,
            trademark, and other proprietary rights notices remain intact.
          </p>
        </Section>

        <Section title='Rules of Conduct'>
          <ul className='list-disc pl-6 space-y-1'>
            <li>
              Use or reference this Web Site for illegal or malicious purposes,
              in violation of any applicable laws or regulations;
            </li>
            <li>
              E-mail or distribute any content that you do not have the right to
              transmit under any law or contractual or fiduciary relationships;
            </li>
            <li>
              Copy, sell, resell, or exploit any portion of this Web Site for
              commercial purposes;
            </li>
            <li>
              Distribute content that is unlawful, misleading, abusive,
              defamatory, or violates personal privacy rights;
            </li>
            <li>
              Forge headers or manipulate identifiers to disguise user identity
              or contact info;
            </li>
            <li>
              Decompile, disassemble, reverse engineer, or attempt to discover
              the source code;
            </li>
            <li>
              Assist or permit others in engaging in the above activities.
            </li>
          </ul>
        </Section>

        <Section title='External Links to the Site'>
          <p>
            All links to the Site must be approved in writing by VALOR ESTATE
            LIMITED. Approved links must:
          </p>
          <ul className='list-disc pl-6 space-y-1'>
            <li>
              Be text-only containing only the name "VALOR ESTATE LIMITED";
            </li>
            <li>Point only to www.dbrealty.in, not to deeper pages;</li>
            <li>Display the site in full-screen, not within a frame;</li>
            <li>
              Not imply sponsorship or false association with VALOR ESTATE
              LIMITED;
            </li>
            <li>Not damage or dilute VALOR ESTATE LIMITED’s goodwill.</li>
          </ul>
          <p>
            VALOR ESTATE LIMITED reserves the right to revoke link consent at
            any time.
          </p>
        </Section>

        <Section title='Copyright'>
          <p>
            This Web Site is protected by Indian and international copyright
            laws. You may not modify, display, reproduce, or distribute site
            content or layout without written permission.
          </p>
        </Section>

        <Section title='Trademarks'>
          <p>
            Unauthorized use of any VALOR ESTATE LIMITED trademarks, service
            marks, or logos may violate trademark laws.
          </p>
        </Section>

        <Section title='Reprint Policy'>
          <p>
            All VALOR ESTATE LIMITED images and content are copyrighted. Written
            approval is required for any usage.
          </p>
        </Section>

        <Section title='Modifications'>
          <p>
            VALOR ESTATE LIMITED may modify this Web Site and its terms at any
            time. Changes will be posted, and continued use implies acceptance
            of those changes.
          </p>
        </Section>

        <Section title='Violation of Rules and Regulations'>
          <p>
            VALOR ESTATE LIMITED reserves the right to seek all legal remedies
            for violations, including blocking access.
          </p>
        </Section>

        <Section title='Third-Party References'>
          <p>
            References to non-VALOR ESTATE LIMITED entities or services are
            informational only and do not imply endorsement.
          </p>
        </Section>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfUse;
