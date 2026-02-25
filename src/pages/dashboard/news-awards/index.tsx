import { useEffect, useState } from "react";
import { toast } from "sonner";
import { NewsAwardForm } from "./form";
import { NewsAward } from "@/types/cms";
import { DataTable } from "@/components/Dashboard/DataTable/DataTable";
import { ConfirmDeleteDialog } from "@/components/Dashboard/modals/ConfirmDeleteDialog";
import { FormModal } from "@/components/Dashboard/modals/FormModal";
import { supabase } from "@/lib/supabase-client";
import { columns } from "./columns";
import { NewsAwardFormValues } from "./schema";

const ITEM_TYPES = ["All", "In the News", "Press Release", "Video Coverage", "Awards"];

export default function NewsAwardsPage() {
  const [data, setData] = useState<NewsAward[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<NewsAward | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("news_awards")
      .select("*")
      .order("date", { ascending: false });
    if (error) toast.error("Failed to load news & awards.");
    else setData((data as NewsAward[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = filter === "All" ? data : data.filter((d) => d.itemType === filter);

  const handleSubmit = async (values: NewsAwardFormValues) => {
    setSaving(true);
    const payload = {
      title: values.title,
      slug: values.slug,
      date: values.date,
      year: values.year,
      publication: values.publication,
      author: values.author,
      itemType: values.itemType,
      excerpt: values.excerpt,
      detailText: values.detailText,
      images: values.images,
      hyperlink: values.hyperlink,
      featuredOnHomePage: values.featuredOnHomePage,
    };

    if (selected?.id) {
      const { error } = await supabase.from("news_awards").update(payload).eq("id", selected.id);
      if (error) { toast.error("Failed to update."); setSaving(false); return; }
      toast.success("Item updated.");
    } else {
      const { error } = await supabase.from("news_awards").insert(payload);
      if (error) { toast.error("Failed to create."); setSaving(false); return; }
      toast.success("Item added.");
    }
    setSaving(false);
    setFormOpen(false);
    fetchData();
  };

  const handleDelete = async () => {
    if (!selected?.id) return;
    const { error } = await supabase.from("news_awards").delete().eq("id", selected.id);
    if (error) toast.error("Failed to delete.");
    else { toast.success("Item deleted."); fetchData(); }
    setDeleteOpen(false);
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">News & Awards</h1>
        <button
          className="rounded-md bg-primary px-4 py-2 text-sm text-white"
          onClick={() => { setSelected(null); setFormOpen(true); }}
        >
          Add Item
        </button>
      </div>

      {/* Type filter tabs */}
      <div className="mb-4 flex gap-2 flex-wrap">
        {ITEM_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filter === t
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        getRowId={(row) => row.id}
        loading={loading}
        searchKeys={["title", "publication", "author"]}
        searchPlaceholder="Search news & awards…"
        onEdit={(row) => { setSelected(row); setFormOpen(true); }}
        onDelete={(row) => { setSelected(row); setDeleteOpen(true); }}
        emptyMessage="No items found."
      />

      <FormModal
        open={isFormOpen}
        title={selected ? "Edit Item" : "Add Item"}
        onClose={() => setFormOpen(false)}
      >
        <NewsAwardForm
          defaultValues={selected ?? undefined}
          onSubmit={handleSubmit}
          isSubmitting={saving}
        />
      </FormModal>

      <ConfirmDeleteDialog
        open={isDeleteOpen}
        title="Delete Item?"
        description={`Are you sure you want to delete "${selected?.title}"?`}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
