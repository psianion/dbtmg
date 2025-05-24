//@ts-nocheck
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Code, FileText } from 'lucide-react';

const FinStatementSection = ({ data }) => {
  const [openAnnual, setOpenAnnual] = useState(false);
  const [openQuarterlyBlock, setOpenQuarterlyBlock] = useState(false);
  const [openQuarterly, setOpenQuarterly] = useState({});

  const grouped = data.reduce(
    (acc, item) => {
      if (item.reportPeriodicity === 'Quarterly') {
        if (!acc.Quarterly[item.financialYear]) {
          acc.Quarterly[item.financialYear] = [];
        }
        acc.Quarterly[item.financialYear].push(item);
      } else if (item.reportPeriodicity === 'Annual') {
        acc.Annually.push(item);
      }
      return acc;
    },
    { Quarterly: {}, Annually: [] }
  );

  const toggleAnnual = () => setOpenAnnual((prev) => !prev);
  const toggleQuarterlyBlock = () => setOpenQuarterlyBlock((prev) => !prev);
  const toggleQuarterly = (year) =>
    setOpenQuarterly((prev) => ({
      ...prev,
      [year]: !prev[year]
    }));

  return (
    <div className='flex flex-col w-full'>
      <div className='w-full border border-slate-200'>
        <div
          onClick={toggleQuarterlyBlock}
          className={`w-full flex items-center justify-between  px-4 py-2 border-b cursor-pointer ${
            openQuarterlyBlock ? 'bg-red-50' : ''
          }`}
        >
          <p
            className={`font-medium text-lg ${
              openQuarterlyBlock ? 'text-red-600' : 'text-slate-500'
            }`}
          >
            Quarterly
          </p>
          {openQuarterlyBlock ? (
            <ChevronUp className='w-4 h-4 text-red-600' />
          ) : (
            <ChevronDown className='w-4 h-4 text-slate-500' />
          )}
        </div>
        {openQuarterlyBlock && (
          <div className='w-full'>
            {Object.keys(grouped.Quarterly).length === 0 && (
              <p className='pl-4'>No quarterly reports.</p>
            )}
            {Object.entries(grouped.Quarterly).map(([year, items]) => (
              <div key={year} className='border-b px-4 py-2 mt-2'>
                <div
                  onClick={() => toggleQuarterly(year)}
                  className='w-full flex items-center justify-between cursor-pointer'
                >
                  <p
                    className={`font-light text-md ${
                      openQuarterly[year] ? 'text-red-600' : 'text-slate-500'
                    }`}
                  >
                    {year}
                  </p>
                  {openQuarterly[year] ? (
                    <ChevronUp className='w-4 h-4 text-red-600' />
                  ) : (
                    <ChevronDown className='w-4 h-4 text-slate-500' />
                  )}
                </div>
                {openQuarterly[year] && (
                  <div className='pl-2 pb-2 mt-2 flex flex-col gap-1'>
                    {items.map((item, idx) => (
                      <div
                        key={idx}
                        className={`py-1 w-full flex px-4 items-center cursor-pointer hover:bg-slate-100 transition-all duration-300 ease-in-out`}
                        onClick={() =>
                          window.open(item.uploadDocument, '_blank')
                        }
                      >
                        <p className='font-light text-slate-600'>
                          {item.uploadDocumentType}
                        </p>
                        <FileText className='w-4 h-4 ml-auto text-slate-600' />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='w-full border border-slate-200 mt-2'>
        <div
          onClick={toggleAnnual}
          className={`w-full flex items-center justify-between  px-4 py-2 border-b cursor-pointer ${
            openAnnual ? 'bg-red-50' : ''
          }`}
        >
          <p
            className={`font-medium text-lg ${
              openAnnual ? 'text-red-600' : 'text-slate-500'
            }`}
          >
            Annually
          </p>
          {openAnnual ? (
            <ChevronUp className='w-4 h-4 text-red-600' />
          ) : (
            <ChevronDown className='w-4 h-4 text-slate-500' />
          )}
        </div>
        {openAnnual && (
          <div className='pl-6 pr-4 pb-2 mt-2'>
            {grouped.Annually.length === 0 && <p>No annual reports.</p>}
            {grouped.Annually.map((item, idx) => (
              <div
                key={idx}
                className={`py-1 w-full flex px-4 items-center cursor-pointer hover:bg-slate-100 transition-all duration-300 ease-in-out`}
                onClick={() => window.open(item.uploadDocument, '_blank')}
              >
                <p className='font-light text-slate-600'>
                  {item.uploadDocumentType}
                </p>
                <FileText className='w-4 h-4 ml-auto text-slate-600' />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StockExchangeSection = ({ data }) => {
  const [open, setOpen] = useState({});

  // Group by stockExchangeCommType
  const grouped = data.reduce((acc, item) => {
    const type = item.stockExchangeCommType || 'Other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {});

  const toggle = (type) =>
    setOpen((prev) => ({
      ...prev,
      [type]: !prev[type]
    }));

  return (
    <div className='flex flex-col w-full'>
      {Object.entries(grouped).map(([type, items]) => (
        <div key={type} className='w-full border border-slate-200 mb-2'>
          <div
            onClick={() => toggle(type)}
            className={`w-full flex items-center justify-between px-4 py-2 border-b cursor-pointer ${
              open[type] ? 'bg-red-50' : ''
            }`}
          >
            <p
              className={`font-medium text-lg ${
                open[type] ? 'text-red-600' : 'text-slate-500'
              }`}
            >
              {type}
            </p>
            {open[type] ? (
              <ChevronUp className='w-4 h-4 text-red-600' />
            ) : (
              <ChevronDown className='w-4 h-4 text-slate-500' />
            )}
          </div>
          {open[type] && (
            <div className='pl-6 pr-4 pb-2 mt-2'>
              {items.length === 0 && <p>No documents.</p>}
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className='py-1 w-full flex px-4 items-center cursor-pointer hover:bg-slate-100 transition-all duration-300 ease-in-out'
                  onClick={() => window.open(item.uploadDocument, '_blank')}
                >
                  <p className='font-light text-slate-600'>
                    {item.uploadDocumentType}
                  </p>
                  <FileText className='w-4 h-4 ml-auto text-slate-600' />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const CodesPoliciesSection = ({ data }) => {
  return (
    <div className='w-full border border-slate-200'>
      <div className='px-4 py-2 border-b bg-slate-50'>
        <p className='font-medium text-lg text-slate-500'>Codes & Policies</p>
      </div>
      <div className='pl-6 pr-4 pb-2 mt-2'>
        {(!data || data.length === 0) && <p>No documents.</p>}
        {data &&
          data.map((item, idx) => (
            <div
              key={idx}
              className='py-1 w-full flex px-4 items-center cursor-pointer hover:bg-slate-100 transition-all duration-300 ease-in-out'
              onClick={() => window.open(item.uploadDocument, '_blank')}
            >
              <p className='font-light text-slate-600'>
                {item.uploadDocumentType}
              </p>
              <FileText className='w-4 h-4 ml-auto text-slate-600' />
            </div>
          ))}
      </div>
    </div>
  );
};

const OthersSection = ({ data }) => {
  return (
    <div className='w-full border border-slate-200'>
      <div className='px-4 py-2 border-b bg-slate-50'>
        <p className='font-medium text-lg text-slate-500'>Others</p>
      </div>
      <div className='pl-6 pr-4 pb-2 mt-2'>
        {(!data || data.length === 0) && <p>No documents.</p>}
        {data &&
          data.map((item, idx) => (
            <div
              key={idx}
              className='py-1 w-full flex px-4 items-center cursor-pointer hover:bg-slate-100 transition-all duration-300 ease-in-out'
              onClick={() => window.open(item.uploadDocument, '_blank')}
            >
              <p className='font-light text-slate-600'>
                {item.uploadDocumentType}
              </p>
              <FileText className='w-4 h-4 ml-auto text-slate-600' />
            </div>
          ))}
      </div>
    </div>
  );
};
const InvestorSections = ({ section, activeSection }) => {
  return (
    <div className='flex w-[1080px]'>
      <div className='w-[50%] flex flex-col gap-10 mb-10'>
        {activeSection === 'Financial Statements' && (
          <FinStatementSection data={section} />
        )}
        {activeSection === 'Stock Exchange Communication' && (
          <StockExchangeSection data={section} />
        )}
        {activeSection === 'Shareholder Information' && (
          <StockExchangeSection data={section} />
        )}
        {activeSection === 'Codes & Policies' && (
          <CodesPoliciesSection data={section} />
        )}
        {activeSection === 'Others' && <OthersSection data={section} />}
        {activeSection === 'Contact Details' && (
          <OthersSection data={section} />
        )}
      </div>
    </div>
  );
};

export default InvestorSections;
