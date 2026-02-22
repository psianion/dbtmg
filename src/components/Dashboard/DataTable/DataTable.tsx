"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, Search } from "lucide-react";
import { Column } from "./types";

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  getRowId: (row: T) => string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  emptyMessage?: string;
  loading?: boolean;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
}

function TableSkeleton({ cols, rows = 5 }: { cols: number; rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-b border-border">
          {Array.from({ length: cols + 1 }).map((_, j) => (
            <td key={j} className="px-6 py-4">
              <div className="h-4 animate-pulse rounded bg-muted" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export function DataTable<T>({
  data,
  columns,
  getRowId,
  onEdit,
  onDelete,
  emptyMessage = "No data available.",
  loading = false,
  searchPlaceholder = "Search…",
  searchKeys = [],
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");

  const filtered =
    query.trim() && searchKeys.length > 0
      ? data.filter((row) =>
          searchKeys.some((key) =>
            String((row as any)[key] ?? "")
              .toLowerCase()
              .includes(query.toLowerCase())
          )
        )
      : data;

  return (
    <div className="space-y-3">
      {searchKeys.length > 0 && (
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      )}

      <Card className="overflow-hidden border-border py-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {columns.map((col) => (
                  <th
                    key={col.key.toString()}
                    className="px-6 py-4 text-left text-sm font-medium text-muted-foreground"
                    style={{ width: col.width }}
                  >
                    {col.header}
                  </th>
                ))}
                {(onEdit || onDelete) && (
                  <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {loading ? (
                <TableSkeleton cols={columns.length} />
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-6 py-12 text-center text-sm text-muted-foreground"
                  >
                    {query ? `No results for "${query}"` : emptyMessage}
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr
                    key={getRowId(row)}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    {columns.map((col) => (
                      <td key={col.key.toString()} className="px-6 py-4 text-sm">
                        {col.render ? col.render(row) : (row as any)[col.key]}
                      </td>
                    ))}
                    {(onEdit || onDelete) && (
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {onEdit && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => onEdit(row)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                          {onDelete && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => onDelete(row)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
