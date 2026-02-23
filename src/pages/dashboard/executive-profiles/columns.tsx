import { Column } from "@/components/Dashboard/DataTable/types";
import { ExecutiveProfile } from "@/types/cms";
import { Badge } from "@/components/ui/badge";

export const columns: Column<ExecutiveProfile>[] = [
  {
    key: "rank",
    header: "Rank",
    width: "60px",
    render: (row) => (
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
        {row.rank}
      </div>
    ),
  },
  {
    key: "profileImage",
    header: "Image",
    width: "80px",
    render: (row) =>
      row.profileImage ? (
        <img
          src={row.profileImage}
          alt={row.name}
          className="h-10 w-10 rounded-lg object-cover border"
        />
      ) : (
        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground">
          N/A
        </div>
      ),
  },
  { key: "name", header: "Name" },
  { key: "designation", header: "Designation" },
  {
    key: "teamName",
    header: "Team",
    render: (row) => (
      <Badge variant="secondary">{row.teamName}</Badge>
    ),
  },
  { key: "slug", header: "Slug" },
];
