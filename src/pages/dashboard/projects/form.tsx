import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MultiImageUpload } from "@/components/Dashboard/MultiImageUpload";
import { MarkdownField } from "@/components/Dashboard/MarkdownField";
import { ProjectFormValues, projectSchema } from "./schema";

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

interface Props {
  defaultValues?: Partial<ProjectFormValues>;
  onSubmit: (values: ProjectFormValues) => void;
  isSubmitting?: boolean;
}

export function ProjectForm({ defaultValues, onSubmit, isSubmitting }: Props) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      rank: defaultValues?.rank ?? 1,
      name: defaultValues?.name ?? "",
      slug: defaultValues?.slug ?? "",
      city: defaultValues?.city ?? "",
      area: defaultValues?.area,
      area_text: defaultValues?.area_text ?? "",
      short_desc: defaultValues?.short_desc ?? "",
      description: defaultValues?.description ?? "",
      images: defaultValues?.images ?? [],
      is_signature: defaultValues?.is_signature ?? false,
      location_lat: defaultValues?.location_lat,
      location_lon: defaultValues?.location_lon,
    },
  });

  const errors = form.formState.errors;
  const nameValue = form.watch("name");

  useEffect(() => {
    if (!defaultValues?.slug && nameValue) {
      form.setValue("slug", toSlug(nameValue));
    }
  }, [nameValue, defaultValues?.slug, form]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Rank</Label>
          <Input type="number" min={1} {...form.register("rank", { valueAsNumber: true })} />
          {errors.rank && <p className="text-xs text-destructive">{errors.rank.message}</p>}
        </div>
        <div className="space-y-1">
          <Label>City</Label>
          <Input placeholder="Mumbai" {...form.register("city")} />
          {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
        </div>
      </div>

      <div className="space-y-1">
        <Label>Name</Label>
        <Input placeholder="Project name" {...form.register("name")} />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-1">
        <Label>Slug</Label>
        <Input placeholder="url-slug" {...form.register("slug")} />
        {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Area (sq ft)</Label>
          <Input type="number" {...form.register("area", { valueAsNumber: true })} />
        </div>
        <div className="space-y-1">
          <Label>Area Text</Label>
          <Input placeholder="e.g. 2.5 acres" {...form.register("area_text")} />
        </div>
      </div>

      <div className="space-y-1">
        <Label>Short Description</Label>
        <Textarea placeholder="Brief summary" rows={3} {...form.register("short_desc")} />
      </div>

      <div className="space-y-1">
        <Label>Description</Label>
        <Controller
          control={form.control}
          name="description"
          render={({ field }) => (
            <MarkdownField value={field.value ?? ""} onChange={field.onChange} placeholder="Full description in Markdown…" height={180} />
          )}
        />
      </div>

      <div className="space-y-1">
        <Label>Images</Label>
        <Controller
          control={form.control}
          name="images"
          render={({ field }) => (
            <MultiImageUpload value={field.value ?? []} onChange={field.onChange} folder="projects" />
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Latitude</Label>
          <Input type="number" step="any" {...form.register("location_lat", { valueAsNumber: true })} />
        </div>
        <div className="space-y-1">
          <Label>Longitude</Label>
          <Input type="number" step="any" {...form.register("location_lon", { valueAsNumber: true })} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Controller
          control={form.control}
          name="is_signature"
          render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
        <Label>Signature Project</Label>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}
