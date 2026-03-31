import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitRSVPWithEmail } from "../hooks/useQueries";

function RSVPForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState(true);
  const [success, setSuccess] = useState(false);
  const submitRSVP = useSubmitRSVPWithEmail();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    try {
      await submitRSVP.mutateAsync({
        name: name.trim(),
        email: email.trim(),
        attending,
      });
      setSuccess(true);
      toast.success("RSVP confirmed! See you there.");
    } catch {
      toast.error("Failed to submit RSVP. Please try again.");
    }
  };

  if (success) {
    return (
      <div
        data-ocid="rsvp.success_state"
        className="flex flex-col items-center justify-center h-64 gap-4 text-center"
      >
        <CheckCircle2 className="w-12 h-12 text-gold" />
        <h3 className="font-serif text-xl text-gold">You're on the list!</h3>
        <p className="text-sm text-foreground/60 font-sans">
          We can't wait to celebrate with you, {name}.
        </p>
        <p className="text-xs text-foreground/40 font-sans">
          A confirmation has been recorded for {email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label className="text-xs uppercase tracking-[0.15em] text-gold/70 font-sans mb-2 block">
          Full Name
        </Label>
        <Input
          data-ocid="rsvp.input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          required
          className="bg-charcoal-200 border-gold/25 text-foreground placeholder:text-foreground/30 focus:border-gold/60 focus:ring-gold/30"
        />
      </div>

      <div>
        <Label className="text-xs uppercase tracking-[0.15em] text-gold/70 font-sans mb-2 block">
          Email Address
        </Label>
        <Input
          data-ocid="rsvp.email.input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="bg-charcoal-200 border-gold/25 text-foreground placeholder:text-foreground/30 focus:border-gold/60 focus:ring-gold/30"
        />
      </div>

      <div>
        <Label className="text-xs uppercase tracking-[0.15em] text-gold/70 font-sans mb-3 block text-center">
          Will you attend?
        </Label>
        <div className="flex gap-3 justify-center">
          {([true, false] as const).map((val) => (
            <button
              key={String(val)}
              type="button"
              data-ocid={`rsvp.attending_${val ? "yes" : "no"}.toggle`}
              onClick={() => setAttending(val)}
              className={`flex-1 py-2.5 rounded-lg text-xs uppercase tracking-[0.15em] font-semibold font-sans transition-all duration-200 ${
                attending === val
                  ? "btn-gold"
                  : "bg-charcoal-200 border border-gold/25 text-foreground/60 hover:border-gold/40"
              }`}
            >
              {val ? "Yes, I'll Be There" : "Unable to Attend"}
            </button>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        data-ocid="rsvp.submit_button"
        disabled={submitRSVP.isPending}
        className="w-full btn-gold rounded-full h-11 text-xs uppercase tracking-[0.18em] font-semibold font-sans border-0 hover:bg-gold-light"
      >
        {submitRSVP.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
          </>
        ) : (
          "Confirm RSVP"
        )}
      </Button>
    </form>
  );
}

export default function RSVPMessages() {
  return (
    <section className="py-24 bg-charcoal">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold/60 font-sans mb-3">
            Join the Celebration
          </p>
          <h2 className="font-serif font-bold uppercase text-3xl sm:text-4xl text-gold tracking-[0.06em]">
            Be Part of This Moment
          </h2>
          <div className="section-divider mt-6 max-w-xs mx-auto" />
        </motion.div>

        <motion.div
          id="rsvp"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-charcoal-100 rounded-2xl p-7 gold-border card-glow"
        >
          <div className="text-center mb-6">
            <h3 className="font-serif font-semibold text-xl text-gold mb-1 tracking-wide">
              RSVP
            </h3>
            <p className="text-xs text-foreground/50 font-sans uppercase tracking-[0.12em]">
              Reserve your seat
            </p>
          </div>
          <RSVPForm />
        </motion.div>
      </div>
    </section>
  );
}
