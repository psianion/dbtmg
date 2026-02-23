import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/Dashboard/ImageUpload";
import { MarkdownField } from "@/components/Dashboard/MarkdownField";
import { NewsAwardFormValues, newsAwardSchema } from "./schema";

const ITEM_TYPES = ["In the News", "Press Release", "Video Coverage", "Awards"];

function toSlug(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

interface Props {
  defaultValues?: Partial<NewsAwardFormValues>;
  onSubmit: (values: NewsAwardFormValues) => void;
  isSubmitting?: boolean;
}

export function NewsAwardForm({ defaultValues, onSubmit, isSubmitting }: Props) {
  const form = useForm<NewsAwardFormValues>({
    resolver: zodResolver(newsAwardSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      slug: defaultValues?.slug ?? "",
      date: defaultValues?.date ?? "",
      year: defaultValues?.year,
      publication: defaultValues?.publication ?? "",
      author: defaultValues?.author ?? "",
      itemType: defaultValues?.itemType ?? "",
      excerpt: defaultValues?.excerpt ?? "",
      detailText: defaultValues?.detailText ?? "",
      mediaUrl: defaultValues?.mediaUrl ?? "",
      hyperlink: defaultValues?.hyperlink ?? "",
      featuredOnHomePage: defaultValues?.featuredOnHomePage ?? false,
    },
  });

  const errors = form.formState.errors;
  const titleValue = form.watch("title");
  const dateValue = form.watch("date");

  useEffect(() => {
    if (!defaultValues?.slug && titleValue) {
      form.setValue("slug", toSlug(titleValue));
    }
  }, [titleValue, defaultValues?.slug, form]);

  useEffect(() => {
    if (dateValue) {
      const year = new Date(dateValue).getFullYear();
      if (!isNaN(year)) form.setValue("year", year);
    }
  }, [dateValue, form]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Type</Label>
          <Controller
            control={form.control}
            name="itemType"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {ITEM_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.itemType && <p className="text-xs text-destructive">{errors.itemType.message}</p>}
        </div>
        <div className="space-y-1">
          <Label>Date</Label>
          <Input type="date" {...form.register("date")} />
          {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
        </div>
      </div>

      <div className="space-y-1">
        <Label>Title</Label>
        <Input placeholder="Article or award title" {...form.register("title")} />
        {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-1">
        <Label>Slug</Label>
        <Input placeholder="url-slug" {...form.register("slug")} />
        {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Publication</Label>
          <Input placeholder="Times of India" {...form.register("publication")} />
        </div>
        <div className="space-y-1">
          <Label>Author</Label>
          <Input placeholder="Author name" {...form.register("author")} />
        </div>
      </div>

      <div className="space-y-1">
        <Label>Excerpt</Label>
        <Textarea placeholder="Short excerpt" rows={2} {...form.register("excerpt")} />
      </div>

      <div className="space-y-1">
        <Label>Detail Text</Label>
        <Controller
          control={form.control}
          name="detailText"
          render={({ field }) => (
            <MarkdownField value={field.value ?? ""} onChange={field.onChange} placeholder="Full content in Markdown…" height={180} />
          )}
        />
      </div>

      <div className="space-y-1">
        <Label>Media Image</Label>
        <Controller
          control={form.control}
          name="mediaUrl"
          render={({ field }) => (
            <ImageUpload value={field.value} onChange={field.onChange} folder="news-awards" />
          )}
        />
      </div>

      <div className="space-y-1">
        <Label>YouTube / External Link</Label>
        <Input placeholder="https://..." {...form.register("hyperlink")} />
      </div>

      <div className="flex items-center gap-3">
        <Controller
          control={form.control}
          name="featuredOnHomePage"
          render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
        <Label>Featured on Home Page</Label>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}
