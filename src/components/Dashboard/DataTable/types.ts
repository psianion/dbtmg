import { ReactNode } from "react";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  width?: string;
  render?: (row: T) => ReactNode;
}
