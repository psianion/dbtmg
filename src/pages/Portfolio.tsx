//@ts-nocheck
import Divider from "@/components/Divider";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import PortfolioHeading from "@/components/Portfolio/PortfolioHeading";
import PortfolioHero from "@/components/Portfolio/PortfolioHero";
import RecentProjectsPortfolio from "@/components/Portfolio/RecentProjects";
import SignatureProjectsPortfolio from "@/components/Portfolio/SignatureProjects";
import React, { useEffect, useState } from "react";
import { fetchEntries } from "@/lib/contentfulClient";
import ProjectMap from "@/components/Map";
import { supabase } from "@/lib/supabase-client";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const recentRef = React.useRef<HTMLDivElement>(null);
  const signatureRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<HTMLDivElement>(null);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("rank", { ascending: true });

      if (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
        return;
      }

      if (!data) {
        console.warn("No projects found");
        setProjects([]);
        setLoading(false);
        return;
      }

      const mapped = data.map((item) => {
        return {
          name: item.name,
          city: item.city,
          slug: item.slug,
          area: item.area,
          image: item.images[0],
          isSignature: item.is_signature || false,
          location: item.location,
          areaText: item.area_text || "",
          rank: item.rank || 0,
        };
      });

      const sortedData = mapped.sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));

      setProjects(sortedData);
    } catch (error) {
      console.error("Unexpected error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  // const fetchProjects = async () => {
  //   try {
  //     const response = await fetchEntries("projects");
  //     const data = response.map((item) => {
  //       return {
  //         name: item.fields.name,
  //         city: item.fields.city,
  //         slug: item.fields.slug,
  //         area: item.fields.area,
  //         image: `https:${item.fields.images[0].fields.file.url}`,
  //         isSignature: item.fields.isSignatureProject || false,
  //         location: item.fields.location,
  //         areaText: item.fields.areaText || "",
  //         rank: item.fields.rank || 0,
  //       };
  //     });
  //     const sortedData = data.sort((a, b) => a.rank - b.rank);
  //     setProjects(sortedData);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  React.useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <Nav />
      <PortfolioHero />
      <PortfolioHeading
        recentRef={recentRef}
        signatureRef={signatureRef}
        mapRef={mapRef}
      />
      <RecentProjectsPortfolio projects={projects} ref={recentRef} />
      <Divider width={"1080px"} />
      <SignatureProjectsPortfolio projects={projects} ref={signatureRef} />
      <Divider width={"1080px"} />
      <div
        className="flex flex-col w-[90%] lg:w-[1080px] h-[680px] mb-10"
        ref={mapRef}
      >
        <h2 className="text-lg font-semibold text-slate-600 mb-6">
          Mumbai Experience Map.
        </h2>
        <ProjectMap projects={projects} />
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;
