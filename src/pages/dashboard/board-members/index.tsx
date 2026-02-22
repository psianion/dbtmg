import { useEffect, useState } from "react";

import { BoardMemberForm } from "./form";
import { BoardMember } from "@/types/cms";
import { DataTable } from "@/components/Dashboard/DataTable/DataTable";
import { ConfirmDeleteDialog } from "@/components/Dashboard/modals/ConfirmDeleteDialog";
import { FormModal } from "@/components/Dashboard/modals/FormModal";
import { supabase } from "@/lib/supabase-client";
import { columns } from "./column";

export default function BoardMembersPage() {
  const [data, setData] = useState<BoardMember[]>([]);
  const [selected, setSelected] = useState<BoardMember | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const fetchBoardMembers = async () => {
    const { data, error } = await supabase
      .from("board_members")
      .select("*")
      .order("rank", { ascending: true });

    if (error) {
      console.error("Error fetching board members:", error);
      return [];
    }

    return data as BoardMember[];
  };

  useEffect(() => {
    fetchBoardMembers().then((data) => setData(data));
  }, []);

  return (
    <>
      {/* Page header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Board Members</h1>
        <button
          className="rounded-md bg-primary px-4 py-2 text-white"
          onClick={() => {
            setSelected(null);
            setFormOpen(true);
          }}
        >
          Add Member
        </button>
      </div>

      <DataTable
        data={data}
        columns={columns}
        getRowId={(row) => row.id}
        onEdit={(row) => {
          setSelected(row);
          setFormOpen(true);
        }}
        onDelete={(row) => {
          setSelected(row);
          setDeleteOpen(true);
        }}
        emptyMessage="No board members found."
      />

      {/* Add / Edit */}
      <FormModal
        open={isFormOpen}
        title={selected ? "Edit Board Member" : "Add Board Member"}
        onClose={() => setFormOpen(false)}
      >
        <BoardMemberForm
          defaultValues={selected ?? undefined}
          onSubmit={(values) => {
            console.log(values);
            setFormOpen(false);
          }}
        />
      </FormModal>

      {/* Delete */}
      <ConfirmDeleteDialog
        open={isDeleteOpen}
        title="Delete Board Member?"
        description="This action cannot be undone."
        onCancel={() => setDeleteOpen(false)}
        onConfirm={() => {
          console.log("delete", selected);
          setDeleteOpen(false);
        }}
      />
    </>
  );
}
