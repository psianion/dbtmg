import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ProjectForm } from "./form";
import { Project } from "@/types/cms";
import { DataTable } from "@/components/Dashboard/DataTable/DataTable";
import { ConfirmDeleteDialog } from "@/components/Dashboard/modals/ConfirmDeleteDialog";
import { FormModal } from "@/components/Dashboard/modals/FormModal";
import { supabase } from "@/lib/supabase-client";
import { columns } from "./columns";
import { ProjectFormValues } from "./schema";

export default function ProjectsPage() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Project | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("rank", { ascending: true });
    if (error) toast.error("Failed to load projects.");
    else setData((data as Project[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (values: ProjectFormValues) => {
    setSaving(true);
    const payload = {
      rank: values.rank,
      name: values.name,
      slug: values.slug,
      city: values.city,
      area: values.area,
      area_text: values.area_text,
      short_desc: values.short_desc,
      description: values.description,
      images: values.images,
      is_signature: values.is_signature,
      location: values.location_lat != null && values.location_lon != null
        ? { lat: values.location_lat, lon: values.location_lon }
        : null,
    };

    if (selected?.id) {
      const { error } = await supabase.from("projects").update(payload).eq("id", selected.id);
      if (error) { toast.error("Failed to update."); setSaving(false); return; }
      toast.success("Project updated.");
    } else {
      const { error } = await supabase.from("projects").insert(payload);
      if (error) { toast.error("Failed to create."); setSaving(false); return; }
      toast.success("Project added.");
    }
    setSaving(false);
    setFormOpen(false);
    fetchData();
  };

  const handleDelete = async () => {
    if (!selected?.id) return;
    const { error } = await supabase.from("projects").delete().eq("id", selected.id);
    if (error) toast.error("Failed to delete.");
    else { toast.success("Project deleted."); fetchData(); }
    setDeleteOpen(false);
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <button
          className="rounded-md bg-primary px-4 py-2 text-sm text-white"
          onClick={() => { setSelected(null); setFormOpen(true); }}
        >
          Add Project
        </button>
      </div>

      <DataTable
        data={data}
        columns={columns}
        getRowId={(row) => row.id}
        loading={loading}
        searchKeys={["name", "city", "slug"]}
        searchPlaceholder="Search projects…"
        onEdit={(row) => { setSelected(row); setFormOpen(true); }}
        onDelete={(row) => { setSelected(row); setDeleteOpen(true); }}
        emptyMessage="No projects found."
      />

      <FormModal
        open={isFormOpen}
        title={selected ? "Edit Project" : "Add Project"}
        onClose={() => setFormOpen(false)}
      >
        <ProjectForm
          defaultValues={
            selected
              ? {
                  ...selected,
                  location_lat: selected.location?.lat,
                  location_lon: selected.location?.lon,
                }
              : undefined
          }
          onSubmit={handleSubmit}
          isSubmitting={saving}
        />
      </FormModal>

      <ConfirmDeleteDialog
        open={isDeleteOpen}
        title="Delete Project?"
        description={`Are you sure you want to delete "${selected?.name}"?`}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
