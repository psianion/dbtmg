import { Column } from "@/components/Dashboard/DataTable/types";
import { Project } from "@/types/cms";
import { Badge } from "@/components/ui/badge";

export const columns: Column<Project>[] = [
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
    key: "images",
    header: "Image",
    width: "80px",
    render: (row) =>
      row.images?.[0] ? (
        <img
          src={row.images[0]}
          alt={row.name}
          className="h-10 w-16 rounded-lg object-cover border"
        />
      ) : (
        <div className="h-10 w-16 rounded-lg bg-muted" />
      ),
  },
  { key: "name", header: "Name" },
  { key: "city", header: "City" },
  {
    key: "is_signature",
    header: "Signature",
    render: (row) =>
      row.is_signature ? (
        <Badge variant="default">Signature</Badge>
      ) : (
        <Badge variant="outline">Standard</Badge>
      ),
  },
  { key: "slug", header: "Slug" },
];
