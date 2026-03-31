# Lincoln Mingo Graduation 2026

## Current State
RSVP form collects name, email, and attendance choice. It passes email as `inviteCode` to `submitRSVP`, which fails because the backend validates invite codes. The Yes/No attendance buttons are left-aligned.

## Requested Changes (Diff)

### Add
- New backend function `submitRSVPWithEmail(name, email, attending)` that stores RSVP with email, no invite code required
- RSVP type updated to include email field

### Modify
- Frontend RSVP form calls the new `submitRSVPWithEmail` instead of passing email as invite code
- Yes/No attendance buttons centered (justify-center on container)
- useQueries hook updated to call new backend function

### Remove
- Dependency on invite code for RSVP submission

## Implementation Plan
1. Update `main.mo` to add `submitRSVPWithEmail` and update RSVP type
2. Regenerate backend bindings
3. Update `RSVPMessages.tsx` to center buttons and call new function
4. Update `useQueries.ts` hook
