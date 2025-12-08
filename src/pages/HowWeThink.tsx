//@ts-nocheck
import { fetchEntries } from "@/lib/contentfulClient";
import { supabase } from "@/lib/supabase-client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HowWeThinkModal = ({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [data, setData] = useState(null);
  const [activeData, setActiveData] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const fetchHWT = async () => {
    try {
      const { data: rows, error } = await supabase
        .from("how_we_think")
        .select("*")
        .order("rank", { ascending: true });

      if (error) {
        console.error("Error fetching how_we_think:", error);
        setLoading(false);
        return;
      }

      if (!rows || rows.length === 0) {
        setData([]);
        setActiveData(null);
        setLoading(false);
        return;
      }

      const sortedData = rows.sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));

      setData(sortedData);
      setActiveData(sortedData[0]);
      setLoading(false);
    } catch (error) {
      console.error("Unexpected error in fetchHWT:", error);
      setLoading(false);
    }
  };

  // const fetchHWT = async () => {
  //   try {
  //     const response = await fetchEntries("howWeThink");
  //     const _data = response.map((item) => {
  //       return {
  //         quote: item.fields.quote,
  //         description: item.fields.description,
  //         slideName: item.fields.slideName,
  //         rank: item.fields.rank,
  //         quoteAttribution: item.fields.quoteAttribution,
  //         image: `https:${item.fields.sliderPic.fields.file.url}`,
  //       };
  //     });

  //     const sortedData = _data.sort((a, b) => a.rank - b.rank);
  //     setData(sortedData);
  //     setActiveData(sortedData[0]);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    fetchHWT();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-100">
      {data && (
        <div
          style={{
            backgroundImage: `url(${activeData.image})`,
          }}
          className="w-full h-screen p-6 flex justify-center bg-cover bg-center bg-no-repeat"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-black/40" />
          <div className="w-[1080px] h-full relative">
            <div
              onClick={() => {
                handleNavigation("/");
                setIsModalOpen(false);
              }}
              className="w-[200px] h-[75px] hover:bg-white/60 cursor-pointer  bg-[url(/DB_LOGO.webp)] bg-start bg-cover bg-no-repeat p-8"
            />
            <div className="w-full h-full flex flex-col p-4 text-white mt-10">
              <p className="text-[80px] font-[100] leading-[90px] w-[720px]">
                {activeData.quote}
              </p>
              <p>- {activeData.quoteAttribution}</p>
              <p className="text-[16px] font-[300] w-[500px] mt-10">
                {activeData.description}
              </p>
            </div>
            <div className="w-[1080px] h-8 fixed bottom-0 flex gap-1">
              {data.map((item, index) => (
                <div
                  onClick={() => setActiveData(item)}
                  key={index}
                  className={`w-[200px] h-8 cursor-pointer font-light flex items-center justify-center ${
                    item.slideName === activeData.slideName
                      ? "bg-black/40 text-white border border-white"
                      : "bg-white text-slate-600"
                  }`}
                >
                  {item.slideName}
                </div>
              ))}
              <div
                onClick={closeModal}
                className="w-[200px] h-8 bg-black/80 text-red-600 cursor-pointer font-light flex items-center justify-center"
              >
                Close
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HowWeThinkModal;
