import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MultiImageUpload } from "@/components/Dashboard/MultiImageUpload";
import { RelationshipFormValues, relationshipSchema } from "./schema";

interface Props {
  defaultValues?: Partial<RelationshipFormValues>;
  onSubmit: (values: RelationshipFormValues) => void;
  isSubmitting?: boolean;
}

export function RelationshipForm({ defaultValues, onSubmit, isSubmitting }: Props) {
  const form = useForm<RelationshipFormValues>({
    resolver: zodResolver(relationshipSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      images: defaultValues?.images ?? [],
    },
  });

  const errors = form.formState.errors;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      <div className="space-y-1">
        <Label>Group Name</Label>
        <Input placeholder="e.g. Financial Partners" {...form.register("name")} />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-1">
        <Label>Partner Logos / Images</Label>
        <Controller
          control={form.control}
          name="images"
          render={({ field }) => (
            <MultiImageUpload value={field.value ?? []} onChange={field.onChange} folder="relationships" />
          )}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}
