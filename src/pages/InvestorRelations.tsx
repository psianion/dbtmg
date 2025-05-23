//@ts-nocheck
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { fetchEntries } from '@/lib/contentfulClient';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import InvestorHero from '@/components/InvestorRelations/InvestorHero';
import InvestorHeading from '@/components/InvestorRelations/InvestorHeading';
import InvestorSections from '@/components/InvestorRelations/InvestorSections';

const Investor = () => {
  const [documents, setDocuments] = useState([]);
  const [activeSection, setActiveSection] = React.useState(
    'Financial Statements'
  );
  const [loading, setLoading] = useState(true);
  const teams = [
    'Financial Statements',
    'Stock Exchange Communication',
    'Shareholder Information',
    'Codes & Policies',
    'Others',
    'Contact Details'
  ];

  const fetchPeople = async () => {
    try {
      const response = await fetchEntries('investorRelations');
      const data = response.map((item) => ({
        ...(item.fields.uploadDocumentType && {
          uploadDocumentType: item.fields.uploadDocumentType
        }),
        ...(item.fields?.uploadDocumentTitle?.fields?.file?.url && {
          uploadDocument: `https:${item.fields.uploadDocumentTitle.fields.file.url}`
        }),
        ...(item.fields.uploadType && { uploadType: item.fields.uploadType }),
        ...(item.fields.slug && { slug: item.fields.slug }),
        ...(item.fields.financialYear && {
          financialYear: item.fields.financialYear
        }),
        ...(item.fields.reportPeriodicity && {
          reportPeriodicity: item.fields.reportPeriodicity
        }),
        ...(item.fields.stockExchangeCommType && {
          stockExchangeCommType: item.fields.stockExchangeCommType
        })
      }));

      const groupedData = data.reduce((acc, data) => {
        const team = data.uploadType;
        if (!acc[team]) {
          acc[team] = [];
        }
        acc[team].push(data);
        return acc;
      }, {});

      //   const orderedGroupedData = teams.map((itemType) => ({
      //     name: itemType,
      //     data: groupedData[itemType] || []
      //   }));

      //   const orderedGroupedDataByYear = orderedGroupedData.reduce(
      //     (acc, item) => {
      //       const groupedDataByYear = item.data.reduce((acc, person) => {
      //         const year = person.year;
      //         if (!acc[year]) {
      //           acc[year] = [];
      //         }
      //         acc[year].push(person);
      //         return acc;
      //       }, {});

      //       const sortedYears = Object.keys(groupedDataByYear).sort(
      //         (a, b) => b - a
      //       );

      //       acc[item.name] = sortedYears.map((year) => ({
      //         year,
      //         data: groupedDataByYear[year]
      //       }));

      //       return acc;
      //     },
      //     {}
      //   );

      //   setNews(orderedGroupedDataByYear);
      console.log(groupedData);
      setDocuments(groupedData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  if (loading) return <p>Loading About...</p>;

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-50'>
      <Nav />
      <InvestorHero />
      <InvestorHeading
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      {documents && documents[activeSection].length ? (
        <InvestorSections
          section={documents[activeSection]}
          activeSection={activeSection}
        />
      ) : null}
      <Footer />
    </div>
  );
};

export default Investor;
