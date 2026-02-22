import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RelationshipForm } from "./form";
import { Relationship } from "@/types/cms";
import { DataTable } from "@/components/Dashboard/DataTable/DataTable";
import { ConfirmDeleteDialog } from "@/components/Dashboard/modals/ConfirmDeleteDialog";
import { FormModal } from "@/components/Dashboard/modals/FormModal";
import { supabase } from "@/lib/supabase-client";
import { columns } from "./columns";
import { RelationshipFormValues } from "./schema";

export default function RelationshipsPage() {
  const [data, setData] = useState<Relationship[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Relationship | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("relationships")
      .select("*")
      .order("name", { ascending: true });
    if (error) toast.error("Failed to load relationships.");
    else setData((data as Relationship[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (values: RelationshipFormValues) => {
    setSaving(true);
    const payload = { name: values.name, images: values.images };

    if (selected?.id) {
      const { error } = await supabase.from("relationships").update(payload).eq("id", selected.id);
      if (error) { toast.error("Failed to update."); setSaving(false); return; }
      toast.success("Relationship updated.");
    } else {
      const { error } = await supabase.from("relationships").insert(payload);
      if (error) { toast.error("Failed to create."); setSaving(false); return; }
      toast.success("Relationship added.");
    }
    setSaving(false);
    setFormOpen(false);
    fetchData();
  };

  const handleDelete = async () => {
    if (!selected?.id) return;
    const { error } = await supabase.from("relationships").delete().eq("id", selected.id);
    if (error) toast.error("Failed to delete.");
    else { toast.success("Relationship deleted."); fetchData(); }
    setDeleteOpen(false);
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Relationships</h1>
        <button
          className="rounded-md bg-primary px-4 py-2 text-sm text-white"
          onClick={() => { setSelected(null); setFormOpen(true); }}
        >
          Add Group
        </button>
      </div>

      <DataTable
        data={data}
        columns={columns}
        getRowId={(row) => row.id}
        loading={loading}
        searchKeys={["name"]}
        searchPlaceholder="Search relationships…"
        onEdit={(row) => { setSelected(row); setFormOpen(true); }}
        onDelete={(row) => { setSelected(row); setDeleteOpen(true); }}
        emptyMessage="No relationship groups found."
      />

      <FormModal
        open={isFormOpen}
        title={selected ? "Edit Relationship" : "Add Relationship"}
        onClose={() => setFormOpen(false)}
      >
        <RelationshipForm
          defaultValues={selected ?? undefined}
          onSubmit={handleSubmit}
          isSubmitting={saving}
        />
      </FormModal>

      <ConfirmDeleteDialog
        open={isDeleteOpen}
        title="Delete Relationship?"
        description={`Are you sure you want to delete "${selected?.name}"?`}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
