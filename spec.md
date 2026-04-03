# Lincoln Mingo Graduation 2026

## Current State
Admin access uses `claimFirstAdmin()` which allows any logged-in Internet Identity user to become admin if no admin is assigned yet. This is insecure and has caused repeated failures because the user's Google email (`rashidatherealtor1@gmail.com`) is not how Internet Identity works — II uses cryptographic principals, not email addresses.

The `_initializeAccessControlWithSecret` flow requires a URL token that is never available to the user.

## Requested Changes (Diff)

### Add
- Backend: A new function `registerAdminBySecret(secret: Text)` that sets the caller as admin if:
  1. No admin is assigned yet, AND
  2. The provided secret matches a hardcoded value `"MINGO2026ADMIN"`
- Frontend: After logging in with Internet Identity, show the user their principal ID clearly, plus a one-time "Claim Admin" button that calls `registerAdminBySecret` with the hardcoded secret. Once admin is assigned, the button disappears forever.
- Frontend: Remove any reference to `claimFirstAdmin` and the old token-based flow.

### Modify
- Backend `main.mo`: Replace `claimFirstAdmin` with `registerAdminBySecret(secret: Text)` that checks the hardcoded secret.
- Frontend `AdminDashboard.tsx`: Update to use `registerAdminBySecret` instead of `claimFirstAdmin`.
- Frontend `useActor.ts`: Remove the `_initializeAccessControlWithSecret` call — it's unused and broken.

### Remove
- The `claimFirstAdmin` function from backend (or keep as no-op stub for ABI compat).
- The broken admin token URL flow.

## Implementation Plan
1. Update `main.mo`: add `registerAdminBySecret` with hardcoded secret check, keep `claimFirstAdmin` as a stub.
2. Update `AdminDashboard.tsx`: use `registerAdminBySecret("MINGO2026ADMIN")` instead of `claimFirstAdmin()`.
3. Update `useActor.ts`: remove broken `_initializeAccessControlWithSecret` call.
4. Validate and deploy.
