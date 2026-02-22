import { Column } from "@/components/Dashboard/DataTable/types";
import { Relationship } from "@/types/cms";

export const columns: Column<Relationship>[] = [
  { key: "name", header: "Name" },
  {
    key: "images",
    header: "Images",
    render: (row) => (
      <div className="flex gap-1">
        {(row.images ?? []).slice(0, 3).map((url, i) => (
          <img key={i} src={url} alt={`img-${i}`} className="h-8 w-8 rounded-md object-cover border" />
        ))}
        {(row.images?.length ?? 0) > 3 && (
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
            +{(row.images?.length ?? 0) - 3}
          </span>
        )}
      </div>
    ),
  },
];
