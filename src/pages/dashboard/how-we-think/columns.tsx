import { Column } from "@/components/Dashboard/DataTable/types";
import { HowWeThink } from "@/types/cms";

export const columns: Column<HowWeThink>[] = [
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
    key: "image",
    header: "Image",
    width: "80px",
    render: (row) =>
      row.image ? (
        <img src={row.image} alt={row.slideName} className="h-10 w-16 rounded-lg object-cover border" />
      ) : (
        <div className="h-10 w-16 rounded-lg bg-muted" />
      ),
  },
  { key: "slideName", header: "Slide Name" },
  {
    key: "quote",
    header: "Quote",
    render: (row) => (
      <span className="line-clamp-1 max-w-xs text-muted-foreground">
        {row.quote || "—"}
      </span>
    ),
  },
  { key: "quoteAttribution", header: "Attribution" },
];
