import { DashboardCard } from "@/components/Dashboard/dashboardCard";
import { Users, Briefcase, Newspaper, Lightbulb, Link2 } from "lucide-react";

const dashboardSections = [
  {
    title: "Executive Profiles",
    description: "Manage leadership profiles",
    href: "/dashboard/executive-profiles",
    icon: Users,
  },
  {
    title: "Board Members",
    description: "Board of directors & advisors",
    href: "/dashboard/board-members",
    icon: Users,
  },
  {
    title: "Projects",
    description: "Real estate projects & details",
    href: "/dashboard/projects",
    icon: Briefcase,
  },
  {
    title: "News & Awards",
    description: "Press releases & awards",
    href: "/dashboard/news-awards",
    icon: Newspaper,
  },
  {
    title: "How We Think",
    description: "Thought leadership slides",
    href: "/dashboard/how-we-think",
    icon: Lightbulb,
  },
  {
    title: "Relationships",
    description: "Partners & affiliations",
    href: "/dashboard/relationships",
    icon: Link2,
  },
];

export default function DashboardHome() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">
          Manage all website content from one place
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {dashboardSections.map((section) => (
          <DashboardCard
            key={section.title}
            title={section.title}
            description={section.description}
            href={section.href}
            icon={section.icon}
          />
        ))}
      </div>
    </div>
  );
}
