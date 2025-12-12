import React, { useState } from "react";
import Divider from "../Divider";
import { supabase } from "@/lib/supabase-client";

const RelationshipsHeading = () => {
  const [activeSection, setActiveSection] = React.useState(
    "Financial Partners."
  );
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  const financeRef = React.useRef<HTMLDivElement>(null);
  const governmentRef = React.useRef<HTMLDivElement>(null);
  const developmentRef = React.useRef<HTMLDivElement>(null);
  const professionalRef = React.useRef<HTMLDivElement>(null);

  const fetchRelationships = async () => {
    try {
      const { data, error } = await supabase.from("relationships").select("*");

      if (error) {
        console.error("Error fetching relationships:", error);
        setLoading(false);
        return;
      }

      const mapped =
        (data ?? []).map((row) => {
          let images: string[] = [];

          if (Array.isArray(row.images)) {
            images = row.images
              .map((img) =>
                typeof img === "string" ? img : img?.url || img?.image || ""
              )
              .filter(Boolean);
          } else if (typeof row.images === "string") {
            images = [row.images];
          }

          return {
            name: row.name,
            images,
          };
        }) || [];

      setMedia(mapped);
    } catch (error) {
      console.error("Unexpected error fetching relationships:", error);
    } finally {
      setLoading(false);
    }
  };

  // const fetchProjects = async () => {
  //   try {
  //     const response = await fetchEntries("mediaDirectory");
  //     const data = response.map((item) => {
  //       return {
  //         name: item.fields.name,
  //         //@ts-ignore
  //         images: item.fields.imageName.map(
  //           (el) => `https:${el.fields?.file?.url}`
  //         ),
  //       };
  //     });
  //     setMedia(data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  React.useEffect(() => {
    fetchRelationships();
  }, []);

  const sections = [
    "Financial Partners.",
    "Government Partners.",
    "Development Partners.",
    "Professional Affiliations.",
  ];

  const data = [
    {
      name: "Financial Partners.",
      description:
        "Valor collaborates closely with both equity and debt investors to ensure optimal project capitalization in line with prevailing market dynamics. This strategic approach drives superior financial outcomes while also elevating the quality of life for tenants and contributing positively to surrounding communities. Notable financial partners include Axis Bank, Yes Bank, JC Flowers, Edelweiss, and Kotak Mahindra Bank.",
      images:
        media?.find((item) => item.name === "Financial Partners")?.images || [],
      names: 0,
      ref: financeRef,
    },
    {
      name: "Government Partners.",
      description:
        "Valor has executed projects across five or more cities within every major county neighborhood of the Mumbai Metropolitan Region. Our approach emphasizes close collaboration with local government bodies to address complex development challenges and respond to the distinct needs of each community we serve. We are proud to partner with key public sector agencies including the Maharashtra Housing and Area Development Authority (MHADA), Slum Rehabilitation Authority (SRA), City and Industrial Development Corporation of Maharashtra Ltd. (CIDCO), Delhi Development Authority (DDA), and the Government of Maharashtra.",
      images:
        media?.find((item) => item.name === "Government Partners")?.images ||
        [],
      names: 0,
      ref: governmentRef,
    },
    {
      name: "Development Partners.",
      description:
        "Valor partners with some of India's leading real estate developers and financial institutions to drive high-impact joint ventures. These collaborations have consistently delivered superior investment returns for our equity capital partners while setting new benchmarks in project execution and value creation. Our esteemed partners include Prestige Estates Projects Ltd., Godrej Properties Ltd., L&T Realty, and Macrotech Developers Ltd. (Lodha).",
      images:
        media?.find((item) => item.name === "Development Partners")?.images ||
        [],
      names: 0,
      ref: developmentRef,
    },
    {
      name: "Professional Affiliations.",
      description:
        "Valor's management team is actively involved in a diverse range of local and national professional associations.",
      images:
        media?.find((item) => item.name === "Professional Affiliations")
          ?.images || [],
      names: 0,
      ref: professionalRef,
    },
  ];

  const handleScrollToSection = (section: string) => {
    setActiveSection(section);
    if (section === "Financial Partners." && financeRef.current) {
      financeRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (section === "Government Partners." && governmentRef.current) {
      governmentRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (section === "Development Partners." && developmentRef.current) {
      developmentRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (section === "Professional Affiliations." && professionalRef.current) {
      professionalRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return <div>Loading Relationships...</div>;
  }
  return (
    <div className="flex flex-col w-[90%] lg:w-[1080px]">
      <h1 className="text-6xl lg:text-8xl text-slate-600 font-thin my-6">
        Relationships.
      </h1>
      <div className="w-full flex flex-col-reverse lg:flex-row gap-5 justify-between">
        <div className="flex flex-col gap-1">
          {sections.map((section) => (
            <div
              onClick={() => handleScrollToSection(section)}
              className={`border-l-6 h-[25px] flex items-center border-solid pl-4 cursor-pointer text-lg ${
                activeSection === section
                  ? "border-red-600 text-red-600 font-semibold"
                  : "border-slate-400 text-slate-600 font-light"
              }`}
              key={section}
            >
              {section}
            </div>
          ))}
        </div>
        <p className="w-[400px] text-right text-sm font-light text-red-600 leading-4 uppercase">
          VALOR STRUCTURES PARTNERSHIPS FOR EACH TRANSACTION TO ADDRESS SPECIFIC
          COMMUNITY, INVESTOR AND END‑USER NEEDS.
        </p>
      </div>
      <div className="w-[200px] lg:w-[400px]">
        <Divider />
      </div>
      <div className="flex flex-col w-full mb-10 text-slate-600">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col gap-4" ref={item.ref}>
            <p className="text-lg font-semibold ">{item.name}</p>
            <p className="text-sm font-light leading-5">{item.description}</p>
            <div className="flex gap-4 flex-wrap justify-center">
              {/* {item.name === "Professional Affiliations." &&
                item.images.map((_, index) => (
                  <div
                    style={{
                      backgroundImage: `url(${item.images[index]})`,
                    }}
                    className="w-[180px] lg:w-[200px] h-[100px] bg-center bg-contain bg-no-repeat"
                  />
                ))} */}
            </div>
            {/* <div className='flex flex-wrap'>
              {[...Array(item.names)].map((_, index) => (
                <p className='w-[250px] text-sm font-light leading-5'>
                  Something
                </p>
              ))}
            </div> */}
            {index < data.length - 1 ? <Divider /> : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelationshipsHeading;
