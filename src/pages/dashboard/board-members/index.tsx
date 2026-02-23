import { useEffect, useState } from "react";
import { toast } from "sonner";

import { BoardMemberForm } from "./form";
import { BoardMember } from "@/types/cms";
import { DataTable } from "@/components/Dashboard/DataTable/DataTable";
import { ConfirmDeleteDialog } from "@/components/Dashboard/modals/ConfirmDeleteDialog";
import { FormModal } from "@/components/Dashboard/modals/FormModal";
import { supabase } from "@/lib/supabase-client";
import { columns } from "./column";
import { BoardMemberFormValues } from "./schema";

export default function BoardMembersPage() {
  const [data, setData] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<BoardMember | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("board_members")
      .select("*")
      .order("rank", { ascending: true });
    if (error) toast.error("Failed to load board members.");
    else setData((data as BoardMember[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (values: BoardMemberFormValues) => {
    setSaving(true);
    const payload = {
      rank: values.rank,
      name: values.name,
      designation: values.designation,
      category: values.category,
      shortBiography: values.shortBiography,
      profileImage: values.profileImage,
    };

    if (selected?.id) {
      const { error } = await supabase
        .from("board_members")
        .update(payload)
        .eq("id", selected.id);
      if (error) { toast.error("Failed to update."); setSaving(false); return; }
      toast.success("Board member updated.");
    } else {
      const { error } = await supabase.from("board_members").insert(payload);
      if (error) { toast.error("Failed to create."); setSaving(false); return; }
      toast.success("Board member added.");
    }
    setSaving(false);
    setFormOpen(false);
    fetchData();
  };

  const handleDelete = async () => {
    if (!selected?.id) return;
    const { error } = await supabase
      .from("board_members")
      .delete()
      .eq("id", selected.id);
    if (error) toast.error("Failed to delete.");
    else { toast.success("Board member deleted."); fetchData(); }
    setDeleteOpen(false);
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Board Members</h1>
        <button
          className="rounded-md bg-primary px-4 py-2 text-sm text-white"
          onClick={() => { setSelected(null); setFormOpen(true); }}
        >
          Add Member
        </button>
      </div>

      <DataTable
        data={data}
        columns={columns}
        getRowId={(row) => row.id}
        loading={loading}
        searchKeys={["name", "designation", "category"]}
        searchPlaceholder="Search members…"
        onEdit={(row) => { setSelected(row); setFormOpen(true); }}
        onDelete={(row) => { setSelected(row); setDeleteOpen(true); }}
        emptyMessage="No board members found."
      />

      <FormModal
        open={isFormOpen}
        title={selected ? "Edit Board Member" : "Add Board Member"}
        onClose={() => setFormOpen(false)}
      >
        <BoardMemberForm
          defaultValues={selected ?? undefined}
          onSubmit={handleSubmit}
          isSubmitting={saving}
        />
      </FormModal>

      <ConfirmDeleteDialog
        open={isDeleteOpen}
        title="Delete Board Member?"
        description={`Are you sure you want to delete "${selected?.name}"? This cannot be undone.`}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
