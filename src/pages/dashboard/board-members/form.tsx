import { Input } from "@/components/ui/input";
import { BoardMemberFormValues, boardMemberSchema } from "./schema";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
    defaultValues,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Input
        type="number"
        placeholder="Rank"
        {...form.register("rank", { valueAsNumber: true })}
      />
      <Input placeholder="Name" {...form.register("name")} />
      <Input placeholder="Designation" {...form.register("designation")} />
      <Input placeholder="Category" {...form.register("category")} />

      <Textarea
        placeholder="Short Biography"
        rows={4}
        {...form.register("shortBiography")}
      />

      <Input
        placeholder="Profile Image URL"
        {...form.register("profileImage")}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
