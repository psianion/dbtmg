import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/Dashboard/ImageUpload";
import { MarkdownField } from "@/components/Dashboard/MarkdownField";
import { ExecutiveProfileFormValues, executiveProfileSchema } from "./schema";

const TEAMS = [
  "Leadership Team",
  "Development Team",
  "Design Team",
  "Sales Team",
  "Liaison Team",
  "Legal Team",
  "Finance Team",
];

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

interface Props {
  defaultValues?: Partial<ExecutiveProfileFormValues>;
  onSubmit: (values: ExecutiveProfileFormValues) => void;
  isSubmitting?: boolean;
}

export function ExecutiveProfileForm({ defaultValues, onSubmit, isSubmitting }: Props) {
  const form = useForm<ExecutiveProfileFormValues>({
    resolver: zodResolver(executiveProfileSchema),
    defaultValues: {
      rank: defaultValues?.rank ?? 1,
      name: defaultValues?.name ?? "",
      slug: defaultValues?.slug ?? "",
      designation: defaultValues?.designation ?? "",
      teamName: defaultValues?.teamName ?? "",
      shortDescription: defaultValues?.shortDescription ?? "",
      profileImage: defaultValues?.profileImage ?? "",
    },
  });

  const errors = form.formState.errors;
  const nameValue = form.watch("name");

  // Auto-generate slug from name when creating new
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
          <Label>Team</Label>
          <Controller
            control={form.control}
            name="teamName"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  {TEAMS.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.teamName && <p className="text-xs text-destructive">{errors.teamName.message}</p>}
        </div>
      </div>

      <div className="space-y-1">
        <Label>Name</Label>
        <Input placeholder="Full name" {...form.register("name")} />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-1">
        <Label>Slug</Label>
        <Input placeholder="url-friendly-slug" {...form.register("slug")} />
        {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
      </div>

      <div className="space-y-1">
        <Label>Designation</Label>
        <Input placeholder="Job title" {...form.register("designation")} />
        {errors.designation && <p className="text-xs text-destructive">{errors.designation.message}</p>}
      </div>

      <div className="space-y-1">
        <Label>Short Description</Label>
        <Controller
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <MarkdownField
              value={field.value}
              onChange={field.onChange}
              placeholder="Write description in Markdown…"
              height={160}
            />
          )}
        />
        {errors.shortDescription && <p className="text-xs text-destructive">{errors.shortDescription.message}</p>}
      </div>

      <div className="space-y-1">
        <Label>Profile Image</Label>
        <Controller
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <ImageUpload value={field.value} onChange={field.onChange} folder="executive-profiles" />
          )}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}
