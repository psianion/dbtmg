import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/Dashboard/ImageUpload";
import { HowWeThinkFormValues, howWeThinkSchema } from "./schema";

interface Props {
  defaultValues?: Partial<HowWeThinkFormValues>;
  onSubmit: (values: HowWeThinkFormValues) => void;
  isSubmitting?: boolean;
}

export function HowWeThinkForm({ defaultValues, onSubmit, isSubmitting }: Props) {
  const form = useForm<HowWeThinkFormValues>({
    resolver: zodResolver(howWeThinkSchema),
    defaultValues: {
      rank: defaultValues?.rank ?? 1,
      slideName: defaultValues?.slideName ?? "",
      quote: defaultValues?.quote ?? "",
      quoteAttribution: defaultValues?.quoteAttribution ?? "",
      description: defaultValues?.description ?? "",
      image: defaultValues?.image ?? "",
    },
  });

  const errors = form.formState.errors;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Rank</Label>
          <Input type="number" min={1} {...form.register("rank", { valueAsNumber: true })} />
          {errors.rank && <p className="text-xs text-destructive">{errors.rank.message}</p>}
        </div>
        <div className="space-y-1">
          <Label>Slide Name</Label>
          <Input placeholder="Slide title" {...form.register("slideName")} />
          {errors.slideName && <p className="text-xs text-destructive">{errors.slideName.message}</p>}
        </div>
      </div>

      <div className="space-y-1">
        <Label>Quote</Label>
        <Textarea placeholder="Pull quote text" rows={3} {...form.register("quote")} />
      </div>

      <div className="space-y-1">
        <Label>Quote Attribution</Label>
        <Input placeholder="— Person Name" {...form.register("quoteAttribution")} />
      </div>

      <div className="space-y-1">
        <Label>Description</Label>
        <Textarea placeholder="Supporting description" rows={3} {...form.register("description")} />
      </div>

      <div className="space-y-1">
        <Label>Slide Image</Label>
        <Controller
          control={form.control}
          name="image"
          render={({ field }) => (
            <ImageUpload value={field.value} onChange={field.onChange} folder="how-we-think" />
          )}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}
