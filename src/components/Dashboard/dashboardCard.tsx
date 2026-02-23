import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export function DashboardCard({
  title,
  description,
  href,
  icon: Icon,
}: DashboardCardProps) {
  return (
    <Card className="group transition hover:shadow-md p-0">
      <CardContent className="flex h-full flex-col justify-between p-4 w-[300px]">
        <div className="flex gap-4 w-fit">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
            <Icon className="h-5 w-5 text-slate-700" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>

            <p className="text-sm text-slate-500">{description}</p>
          </div>
        </div>

        <Button asChild variant="outline" className="mt-6 w-fit">
          <Link to={href}>Manage</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
