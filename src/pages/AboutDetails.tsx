import AboutHero from "@/components/About/AboutHero";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import React from "react";
import { useParams } from "react-router-dom";
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

const AboutDetails = () => {
  const { slug } = useParams();
  const [details, setDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const fetchAboutDetails = async () => {
    if (!slug) return;

    try {
      const { data, error } = await supabase
        .from("executive_profiles")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Error fetching executive profile:", error);
        setLoading(false);
        return;
      }

      if (!data) {
        setLoading(false);
        return;
      }

      const mapped = {
        name: data.name,
        designation: data.designation,
        slug: data.slug,
        teamName: data.teamName,
        bio: data.shortDescription,
        image: data.profileImage,
      };

      console.log(mapped, "map");

      setDetails(mapped);
    } catch (error) {
      console.error("Unexpected error in fetchAboutDetails:", error);
    } finally {
      setLoading(false);
    }
  };

  // const fetchAboutDetails = async () => {
  //   try {
  //     const res = await fetchEntryBySlug('execProfiles', slug);
  //     const data = {
  //       name: res.fields.name,
  //       designation: res.fields.desc,
  //       slug: res.fields.slug,
  //       teamName: res.fields.teamName,
  //       //@ts-ignore
  //       bio: res.fields.description,
  //       image: `https:${res.fields.images[0].fields.file.url}`
  //     };
  //     setDetails(data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  React.useEffect(() => {
    fetchAboutDetails();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <Nav />
      <AboutHero />
      <div className="flex flex-col w-[90%] lg:w-[1080px]">
        <p className="font-[100] text-[40px] lg:text-[60px] mt-8">
          {details?.name}
        </p>
        <p className="text-[15px] font-medium">{details?.designation}</p>
        <div className="flex flex-col-reverse lg:flex-row gap-8 mt-8">
          <div className="w-full lg:w-[683px] text-[15px] font-light">
            <RichTextOrString
              value={details.bio}
              options={richTextOptions}
              className="text-[16px] text-black"
            />
          </div>
          <div
            style={{ backgroundImage: `url(${details.image})` }}
            className="w-[250px] h-[250px] bg-center bg-cover bg-no-repeat"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutDetails;
