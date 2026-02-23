import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ExecutiveProfileForm } from "./form";
import { ExecutiveProfile } from "@/types/cms";
import { DataTable } from "@/components/Dashboard/DataTable/DataTable";
import { ConfirmDeleteDialog } from "@/components/Dashboard/modals/ConfirmDeleteDialog";
import { FormModal } from "@/components/Dashboard/modals/FormModal";
import { supabase } from "@/lib/supabase-client";
import { columns } from "./columns";
import { ExecutiveProfileFormValues } from "./schema";

export default function ExecutiveProfilesPage() {
  const [data, setData] = useState<ExecutiveProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ExecutiveProfile | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("executive_profiles")
      .select("*")
      .order("rank", { ascending: true });
    if (error) toast.error("Failed to load executive profiles.");
    else setData((data as ExecutiveProfile[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (values: ExecutiveProfileFormValues) => {
    setSaving(true);
    const payload = {
      rank: values.rank,
      name: values.name,
      slug: values.slug,
      designation: values.designation,
      teamName: values.teamName,
      shortDescription: values.shortDescription,
      profileImage: values.profileImage,
    };

    if (selected?.id) {
      const { error } = await supabase
        .from("executive_profiles")
        .update(payload)
        .eq("id", selected.id);
      if (error) { toast.error("Failed to update."); setSaving(false); return; }
      toast.success("Profile updated.");
    } else {
      const { error } = await supabase.from("executive_profiles").insert(payload);
      if (error) { toast.error("Failed to create."); setSaving(false); return; }
      toast.success("Profile added.");
    }
    setSaving(false);
    setFormOpen(false);
    fetchData();
  };

  const handleDelete = async () => {
    if (!selected?.id) return;
    const { error } = await supabase
      .from("executive_profiles")
      .delete()
      .eq("id", selected.id);
    if (error) toast.error("Failed to delete.");
    else { toast.success("Profile deleted."); fetchData(); }
    setDeleteOpen(false);
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Executive Profiles</h1>
        <button
          className="rounded-md bg-primary px-4 py-2 text-sm text-white"
          onClick={() => { setSelected(null); setFormOpen(true); }}
        >
          Add Profile
        </button>
      </div>

      <DataTable
        data={data}
        columns={columns}
        getRowId={(row) => row.id}
        loading={loading}
        searchKeys={["name", "designation", "teamName"]}
        searchPlaceholder="Search profiles…"
        onEdit={(row) => { setSelected(row); setFormOpen(true); }}
        onDelete={(row) => { setSelected(row); setDeleteOpen(true); }}
        emptyMessage="No executive profiles found."
      />

      <FormModal
        open={isFormOpen}
        title={selected ? "Edit Profile" : "Add Profile"}
        onClose={() => setFormOpen(false)}
      >
        <ExecutiveProfileForm
          defaultValues={selected ?? undefined}
          onSubmit={handleSubmit}
          isSubmitting={saving}
        />
      </FormModal>

      <ConfirmDeleteDialog
        open={isDeleteOpen}
        title="Delete Profile?"
        description={`Are you sure you want to delete "${selected?.name}"?`}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
