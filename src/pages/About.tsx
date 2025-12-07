//@ts-nocheck
import AboutHeading from "@/components/About/AboutHeading";
import AboutHero from "@/components/About/AboutHero";
import AboutMain from "@/components/About/AboutMain";
import LeadershipTeam from "@/components/About/LeadershipTeam";
import Partners from "@/components/About/Partners";
import Divider from "@/components/Divider";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { supabase } from "@/lib/supabase-client";
import React, { useEffect, useRef, useState } from "react";

const About = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const teamRef = useRef<HTMLDivElement>(null);
  const teams = [
    "Leadership Team",
    "Development Team",
    "Design Team",
    "Sales Team",
    "Liaison Team",
    "Legal Team",
    "Finance Team",
  ];

  const fetchPeople = async () => {
    try {
      const { data, error } = await supabase
        .from("executive_profiles")
        .select("*")
        .order("rank", { ascending: true });

      if (error) {
        console.error("Error fetching executive_profiles:", error);
        setLoading(false);
        return;
      }

      if (!data) {
        console.warn("No executive profiles found");
        setPeople([]);
        setLoading(false);
        return;
      }

      const mapped = data.map((item) => ({
        name: item.name,
        designation: item.designation,
        slug: item.slug,
        teamName: item.teamName,
        image: item.profileImage,
        desc: item.shortDescription,
        rank: item.rank,
      }));

      // Group by teamName
      const groupedData = mapped.reduce((acc, person) => {
        const team = person.teamName;
        if (!team) return acc; // skip if no team
        if (!acc[team]) acc[team] = [];
        acc[team].push(person);
        return acc;
      }, {} as Record<string, typeof mapped>);

      const orderedGroupedData = teams.map((teamName) => ({
        name: teamName,
        data: groupedData[teamName] || [],
      }));

      setPeople(orderedGroupedData);
    } catch (err) {
      console.error("Unexpected error in fetchPeople:", err);
    } finally {
      setLoading(false);
    }
  };

  // const fetchPeople = async () => {
  //   try {
  //     const response = await fetchEntries("execProfiles");
  //     const data = response.map((item) => {
  //       return {
  //         name: item.fields.name,
  //         designation: item.fields.desc,
  //         slug: item.fields.slug,
  //         teamName: item.fields.teamName,
  //         image: `https:${item.fields.images[0].fields.file.url}`,
  //         desc: item.fields.description.content.map(
  //           (el) => el.content[0].value
  //         ),
  //         rank: item.fields.rank,
  //       };
  //     });

  //     const sortedData = data.sort((a, b) => a.rank - b.rank);

  //     const groupedData = sortedData.reduce((acc, person) => {
  //       const team = person.teamName;
  //       if (!acc[team]) {
  //         acc[team] = [];
  //       }
  //       acc[team].push(person);
  //       return acc;
  //     }, {});

  //     const orderedGroupedData = teams.map((teamName) => ({
  //       name: teamName,
  //       data: groupedData[teamName] || [],
  //     }));

  //     setPeople(orderedGroupedData);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    fetchPeople();
  }, []);

  if (loading) return <p>Loading About...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <Nav />
      <AboutHero />
      <AboutHeading ref={teamRef} />
      <AboutMain />
      <Divider width={"1080px"} />
      {people.map((team, index) => {
        if (team.data.length) {
          return (
            <LeadershipTeam
              key={index}
              data={team.data}
              name={team.name}
              ref={index === 0 ? teamRef : null}
            />
          );
        }
      })}
      <Footer />
    </div>
  );
};

export default About;
