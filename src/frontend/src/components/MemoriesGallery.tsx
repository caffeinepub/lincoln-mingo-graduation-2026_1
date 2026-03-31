import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Images, Loader2, Upload } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAddMemory, useIsAdmin, useMemories } from "../hooks/useQueries";

function AdminUploadDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const addMemory = useAddMemory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim() || !title.trim()) return;
    try {
      await addMemory.mutateAsync({
        imageUrl: imageUrl.trim(),
        title: title.trim(),
        description: description.trim(),
      });
      toast.success("Memory added!");
      setOpen(false);
      setTitle("");
      setDescription("");
      setImageUrl("");
    } catch {
      toast.error("Failed to add memory.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          data-ocid="gallery.upload_button"
          className="btn-gold-outline rounded-full px-6 py-2 text-xs uppercase tracking-[0.15em] font-semibold font-sans border border-gold/50"
        >
          <Upload className="w-4 h-4 mr-2" />
          Add Memory
        </Button>
      </DialogTrigger>
      <DialogContent
        data-ocid="gallery.dialog"
        className="bg-charcoal-100 border border-gold/30 text-foreground"
      >
        <DialogHeader>
          <DialogTitle className="font-serif text-gold">
            Add a Memory
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Label className="text-xs uppercase tracking-wider text-gold/60 font-sans mb-1.5 block">
              Image URL
            </Label>
            <Input
              data-ocid="gallery.image_url.input"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              required
              className="bg-charcoal-200 border-gold/25 text-foreground placeholder:text-foreground/30"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-gold/60 font-sans mb-1.5 block">
              Title
            </Label>
            <Input
              data-ocid="gallery.title.input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Memory title"
              required
              className="bg-charcoal-200 border-gold/25 text-foreground placeholder:text-foreground/30"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wider text-gold/60 font-sans mb-1.5 block">
              Description
            </Label>
            <Textarea
              data-ocid="gallery.textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this moment…"
              rows={2}
              className="bg-charcoal-200 border-gold/25 text-foreground placeholder:text-foreground/30 resize-none"
            />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button
              type="button"
              data-ocid="gallery.cancel_button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="text-foreground/60"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              data-ocid="gallery.confirm_button"
              disabled={addMemory.isPending}
              className="btn-gold border-0 rounded-full px-6"
            >
              {addMemory.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Add Memory"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function MemoriesGallery() {
  const { data: memories, isLoading } = useMemories();
  const { data: isAdmin } = useIsAdmin();

  return (
    <section id="gallery" className="py-24 bg-charcoal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold/60 font-sans mb-3">
            📸 Relive the Moment
          </p>
          <h2 className="font-serif font-bold uppercase text-3xl sm:text-4xl text-gold tracking-[0.06em]">
            Memories & Moments
          </h2>
          <div className="section-divider mt-6 max-w-xs mx-auto" />
          <p className="mt-5 text-sm text-foreground/55 font-sans">
            Photos and highlights from the celebration — come back and relive
            the moment.
          </p>
          {isAdmin && (
            <div className="mt-6">
              <AdminUploadDialog />
            </div>
          )}
        </motion.div>

        {isLoading ? (
          <div
            data-ocid="gallery.loading_state"
            className="flex justify-center py-16"
          >
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        ) : !memories || memories.length === 0 ? (
          <div
            data-ocid="gallery.empty_state"
            className="flex flex-col items-center justify-center py-20 gap-5"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "oklch(68% 0.13 72 / 0.08)",
                border: "1px solid oklch(68% 0.13 72 / 0.25)",
              }}
            >
              <Images className="w-8 h-8 text-gold/50" />
            </div>
            <p className="font-serif italic text-foreground/40 text-lg">
              Photos coming soon
            </p>
            <p className="text-sm text-foreground/30 font-sans">
              Check back after the celebration
            </p>
          </div>
        ) : (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
            {memories.map((memory, i) => (
              <motion.div
                key={`${memory.title}-${i}`}
                data-ocid={`gallery.item.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="break-inside-avoid rounded-xl overflow-hidden gold-border group cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={memory.image.getDirectURL()}
                    alt={memory.title}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
                    style={{
                      background:
                        "linear-gradient(to top, oklch(10% 0.01 252 / 0.9) 0%, transparent 60%)",
                    }}
                  >
                    <div>
                      <p className="text-xs font-semibold text-gold font-sans">
                        {memory.title}
                      </p>
                      {memory.description && (
                        <p className="text-xs text-foreground/70 font-sans mt-0.5">
                          {memory.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
