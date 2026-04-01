import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Loader2, Lock, RefreshCw, Shield } from "lucide-react";
import { useCallback, useState } from "react";
import type { RSVPEntry } from "../backend.d";
import { useActor } from "../hooks/useActor";

export default function AdminDashboard() {
  const { actor, isFetching: actorFetching } = useActor();
  const [pin, setPin] = useState("");
  const [rsvps, setRsvps] = useState<RSVPEntry[]>([]);
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUnlock = useCallback(async () => {
    if (!actor || !pin.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const entries = await actor.getAllRSVPEntriesWithPin(pin.trim());
      setRsvps(entries);
      setUnlocked(true);
    } catch {
      setError("Incorrect PIN. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [actor, pin]);

  const handleRefresh = useCallback(async () => {
    if (!actor || !pin.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const entries = await actor.getAllRSVPEntriesWithPin(pin.trim());
      setRsvps(entries);
    } catch {
      setError("Failed to refresh. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [actor, pin]);

  const handleBackToSite = () => {
    window.location.hash = "";
    window.location.reload();
  };

  const attending = rsvps.filter((r) => r.attending).length;
  const notAttending = rsvps.filter((r) => !r.attending).length;

  if (actorFetching) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#001533" }}
      >
        <Loader2
          className="h-10 w-10 animate-spin"
          style={{ color: "#c9a84c" }}
        />
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#001533" }}
        data-ocid="admin.panel"
      >
        <div
          className="w-full max-w-sm rounded-2xl p-8 text-center"
          style={{
            background: "#001f4d",
            border: "1px solid rgba(201,168,76,0.3)",
          }}
        >
          <Shield
            className="h-12 w-12 mx-auto mb-4"
            style={{ color: "#c9a84c" }}
          />
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#c9a84c" }}>
            Admin Access
          </h1>
          <p
            className="mb-6 text-sm"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Enter your admin PIN to view RSVPs.
          </p>
          <div className="relative mb-3">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "rgba(255,255,255,0.4)" }}
            />
            <Input
              type="password"
              placeholder="Admin PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
              className="pl-9 text-white placeholder:text-white/40 border-white/20 focus:border-yellow-500"
              style={{ background: "rgba(255,255,255,0.05)" }}
              data-ocid="admin.input"
            />
          </div>
          {error && (
            <p
              className="text-red-400 text-sm mb-3"
              data-ocid="admin.error_state"
            >
              {error}
            </p>
          )}
          <Button
            onClick={handleUnlock}
            disabled={loading || !pin.trim()}
            className="w-full font-semibold text-base py-5 mb-3"
            style={{ background: "#c9a84c", color: "#001533" }}
            data-ocid="admin.primary_button"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Access Dashboard"
            )}
          </Button>
          <Button
            onClick={handleBackToSite}
            variant="outline"
            className="w-full"
            style={{ borderColor: "#c9a84c", color: "#c9a84c" }}
            data-ocid="admin.cancel_button"
          >
            Back to Site
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-4 py-8"
      style={{ background: "#001533" }}
      data-ocid="admin.page"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: "#c9a84c" }}>
              RSVP Dashboard
            </h1>
            <p
              className="mt-1 text-sm"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Lincoln Mingo Graduation 2026 &mdash; Red Oak High School
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleRefresh}
              disabled={loading}
              variant="outline"
              className="gap-2"
              style={{
                borderColor: "#c9a84c",
                color: "#c9a84c",
                background: "transparent",
              }}
              data-ocid="admin.secondary_button"
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button
              onClick={handleBackToSite}
              variant="outline"
              className="gap-2"
              style={{
                borderColor: "rgba(255,255,255,0.3)",
                color: "rgba(255,255,255,0.7)",
                background: "transparent",
              }}
              data-ocid="admin.cancel_button"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Site
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div
            className="rounded-xl p-5 text-center"
            style={{
              background: "#001f4d",
              border: "1px solid rgba(201,168,76,0.2)",
            }}
            data-ocid="admin.card"
          >
            <p className="text-3xl font-bold" style={{ color: "#c9a84c" }}>
              {rsvps.length}
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Total RSVPs
            </p>
          </div>
          <div
            className="rounded-xl p-5 text-center"
            style={{
              background: "#001f4d",
              border: "1px solid rgba(34,197,94,0.2)",
            }}
            data-ocid="admin.card"
          >
            <p className="text-3xl font-bold text-green-400">{attending}</p>
            <p
              className="text-sm mt-1"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Attending
            </p>
          </div>
          <div
            className="rounded-xl p-5 text-center"
            style={{
              background: "#001f4d",
              border: "1px solid rgba(239,68,68,0.2)",
            }}
            data-ocid="admin.card"
          >
            <p className="text-3xl font-bold text-red-400">{notAttending}</p>
            <p
              className="text-sm mt-1"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Not Attending
            </p>
          </div>
        </div>

        {error && (
          <div
            className="rounded-xl p-4 mb-6 text-center"
            style={{
              background: "rgba(139,0,0,0.2)",
              border: "1px solid rgba(139,0,0,0.4)",
            }}
            data-ocid="admin.error_state"
          >
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "#001f4d",
            border: "1px solid rgba(201,168,76,0.2)",
          }}
          data-ocid="admin.table"
        >
          {loading ? (
            <div className="py-16 text-center" data-ocid="admin.loading_state">
              <Loader2
                className="h-8 w-8 animate-spin mx-auto mb-3"
                style={{ color: "#c9a84c" }}
              />
              <p style={{ color: "rgba(255,255,255,0.5)" }}>Loading RSVPs...</p>
            </div>
          ) : rsvps.length === 0 ? (
            <div className="py-16 text-center" data-ocid="admin.empty_state">
              <p
                className="text-xl font-semibold"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                No RSVPs submitted yet.
              </p>
              <p
                className="text-sm mt-2"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                RSVPs will appear here once guests respond.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "rgba(201,168,76,0.2)" }}>
                  <TableHead
                    style={{ color: "#c9a84c" }}
                    className="font-semibold"
                  >
                    #
                  </TableHead>
                  <TableHead
                    style={{ color: "#c9a84c" }}
                    className="font-semibold"
                  >
                    Name
                  </TableHead>
                  <TableHead
                    style={{ color: "#c9a84c" }}
                    className="font-semibold"
                  >
                    Email
                  </TableHead>
                  <TableHead
                    style={{ color: "#c9a84c" }}
                    className="font-semibold"
                  >
                    Attending
                  </TableHead>
                  <TableHead
                    style={{ color: "#c9a84c" }}
                    className="font-semibold"
                  >
                    Date Submitted
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rsvps.map((entry, idx) => (
                  <TableRow
                    key={`${entry.email}-${idx}`}
                    style={{ borderColor: "rgba(201,168,76,0.1)" }}
                    data-ocid={`admin.row.${idx + 1}`}
                  >
                    <TableCell className="text-white/50 text-sm">
                      {idx + 1}
                    </TableCell>
                    <TableCell className="text-white font-medium">
                      {entry.name}
                    </TableCell>
                    <TableCell className="text-white/80">
                      {entry.email}
                    </TableCell>
                    <TableCell>
                      {entry.attending ? (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 border">
                          Yes
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 border">
                          No
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-white/60 text-sm">
                      {new Date(
                        Number(entry.timestamp / 1_000_000n),
                      ).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        <p
          className="text-center mt-8 text-xs"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Lincoln Mingo Graduation 2026 &mdash; Admin Portal
        </p>
      </div>
    </div>
  );
}
