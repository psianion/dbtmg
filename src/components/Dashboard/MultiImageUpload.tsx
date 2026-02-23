import { useRef, useState } from "react";
import { Upload, X, Plus, ImageIcon } from "lucide-react";
import { uploadToS3 } from "@/lib/s3-upload";
import { cn } from "@/lib/utils";

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
  className?: string;
}

export function MultiImageUpload({
  value = [],
  onChange,
  folder = "uploads",
  className,
}: MultiImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (files: FileList) => {
    const imageFiles = Array.from(files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (imageFiles.length === 0) {
      setError("Please select image files only.");
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const urls = await Promise.all(
        imageFiles.map((file) => uploadToS3(file, folder))
      );
      onChange([...value, ...urls]);
    } catch (err) {
      setError("Upload failed. Check your AWS credentials.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Image grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {value.map((url, i) => (
            <div key={i} className="relative aspect-square">
              <img
                src={url}
                alt={`Image ${i + 1}`}
                className="h-full w-full rounded-lg object-cover border border-border"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 rounded-full bg-destructive p-0.5 text-destructive-foreground shadow"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload area */}
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/30 p-4 text-center transition-colors",
          uploading
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:border-primary/50 hover:bg-muted/30"
        )}
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (!uploading) handleFiles(e.dataTransfer.files);
        }}
      >
        {uploading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            Uploading…
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Plus className="h-4 w-4" />
            Add images (select multiple)
          </div>
        )}
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {/* URL paste fallback */}
      <div className="flex items-center gap-2">
        <Upload className="h-3 w-3 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Or paste image URL and press Enter"
          className="h-7 w-full rounded-md border border-input bg-transparent px-2 text-xs outline-none focus:border-ring"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const val = (e.target as HTMLInputElement).value.trim();
              if (val) {
                onChange([...value, val]);
                (e.target as HTMLInputElement).value = "";
              }
            }
          }}
        />
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
