import { useEffect, useState } from "react";
import { toast } from "sonner";
import { HowWeThinkForm } from "./form";
import { HowWeThink } from "@/types/cms";
import { DataTable } from "@/components/Dashboard/DataTable/DataTable";
import { ConfirmDeleteDialog } from "@/components/Dashboard/modals/ConfirmDeleteDialog";
import { FormModal } from "@/components/Dashboard/modals/FormModal";
import { supabase } from "@/lib/supabase-client";
import { columns } from "./columns";
import { HowWeThinkFormValues } from "./schema";

export default function HowWeThinkPage() {
  const [data, setData] = useState<HowWeThink[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<HowWeThink | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("how_we_think")
      .select("*")
      .order("rank", { ascending: true });
    if (error) toast.error("Failed to load slides.");
    else setData((data as HowWeThink[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (values: HowWeThinkFormValues) => {
    setSaving(true);
    const payload = {
      rank: values.rank,
      slideName: values.slideName,
      quote: values.quote,
      quoteAttribution: values.quoteAttribution,
      description: values.description,
      image: values.image,
    };

    if (selected?.id) {
      const { error } = await supabase.from("how_we_think").update(payload).eq("id", selected.id);
      if (error) { toast.error("Failed to update."); setSaving(false); return; }
      toast.success("Slide updated.");
    } else {
      const { error } = await supabase.from("how_we_think").insert(payload);
      if (error) { toast.error("Failed to create."); setSaving(false); return; }
      toast.success("Slide added.");
    }
    setSaving(false);
    setFormOpen(false);
    fetchData();
  };

  const handleDelete = async () => {
    if (!selected?.id) return;
    const { error } = await supabase.from("how_we_think").delete().eq("id", selected.id);
    if (error) toast.error("Failed to delete.");
    else { toast.success("Slide deleted."); fetchData(); }
    setDeleteOpen(false);
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">How We Think</h1>
        <button
          className="rounded-md bg-primary px-4 py-2 text-sm text-white"
          onClick={() => { setSelected(null); setFormOpen(true); }}
        >
          Add Slide
        </button>
      </div>

      <DataTable
        data={data}
        columns={columns}
        getRowId={(row) => row.id}
        loading={loading}
        searchKeys={["slideName", "quoteAttribution"]}
        searchPlaceholder="Search slides…"
        onEdit={(row) => { setSelected(row); setFormOpen(true); }}
        onDelete={(row) => { setSelected(row); setDeleteOpen(true); }}
        emptyMessage="No slides found."
      />

      <FormModal
        open={isFormOpen}
        title={selected ? "Edit Slide" : "Add Slide"}
        onClose={() => setFormOpen(false)}
      >
        <HowWeThinkForm
          defaultValues={selected ?? undefined}
          onSubmit={handleSubmit}
          isSubmitting={saving}
        />
      </FormModal>

      <ConfirmDeleteDialog
        open={isDeleteOpen}
        title="Delete Slide?"
        description={`Are you sure you want to delete "${selected?.slideName}"?`}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
