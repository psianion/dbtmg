//@ts-nocheck
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { fetchEntries } from "@/lib/contentfulClient";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import InvestorHero from "@/components/InvestorRelations/InvestorHero";
import InvestorHeading from "@/components/InvestorRelations/InvestorHeading";
import InvestorSections from "@/components/InvestorRelations/InvestorSections";

const Investor = () => {
  const [documents, setDocuments] = useState([]);
  const [activeSection, setActiveSection] = React.useState(
    "Financial Statements"
  );
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [availableYears, setAvailableYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const teams = [
    "Financial Statements",
    "Stock Exchange Communication",
    "Shareholder Information",
    "Codes & Policies",
    "Others",
    "Contact Details",
  ];

  const fetchPeople = async () => {
    try {
      const response = await fetchEntries("investorRelations");
      const data = response.map((item) => ({
        ...(item.fields.uploadDocumentType && {
          uploadDocumentType: item.fields.uploadDocumentType,
        }),
        ...(item.fields?.uploadDocumentTitle?.fields?.file?.url && {
          uploadDocument: `https:${item.fields.uploadDocumentTitle.fields.file.url}`,
        }),
        ...(item.fields.uploadType && { uploadType: item.fields.uploadType }),
        ...(item.fields.slug && { slug: item.fields.slug }),
        ...(item.fields.financialYear && {
          financialYear: item.fields.financialYear,
        }),
        ...(item.fields.reportPeriodicity && {
          reportPeriodicity: item.fields.reportPeriodicity,
        }),
        ...(item.fields.stockExchangeCommType && {
          stockExchangeCommType: item.fields.stockExchangeCommType,
        }),
      }));

      const groupedData = data.reduce((acc, data) => {
        const team = data.uploadType;
        if (!acc[team]) {
          acc[team] = [];
        }
        acc[team].push(data);
        return acc;
      }, {});

      // Extract all available financial years
      const years = [
        ...new Set(
          data
            .filter((item) => item.financialYear)
            .map((item) => item.financialYear)
            .sort((a, b) => {
              const aStart = parseInt(a.split("-")[0], 10);
              const bStart = parseInt(b.split("-")[0], 10);
              return bStart - aStart; // Descending order
            })
        ),
      ];
      setAvailableYears(years);

      setDocuments(groupedData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Filter documents based on selected year
  const getFilteredDocuments = () => {
    if (!documents[activeSection]) return [];

    if (selectedYear === "All Years") {
      return documents[activeSection];
    }

    return documents[activeSection].filter(
      (doc) => doc.financialYear === selectedYear
    );
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  if (loading) return <p>Loading About...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <Nav />
      <InvestorHero />
      <InvestorHeading
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Financial Year Filter Dropdown */}
      {availableYears.length > 0 && (
        <div className="w-[90%] lg:w-[1080px] mb-6">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-slate-600">
              Filter by Financial Year:
            </label>
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 border border-slate-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer hover:border-slate-400 transition-colors duration-200"
              >
                <option value="All Years">All Years</option>
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {documents && documents[activeSection].length ? (
        <InvestorSections
          section={getFilteredDocuments()}
          activeSection={activeSection}
        />
      ) : null}
      <Footer />
    </div>
  );
};

export default Investor;
