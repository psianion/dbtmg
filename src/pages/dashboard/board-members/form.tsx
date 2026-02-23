import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { BoardMemberFormValues, boardMemberSchema } from "./schema";

const CATEGORIES = [
  "Founders",
  "Directors",
  "Independent Directors",
];

interface BoardMemberFormProps {
  defaultValues?: Partial<BoardMemberFormValues>;
  onSubmit: (values: BoardMemberFormValues) => void;
  isSubmitting?: boolean;
}

export function BoardMemberForm({
  defaultValues,
  onSubmit,
  isSubmitting,
}: BoardMemberFormProps) {
  const form = useForm<BoardMemberFormValues>({
    resolver: zodResolver(boardMemberSchema),
    defaultValues: {
      rank: defaultValues?.rank ?? 1,
      name: defaultValues?.name ?? "",
      designation: defaultValues?.designation ?? "",
      category: defaultValues?.category ?? "",
      shortBiography: defaultValues?.shortBiography ?? "",
      profileImage: defaultValues?.profileImage ?? "",
    },
  });

  const errors = form.formState.errors;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Rank</Label>
          <Input
            type="number"
            min={1}
            {...form.register("rank", { valueAsNumber: true })}
          />
          {errors.rank && <p className="text-xs text-destructive">{errors.rank.message}</p>}
        </div>
        <div className="space-y-1">
          <Label>Category</Label>
          <Controller
            control={form.control}
            name="category"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
        </div>
      </div>

      <div className="space-y-1">
        <Label>Name</Label>
        <Input placeholder="Full name" {...form.register("name")} />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-1">
        <Label>Designation</Label>
        <Input placeholder="Job title" {...form.register("designation")} />
        {errors.designation && <p className="text-xs text-destructive">{errors.designation.message}</p>}
      </div>

      <div className="space-y-1">
        <Label>Short Biography</Label>
        <Controller
          control={form.control}
          name="shortBiography"
          render={({ field }) => (
            <MarkdownField
              value={field.value}
              onChange={field.onChange}
              placeholder="Write biography in Markdown…"
              height={180}
            />
          )}
        />
        {errors.shortBiography && <p className="text-xs text-destructive">{errors.shortBiography.message}</p>}
      </div>

      <div className="space-y-1">
        <Label>Profile Image</Label>
        <Controller
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <ImageUpload
              value={field.value}
              onChange={field.onChange}
              folder="board-members"
            />
          )}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Saving…" : "Save"}
      </Button>
    </form>
  );
}
