import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Loader2, RefreshCw, Shield } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { RSVPEntry } from "../backend.d";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function AdminDashboard() {
  const { login, identity, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [adminTaken, setAdminTaken] = useState<boolean | null>(null);
  const [rsvps, setRsvps] = useState<RSVPEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [claiming, setClaiming] = useState(false);
  const [claimError, setClaimError] = useState<string | null>(null);

  const loadRSVPs = useCallback(async () => {
    if (!actor) return;
    setLoading(true);
    setError(null);
    try {
      const entries = await actor.getAllRSVPEntries();
      setRsvps(entries);
    } catch {
      setError("Failed to load RSVPs. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [actor]);

  const checkAdmin = useCallback(async () => {
    if (!actor) return;
    setChecking(true);
    try {
      const [adminResult, taken] = await Promise.all([
        actor.isCallerAdmin(),
        actor.isAdminAssigned(),
      ]);
      setIsAdmin(adminResult);
      setAdminTaken(taken);
      if (adminResult) {
        await loadRSVPs();
      }
    } catch {
      setIsAdmin(false);
      setAdminTaken(false);
    } finally {
      setChecking(false);
    }
  }, [actor, loadRSVPs]);

  useEffect(() => {
    if (!isInitializing && !actorFetching && actor) {
      checkAdmin();
    } else if (!isInitializing && !actorFetching && !actor) {
      setChecking(false);
    }
  }, [isInitializing, actorFetching, actor, checkAdmin]);

  const handleClaimAdmin = async () => {
    if (!actor) return;
    setClaiming(true);
    setClaimError(null);
    try {
      await actor.claimFirstAdmin();
      await checkAdmin();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("already been assigned")) {
        setClaimError(
          "Admin access has already been claimed by another login.",
        );
      } else {
        setClaimError("Something went wrong. Please try again.");
      }
    } finally {
      setClaiming(false);
    }
  };

  const handleBackToSite = () => {
    window.location.hash = "";
    window.location.reload();
  };

  const attending = rsvps.filter((r) => r.attending).length;
  const notAttending = rsvps.filter((r) => !r.attending).length;

  if (isInitializing || actorFetching || checking) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#001533" }}
        data-ocid="admin.loading_state"
      >
        <div className="text-center">
          <Loader2
            className="h-10 w-10 animate-spin mx-auto mb-4"
            style={{ color: "#c9a84c" }}
          />
          <p style={{ color: "#c9a84c" }} className="text-lg font-medium">
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  if (!identity || !isAdmin) {
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
          {!identity ? (
            <>
              <p
                className="mb-6 text-sm"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                Log in to access the RSVP dashboard.
              </p>
              <Button
                onClick={login}
                disabled={isLoggingIn}
                className="w-full font-semibold text-base py-6"
                style={{ background: "#c9a84c", color: "#001533" }}
                data-ocid="admin.primary_button"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login with Internet Identity"
                )}
              </Button>
            </>
          ) : adminTaken ? (
            <>
              <p
                className="mb-6 text-sm"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                This account does not have admin access.
              </p>
              <Button
                onClick={handleBackToSite}
                variant="outline"
                className="w-full"
                style={{ borderColor: "#c9a84c", color: "#c9a84c" }}
                data-ocid="admin.secondary_button"
              >
                Back to Site
              </Button>
            </>
          ) : (
            <>
              <p
                className="mb-6 text-sm"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                You're logged in. Click below to activate admin access for this
                account.
              </p>
              {claimError && (
                <p
                  className="text-xs mb-3 text-red-400"
                  data-ocid="admin.error_state"
                >
                  {claimError}
                </p>
              )}
              <Button
                onClick={handleClaimAdmin}
                disabled={claiming}
                className="w-full font-semibold text-base py-5 mb-3"
                style={{ background: "#c9a84c", color: "#001533" }}
                data-ocid="admin.primary_button"
              >
                {claiming ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Activating...
                  </>
                ) : (
                  "Activate Admin Access"
                )}
              </Button>
              <Button
                onClick={handleBackToSite}
                variant="outline"
                className="w-full"
                style={{ borderColor: "#c9a84c", color: "#c9a84c" }}
                data-ocid="admin.secondary_button"
              >
                Back to Site
              </Button>
            </>
          )}
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: "#c9a84c" }}>
              RSVP Dashboard
            </h1>
            <p
              className="mt-1 text-sm"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Lincoln Mingo Graduation 2026 &mdash; Class of Red Oak High School
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={loadRSVPs}
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

        {/* Stats */}
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

        {/* Error state */}
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

        {/* Table */}
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
