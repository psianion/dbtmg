import { Column } from "@/components/Dashboard/DataTable/types";
import { NewsAward } from "@/types/cms";
import { Badge } from "@/components/ui/badge";

const typeColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  "In the News": "default",
  "Press Release": "secondary",
  "Video Coverage": "outline",
  "Awards": "destructive",
};

export const columns: Column<NewsAward>[] = [
  {
    key: "itemType",
    header: "Type",
    render: (row) => (
      <Badge variant={typeColors[row.itemType] ?? "outline"}>{row.itemType}</Badge>
    ),
  },
  { key: "title", header: "Title" },
  { key: "date", header: "Date" },
  { key: "publication", header: "Publication" },
  {
    key: "featuredOnHomePage",
    header: "Featured",
    render: (row) =>
      row.featuredOnHomePage ? (
        <Badge variant="default">Yes</Badge>
      ) : (
        <span className="text-muted-foreground text-xs">—</span>
      ),
  },
];
