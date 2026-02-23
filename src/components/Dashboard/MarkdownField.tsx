import MDEditor from "@uiw/react-md-editor";
import { cn } from "@/lib/utils";

interface MarkdownFieldProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
  className?: string;
}

export function MarkdownField({
  value = "",
  onChange,
  placeholder,
  height = 200,
  className,
}: MarkdownFieldProps) {
  return (
    <div className={cn("w-full", className)} data-color-mode="light">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val ?? "")}
        height={height}
        textareaProps={{ placeholder }}
        preview="edit"
        className="!rounded-md !border !border-input"
      />
    </div>
  );
}
