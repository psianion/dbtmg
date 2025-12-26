"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Column } from "./types";

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  getRowId: (row: T) => string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  emptyMessage?: string;
}

export function DataTable<T>({
  data,
  columns,
  getRowId,
  onEdit,
  onDelete,
  emptyMessage = "No data available.",
}: DataTableProps<T>) {
  return (
    <Card className="overflow-hidden border-border py-0">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Header */}
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

          {/* Body */}
          <tbody className="divide-y divide-border">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-12 text-center text-sm text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={getRowId(row)}
                  className="hover:bg-muted/30 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key.toString()} className="px-6 py-4">
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
  );
}
