import Divider from "@/components/Divider";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import PortfolioHero from "@/components/Portfolio/PortfolioHero";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { supabase } from "@/lib/supabase-client";
import { RichTextOrString } from "@/lib/helper";

const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => (
      <p className="mb-6 leading-relaxed">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_node, children) => (
      <h2 className="mt-8 mb-4 text-2xl font-semibold">{children}</h2>
    ),
    // …add more (lists, quotes, etc.) as needed
  },
};

const PortfolioDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  // const images = project?.fields.images.map((image) => image.fields.file.url);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProject = async () => {
    if (!slug) return;

    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Error fetching project:", error);
        setLoading(false);
        return;
      }

      if (!data) {
        setLoading(false);
        return;
      }

      let images: string[] = [];
      if (Array.isArray(data.images)) {
        images = data.images
          .map((img) =>
            typeof img === "string" ? img : img?.url || img?.image || ""
          )
          .filter(Boolean);
      } else if (typeof data.images === "string") {
        images = [data.images];
      }

      const mapped = {
        name: data.name,
        city: data.city,
        areaText: data.area_text,
        desc: data.short_desc,
        description: data.description,
        images,
      };

      setProject(mapped);
    } catch (err) {
      console.error("Unexpected error fetching project:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!project) return <p>Blog not found</p>;

  const images = project.images || [];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <Nav />
      <PortfolioHero />
      <div className="flex flex-col w-[90%] lg:w-[1080px] mt-10">
        <div
          onClick={() => navigate("/portfolio")}
          className="border-l-6 h-[25px] flex items-center border-solid pl-4 cursor-pointer text-lg border-red-600 text-red-600 font-semibold"
        >
          Portfolio.
        </div>
        <Divider width="400px" margin={5} />

        <div className="w-full flex flex-col items-end">
          <p className="font-light text-sm uppercase text-slate-600">
            {project.city}
          </p>
          {project.areaText && (
            <p className="font-light text-sm uppercase text-slate-600">
              {project.areaText}
            </p>
          )}
        </div>

        <p className="font-thin text-5xl lg:text-7xl text-slate-600 mb-2 mt-4 lg:mt-0">
          {project.name}
        </p>
        <p className="font-light text-lg text-slate-600 mb-8">{project.desc}</p>

        {images.length > 0 && (
          <div
            style={{
              backgroundImage: `url(${images[activeImage]})`,
            }}
            className="w-full h-[300px] lg:h-[520px] bg-center bg-cover bg-no-repeat mb-10"
          />
        )}

        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-[400px] flex items-start flex-wrap gap-2 h-fit">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => setActiveImage(index)}
                style={{ backgroundImage: `url(${image})` }}
                className={`w-[100px] h-[80px] bg-center bg-cover bg-no-repeat cursor-pointer ${
                  index === activeImage ? "border-2 border-red-600" : ""
                }`}
              />
            ))}
          </div>

          <div className="flex flex-col w-full lg:w-[680px] gap-2">
            <div className="font-light prose text-slate-600 mb-10">
              <RichTextOrString
                value={project.description}
                options={richTextOptions}
                className="font-lighttext-[16px] text-slate-500"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PortfolioDetails;
