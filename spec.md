# Lincoln Mingo Graduation 2026

## Current State
The admin dashboard (`AdminDashboard.tsx`) loads RSVPs immediately for anyone who navigates to `#admin` — no login, no restriction. The backend `getAllRSVPEntries` is a public query with no auth check. The authorization component (access control) is already installed and the `claimFirstAdmin` / `isAdminAssigned` / `isCallerAdmin` backend functions exist.

## Requested Changes (Diff)

### Add
- Google login flow on the admin page: user must sign in with Google before seeing RSVPs
- After login, check `isCallerAdmin()` — if true, show RSVP dashboard directly
- If not admin and admin not yet assigned, show "Claim Admin Access" button that calls `claimFirstAdmin()`
- If not admin and admin already assigned, show "Access Denied" message

### Modify
- `AdminDashboard.tsx`: add login gate using the authorization/Google login hook before showing RSVP data
- Backend `getAllRSVPEntries`: make it admin-only (add caller auth check)

### Remove
- Open access to RSVP data without login

## Implementation Plan
1. Update `AdminDashboard.tsx` to use Google login (useAuth/useActor with identity), check admin status, and conditionally show login prompt, claim button, access denied, or RSVP table
2. Update `main.mo` `getAllRSVPEntries` to require admin role
