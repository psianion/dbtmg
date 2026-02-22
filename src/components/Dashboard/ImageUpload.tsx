import { useRef, useState } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { uploadToS3 } from "@/lib/s3-upload";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  folder = "uploads",
  className,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const url = await uploadToS3(file, folder);
      onChange(url);
    } catch (err) {
      setError("Upload failed. Check your AWS credentials.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {value ? (
        <div className="relative w-full">
          <img
            src={value}
            alt="Preview"
            className="h-40 w-full rounded-lg object-cover border border-border"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <div
          className={cn(
            "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/30 p-6 text-center transition-colors",
            uploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-primary/50 hover:bg-muted/30"
          )}
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {uploading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              Uploading…
            </div>
          ) : (
            <>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  <span className="text-primary">Click to upload</span> or drag & drop
                </p>
                <p className="text-xs text-muted-foreground">PNG, JPG, WebP up to 10MB</p>
              </div>
            </>
          )}
        </div>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {/* Manual URL fallback */}
      <div className="flex items-center gap-2">
        <Upload className="h-3 w-3 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Or paste image URL directly"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="h-7 w-full rounded-md border border-input bg-transparent px-2 text-xs outline-none focus:border-ring"
        />
      </div>
    </div>
  );
}
