import { Column } from "@/components/Dashboard/DataTable/types";
import { BoardMember } from "@/types/cms";

export const columns: Column<BoardMember>[] = [
  {
    key: "rank",
    header: "Rank",
    render: (row) => (
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
        {row.rank}
      </div>
    ),
  },
  {
    key: "profileImage",
    header: "Image",
    render: (row) => (
      <img
        src={row.profileImage}
        alt={row.name}
        className="h-12 w-12 rounded-lg object-cover border"
      />
    ),
  },
  {
    key: "name",
    header: "Name",
  },
  {
    key: "designation",
    header: "Designation",
  },
  {
    key: "category",
    header: "Category",
    render: (row) => (
      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium">
        {row.category}
      </span>
    ),
  },
];
