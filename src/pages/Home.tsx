import Footer from "@/components/Footer";
import Hero from "@/components/Home/Hero";
import NewsSection from "@/components/Home/NewsSection";
import RecentProjectsSection from "@/components/Home/RecentProjectsSection";
import Nav from "@/components/Nav";

const Home = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-50">
      <Nav />
      <Hero />
      <RecentProjectsSection />
      <NewsSection />
      <Footer />
    </div>
  );
};

export default Home;
