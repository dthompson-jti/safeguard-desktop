# FORK_PLAN.md

## 0. Phase 0: Pre-Fork Preparation (Shared Infrastructure)
*Objective: Extract critical shared systems to prevent runtime failure upon decoupling.*

### 0.1 Ticker Extraction (The Heartbeat)
- [ ] **Extract Heartbeat Loop**: Move the `requestAnimationFrame` and ticker atom updates from `src/App.tsx` into a new `src/data/HeartbeatManager.tsx` headless component.
- [ ] **Global Provisioning**: Mount `HeartbeatManager` in `src/main.tsx` or ensuring it is the first component in all App roots (`MobileApp`, `DesktopApp`, `DesktopEnhancedApp`).

### 0.2 Authentication Standardization
- [ ] **Standardize LoginView**: Ensure `LoginView.tsx` is platform-agnostic or has desktop-specific styling overrides ready.
- [ ] **Standardize sessionAtom**: Verify the atom is in a shared data file accessible to all forks.

### 0.3 LocalStorage Namespacing (Persistence Safety)
- [ ] **Define Prefixing Strategy**: Add a `STORAGE_PREFIX` to `src/config.ts` (e.g., `sc_mobile_v1_` vs `sc_desktop_v1_`).
- [ ] **Update `atomWithStorage` Calls**: Ensure all persistence atoms in `src/data/atoms.ts` and `src/desktop/atoms.ts` use the prefixed keys to prevent cross-fork data corruption.

### 0.4 Environment & API Audit
- [ ] **Externalize Environment**: Move `environmentName` from `atoms.ts` to `.env.fork-name` files.
- [ ] **Standardize Endpoints**: Identify if Desktop needs a distinct `SUPERVISOR_API_BASE` vs Mobile's `OFFICER_API_BASE`.



## 1. Project Forking Strategy
*Objective: Systematically decouple the monolithic prototype into two specialized, high-performance environments.*

### 1.1 Repository Operations & Destination
- [ ] **Snapshot Tagging**: Create a git tag `v0-monorepo-concept` at the current commit to preserve the "Source of Truth" state before divergence.
- [ ] **Destination Strategy**: 
    - [ ] *Question*: Should the fork live as divergent long-lived branches in this repo (e.g., `stream/desktop-only`) or be pushed to entirely new repositories (e.g., `safety-check-desktop`)? 
    - [ ] *Recommendation*: Use separate repositories to prevent accidental cross-contamination and simplify CI/CD pipelines.

### 1.2 Synchronization & Heritage
- [ ] **Clean Break vs. Shared Core**:
    - [ ] *Question*: Do we expect to backport core design system changes or bug fixes between the two streams?
    - [ ] *Strategy*: If shared logic is needed, consider moving shared components to a local NPM package or a `shared/` directory that is symlinked (though this risks re-introducing the monolith).
- [ ] **Upstream tracking**: If using separate repos, establish the current repo as the `upstream` remote for both to allow for manual merges of critical fixes.

### 1.3 CI/CD & Deployment (gh-pages)
- [ ] **Routing Audit**: 
    - [ ] *Question*: Desktop currently has `index.html` and `desktop.html`. After splitting, should the Desktop fork promote `desktop.html` (or its content) to `index.html`?
- [ ] **Deployment Flow**:
    - [ ] Configure GitHub Actions to deploy from the new stream branches/repos.
    - [ ] *Question*: Will the mobile version retain the current `gh-pages` URL, or will it move to a `mobile.*` subdomain?

### 1.4 Environment & Security
- [ ] **Secrets Audit**: 
    - [ ] Identify any `.env` variables or GitHub Secrets that are platform-specific.
    - [ ] Rotate keys if the new repo will have different access permissions.

---

## 2. Dimension: Desktop-Only Stream (Current Goal)
*Objective: Refine the current codebase to serve **only** the Desktop and Enhanced Desktop experiences.*

### 2.1 Configuration Cleanup
*Objective: Eliminate the "Mobile Tax"—the overhead of PWA service workers and mobile-first libraries.*

#### 2.1.1 Dependency Purge
- [ ] **Remove Mobile-First Libraries**:
    - `vite-plugin-pwa`: Zero out all service worker and manifest generation.
    - `vaul`: Mobile-optimized BottomSheets are replaced by Radix UI dialogs/popovers in the Desktop stream.
    - `@yudiel/react-qr-scanner`: Used in `ScanView.tsx`; unlikely to be used in Supervisor Dashboard.
    - `use-sound`: Currently powers NFC/QR scan success sounds.
- [ ] **Clean `package.json` Scripts**:
    - *Question*: Should we retain `gh-pages` deployment or move to a more desktop-standard CI/CD (e.g. Vercel/Netlify/S3)?

#### 2.1.2 Build & Orchestration (`vite.config.ts`)
- [ ] **Entry Point Consolidation**:
    - [ ] *Question*: Should we move the content of `desktop.html` into `index.html` to avoid route complexity?
    - [ ] *Action*: Prune the `rollupOptions.input` map to a single entry point if redirection isn't required.
- [ ] **Chunking Strategy**:
    - [ ] Delete `vendor-heavy` chunk definition (formerly scanner/motion).
    - [ ] Simplify `manualChunks` to focus on Radix and React Core.
- [ ] **Base Path refinement**: Ensure `base` handles the new repository URL correctly.

#### 2.1.3 Static Asset Management
- [ ] **Purge `public/` Directory**:
    - [ ] Delete all `pwa-*.png` icons.
    - [ ] Delete `maskable-icon-v1.png` and `apple-touch-icon.png`.
    - [ ] Remove `favicon-v1.svg` if replacing with a desktop-branded ICO.
- [ ] **Manifest Removal**: Hard delete any static `manifest.webmanifest`.

#### 2.1.4 Config & Script Audit
- [ ] **Check `src/config.ts`**: Verify `APP_VERSION` logic is still relevant for desktop-only builds.
- [ ] **Cleanup `scripts/`**: Ensure `increment-version.js` doesn't have hardcoded assumptions about the mobile-first build path.

### 2.2 Source Code Cleaning (Stripping Mobile)
*Objective: Surgical removal of the mobile-only "Cinematic" shell and native-hardware (NFC/QR) feature set.*

#### 2.2.1 Core Entry & Shell Deconstruction
- [ ] **Delete Mobile Roots**:
    - `src/App.tsx`: The mobile-only main entry.
    - `src/AppShell.tsx`: The complex gesture-based shell.
    - `src/AppShell.module.css`: Mobile shell layout.
    - `src/layouts/MainLayout.tsx`: Mobile-specific layout wrapper.
- [ ] **Delete Mobile Chrome**:
    - `src/features/Shell/AppHeader.tsx` & `.module.css`: (Desktop uses `DesktopHeader`).
    - `src/features/Shell/AppFooter.tsx` & `.module.css`: (Desktop uses no footer or a specialized one).
    - `src/features/Shell/AppSideMenu.tsx`: Gesture-driven sidebar.
    - `src/features/Shell/OfflineToggleFab.tsx`: Floating action button for mobile.

#### 2.2.2 Workflow Amputation (Hardware Dependent)
- [ ] **Delete Scanning Features**:
    - `src/features/Workflow/ScanView.tsx`: QR/NFC scanning view.
    - `src/features/Shell/NfcScanButton.tsx`: The animated scan trigger.
    - `src/features/Shell/ScanAnimationE.tsx` & `ScanAnimationF.tsx`.
    - `src/features/Shell/useNfcScan.ts`: Hardware bridge.
- [ ] **Delete Mobile Forms**:
    - `src/features/Workflow/CheckEntryView.tsx`: Mobile-optimized entry form.
    - `src/features/Workflow/NfcWriteView.tsx`: Provisioning view.
    - `src/features/Workflow/StatusSelectionSheet.tsx`: BottomSheet picker.

#### 2.2.3 Hook & Service Pruning
- [ ] **Delete Platform-Specific Hooks**:
    - `src/data/GestureProvider.tsx` & `GestureContext.tsx`.
    - `src/data/useVisualViewport.ts`: Handles mobile keyboard/notch resizing.
    - `src/features/Shell/LayoutOrchestrator.tsx`: Mobile layout metrics.
    - `src/features/Shell/SoundManager.tsx`: Audio feedback for scans.
    - `src/features/Shell/useRingAnimation.ts`.

#### 2.2.4 Architecture & Session Questions
- [ ] **Session Handling**: 
    - [ ] *Strategy*: Authentication is **required** for the supervisor dashboard. `LoginView.tsx` must be preserved and integrated into the Desktop entry points.
    - [ ] *Action*: implement an `AuthGate` pattern in both `DesktopApp.tsx` and `DesktopEnhancedApp.tsx`.

- [ ] **Component Consolidation**:
    - [ ] *Question*: `DeveloperModal` is shared. Should it be split if it contains mobile-only toggles (like "Show PWA Install")?
- [ ] **Skeleton Systems**:
    - [ ] Delete mobile skeletons (`AppShellSkeleton`, `FacilitySelectionSkeleton`).

### 2.3 Desktop Architecture Hardening
*Objective: Solidify the desktop experience as the only path, optimizing for mouse-and-keyboard interactions and large-screen layouts.*

#### 2.3.1 Routing & Entry Consolidation
- [ ] **Linearize `main.tsx`**:
    - [ ] Remove `isMobile()` detection logic.
    - [ ] Remove `MobileApp` imports and routes.
    - [ ] Simplify `getApp()` to a simple path-based switch between `DesktopApp` and `DesktopEnhancedApp`.
- [ ] **Root Infrastructure Restoration**:
    - [ ] **Add `HeartbeatManager`**: Ensure the ticker loop is active.
    - [ ] **Add `AuthGate`**: Wrap dashboard content in `{session.isAuthenticated ? <Dashboard /> : <LoginView />}`.
    - [ ] **Add `SoundManager` & `LayoutOrchestrator`**: Ensure these headless providers are present if needed for cross-platform components.

- [ ] **HTML Entry Point Consolidation**:
    - [ ] *Action*: Migrate the scaffolding of `desktop.html` (if distinct) into `index.html`.
    - [ ] Remove `desktop.html` to eliminate deployment confusion.

#### 2.3.2 Performance & Build Optimizations
- [ ] **Prune Build Artefacts**:
    - [ ] Update `vite.config.ts` to remove the `desktop` custom entry in `rollupOptions.input`.
    - [ ] De-chunk `vendor-heavy`; move `framer-motion` into `vendor-ui` or its own smaller chunk if needed.
- [ ] **Hardcode Platform Flags**:
    - [ ] Search for `data-platform="mobile"` and `data-platform="desktop"` in the codebase.
    - [ ] *Action*: Globally set `data-platform` to `"desktop"` or remove the attribute if styling logic is refactored.
- [ ] **Remove Mobile-Only Skeletons**:
    - [ ] Delete `src/components/AppShellSkeleton.tsx`.
    - [ ] Delete `src/components/FacilitySelectionSkeleton.tsx`.
    - [ ] Delete `src/components/ScheduleSkeleton.tsx` (if mobile-only).

#### 2.3.4 Global Event & PWA Cleanup
- [ ] **Prune Global Listeners**: Search for `window.addEventListener` in shared hooks/components. Remove orientation or touch-specific listeners from the Desktop fork.
- [ ] **Delete PWA UI**: Remove "Install App" buttons or PWA prompt logic from `AppSideMenu.tsx` and `LoginView.tsx`.

#### 2.3.3 UI De-platforming
- [ ] **Radix-Only Strategy**: 
    - [ ] Verify all modals and popovers use Radix instead of custom mobile sheets.
    - [ ] *Action*: Ensure `BottomSheet.tsx` is completely removed or replaced with a standard `Dialog` if still referenced.
- [ ] **Skeleton Optimization**: 
    - [ ] Finalize Desktop-specific skeletons for the `DataTable` (which currently uses circle/square placeholders).
- [ ] **Z-Index Audit**: 
    - [ ] Simplify z-index layers; remove mobile-specific "vignette" and "toast overlay" layer complexities.

---

## 3. Dimension: Mobile-Only Stream (Parallel Op)
*Objective: Created by reverting to the pre-desktop state or stripping desktop folders from the current state.*

### 3.1 Desktop Pruning
*Objective: Completely remove the "Supervisor Dashboard" concept to return the codebase to a lean, mobile-first resident check tool.*

#### 3.1.1 Logical Folder Removal
- [ ] **Delete Desktop Source**:
    - `src/desktop/`: All components, mock data, and atoms for the standard dashboard.
    - `src/desktop-enhanced/`: All components and layouts for the specialized tree-view navigation.
- [ ] **Delete Desktop Entry**:
    - `desktop.html`: Remove the secondary entry point.

#### 3.1.2 Desktop Dependency Cleanup
- [ ] **Library Removal**:
    - `@tanstack/react-table`: Used exclusively for the desktop `DataTable.tsx`.
    - `react-virtuoso`: Used for high-performance desktop tables.
- [ ] **Dependency Refactoring**:
    - [ ] **Refactor `NfcWriteView.tsx`**: Replace `Virtuoso` with a standard `.map()` list to allow removal of the `react-virtuoso` dependency from the mobile bundle.

- [ ] **Mock Data Pruning**:
    - Remove `src/desktop/mockLiveData.ts` and `src/desktop/mockHistoricalData.ts`.
    - Ensure `src/data/mock/facilityData.ts` and general mock data remain as they power the mobile dashboard.

#### 3.1.3 Logic De-coupling & Restoration
- [ ] **Cleanse `main.tsx`**:
    - [ ] Remove `DesktopApp` and `DesktopEnhancedApp` imports.
    - [ ] Remove platform-switching logic; hardwire to `MobileApp` (original `App.tsx`).
- [ ] **Remove Experimental Toggles**:
    - [ ] Audit `DeveloperModal.tsx` and `FutureIdeasModal.tsx`.
    - [ ] *Action*: Delete any switches or buttons that allow the user to manually trigger "Desktop Mode" or "Enhanced Desktop" views.
- [ ] **Hardcode Mobile Viewport**:
    - [ ] Restore any mobile-only `viewport` meta-tags in `index.html` that might have been compromised for desktop compatibility.

#### 3.1.4 Style Sheet Cleanup
- [ ] **Delete Desktop-Only CSS**:
    - `src/desktop/desktop-overrides.css`.
    - `src/desktop/index.css` (if distinct).
- [ ] **Prune `primitives.css`**: Remove overrides that were specifically added to shrink control heights for "Desktop density" (e.g., 36px overrides).

### 3.2 Mobile Restoration
*Objective: Solidify the mobile experience as the definitive path, ensuring PWA compliance and a distraction-free "native-feel" UI.*

#### 3.2.1 Entry Point Simplification
- [ ] **Hardwire `main.tsx`**:
    - [ ] Delete `DesktopApp` and `DesktopEnhancedApp` imports.
    - [ ] Remove `isMobile()` detection and ternary routing.
    - [ ] Directly render `MobileApp` (`src/App.tsx`).
- [ ] **Linearize HTML Scaffolding**:
    - [ ] Delete `desktop.html`.
    - [ ] Audit `index.html` for any desktop-specific `<link>` or `<meta>` tags that might degrade mobile performance.

#### 3.2.2 PWA & Build Restoration
- [ ] **Re-validate `vite-plugin-pwa`**:
    - [ ] Verify `registerType: 'autoUpdate'` or `'prompt'` is correctly set for mobile users.
    - [ ] Ensure `manifest` fields (name, short_name, description) are optimized for a standalone mobile experience.
    - [ ] Verify `orientation: 'portrait'` lock is active.
- [ ] **Build Pipeline Cleanup**:
    - [ ] Remove `desktop` input from `vite.config.ts`.
    - [ ] Restore `vendor-heavy` chunk focusing on mobile-critical libraries (motion, scanner).

#### 3.2.3 UI/UX De-experimentalization
- [ ] **Purge Desktop "Parasites"**:
    - [ ] Search for any "Switch to Desktop" buttons in `AppSideMenu.tsx` or `DeveloperModal.tsx` and delete them.
    - [ ] *Action*: Remove the `Ctrl+Backspace` data reset shortcut if it was intended specifically for supervisor/desktop testing.
- [ ] **Stable Feature Flags**:
    - [ ] *Optimization*: Hardcode "Dave's Favorites" as the default state in `DEFAULT_FEATURE_FLAGS` in `featureFlags.ts` if this fork is intended to be the production mobile version.
    - [ ] Remove any "Experimental" labels from stable features like Scan Animations.
- [ ] **Viewport & Touch Hardening**:
    - [ ] Restore strict `touch-action` rules in `App.tsx` and `AppShell.tsx` to prevent accidental browser zoom/scrolling while using gestures.
    - [ ] Verify `useVisualViewport` is correctly handling the mobile virtual keyboard.

---

## 4. Dimension: Shared Core & Utilities
*Objective: Identify what must be duplicated vs. what is truly platform-agnostic.*

### 4.1 Data Layer (Jotai Atoms)
*Objective: Partition the state layer to eliminate cross-platform "zombie" atoms and simplify the dependency graph.*

#### 4.1.1 Core Shared State (`src/data/coreAtoms.ts`)
- [ ] **Preserve Industry-Agnostic State**:
    - `Heartbeat`: `fastTickerAtom`, `throttledTickerAtom`, `slowTickerAtom`.
    - `Session`: `sessionAtom`, `userPreferencesAtom`. (Assume Supervisor Dashboard eventually needs User context).
    - `AppConfig`: `appConfigAtom` (Pruned of mobile-only flags like `nfcScanTimeout`).

#### 4.1.2 Mobile-Only State (`src/data/mobileAtoms.ts`)
- [ ] **Isolate Cinematic & Reactive State**:
    - `AppView`: `appViewAtom` (SideMenu vs DashboardTime).
    - `Workflow`: `workflowStateAtom` (none | scanning | form | provisioning).
    - `Hardware`: `nfcScanStateAtom`, `nfcScanStartTimeAtom`.
    - `Layout`: `headerHeightAtom`, `bannerHeightAtom` (Desktop layout is CSS Grid-based).
- [ ] **Gesture State**: Move `GestureContext` and `VisualViewport` atoms into this domain.
- [ ] **Workflow Helpers**: Isolate `completingChecksAtom` and `recentlyCompletedCheckIdAtom`.

#### 4.1.3 Desktop-Only State (`src/desktop/atoms.ts`)
- [ ] **Codify Dashboard State**:
    - `DesktopView`: `desktopViewAtom` (live | historical).
    - `Filtering`: `desktopFilterAtom`, `selectedHistoryRowsAtom`.
    - `Auto-Refresh`: `autoRefreshAtom`, `nextRefreshSecondsAtom`.
    - `Detail Panel`: `activeDetailRecordAtom`, `panelWidthAtom`.

#### 4.1.4 Data Reducer & Mock Data
- [ ] **Audit `appDataAtoms.ts`**:
    - [ ] *Question*: Does the Desktop Dashboard use `dispatchActionAtom` to write back data, or is it read-only? 
    - [ ] *Optimization*: If Desktop is read-only, remove the reducer logic from the Desktop stream to save bundle size.
- [ ] **Mock Data Strategy**:
    - [ ] Desktop stream: Retain `mockHistoricalData.ts` (extensive records).
    - [ ] Mobile stream: Delete `mockHistoricalData.ts`; use lean `initialChecks` to preserve local storage limits.

- [ ] **Toast Management**: `toastAtoms.ts` is shared. Should we split `addToastAtom` if it contains platform-specific deduction logic?
- [ ] **Theme Sync**: Is `useTheme.ts` intended to be shared or will Desktop have a separate dark-mode strategy?

### 4.2 Feature Flags
*Objective: Eliminate the "experimental" overhead by either hardcoding stable features or removing platform-irrelevant toggles.*

#### 4.2.1 Desktop Decommissioning
- [ ] **Purge Feature Flag Layer**:
    - Confirmed: `src/desktop` has zero dependencies on `featureFlagsAtom`.
    - *Action*: Completely remove `featureFlags.ts` from the Desktop stream.
    - *Action*: Stub out any shared components (like `UserAvatar`) that might expect flag-driven props (e.g. `enableDynamicAvatarColor`) to use hardcoded defaults.
- [ ] **Remove Feature-Driven UI**:
    - Delete `src/features/Overlays/FutureIdeasModal.tsx` and its associated atoms.

#### 4.2.2 Mobile Stabilization
- [ ] **Bake-in Stable Features**:
    - *Action*: Promote "Dave's Favorites" (Haptics: ON, Sound: ON, Scan: 'E', Invert Badge: ON) to the `DEFAULT_FEATURE_FLAGS`.
    - *Result*: Users get the "Best Version" out of the box without needing to find the secret unlock.
- [ ] **Decouple from "Experimental" Lock**:
    - Remove the `futureIdeasUnlockedAtom` check.
    - *Action*: Simplify `AppSideMenu.tsx` to remove the "Future Ideas" toggle or rename it to "Lab Settings" if still desired for power users.
- [ ] **Prune Failed Concepts**:
    - Identify and delete low-value flags (e.g. `feat_glass_tint`, `feat_card_gradient`) to reduce `localStorage` noise.

#### 4.2.3 Shared Core Pruning
- [ ] **Atomic Cleanup**:
    - Prune `src/data/atoms.ts` of any selectors that rely on `featureFlagsAtom` (e.g., `lateCheckCountAtom` logic if it's flag-dependent).
- [ ] **Migration Map**:
    - Ensure `useCheckLifecycle.ts` (which triggers haptics/sounds) correctly handles the absence of flags in the Desktop fork (likely via optional chaining or default stubs).

---

## 5. Verification & Quality Assurance

### 5.1 Desktop-Only Verification
*Objective: Ensure a secondary "Supervisor" identity that is entirely decoupled from the mobile origins, with zero overhead from unused dependencies.*

#### 5.1.1 Build & Static Analysis
- [ ] **Dependency Leak Test**:
    - Run `npm run build`.
    - *Audit*: Inspect the generated `dist/assets` manifest.
    - *Verification*: Confirm that `vaul`, `@yudiel/react-qr-scanner`, and `use-sound` are NOT present in any chunk.
- [ ] **Strict Cleanliness**:
    - Run `npm run lint` and `tsc --noEmit`.
    - *Goal*: Zero unused imports or "zombie" atoms in `src/data` (as seen in recent `isDetailPanelOpenAtom` build failures).
- [ ] **Asset Pruning**:
    - *Audit*: Verify `/dist/pwa-*.png` and `manifest.webmanifest` do not exist.
    - *Audit*: Ensure `error.mp3` and `success.mp3` are removed from `public/` (if sound is mobile-only).

#### 5.1.2 Routing & Runtime Logic
- [ ] **Linear Routing Verification**:
    - [ ] Navigating to `/` must render `DesktopApp`.
    - [ ] Navigating to `/desktop-enhanced` must render `DesktopEnhancedApp`.
    - [ ] *Action*: Attempt to navigate to a legacy mobile route (if any existed, like `/scan`) and verify it leads to a 404 or a desktop-appropriate redirect.
- [ ] **Platform Identity Check**:
    - *Audit*: Inspect the `<html>` or `<body>` tag for `data-platform="desktop"`.
    - *Verification*: Verify that no mobile-only event listeners (e.g., `touchmove` for gestures) are initialized in the browser console.
- [ ] **State Isolation**:
    - *Verification*: Clear `localStorage` and reload. Verify that no mobile-specific keys (like `sc_view` for SideMenu) are recreated.

#### 5.1.3 Visual & Responsive Audit
- [ ] **Breakpoint Hardening**:
    - Resize the browser to < 768px.
    - *Verification*: The desktop layout should persist or handle the small space gracefully (e.g., horizontal scroll) rather than switching back to a mobile shell.
- [ ] **UI De-platforming**:
    - *Audit*: Scan for any remaining "Mobile" terminology in tooltips, aria-labels, or documentation.
    - *Verification*: Ensure Radix-based components (Modals/Popovers) are used instead of any remnants of mobile "Sheets".
- [ ] **Skeleton Parity**: Verify that the new desktop-specific DataTable skeletons are visually consistent with the production density.

### 5.2 Mobile-Only Verification
*Objective: Ensure the application is stripped of all "Dashboard" complexity, behaving as a native-feel PWA that is optimized for hardware scan speed and haptic feedback.*

#### 5.2.1 PWA & Build Excellence
- [ ] **Manifest & Icon Audit**:
    - *Verification*: Confirm `apple-touch-icon.png` and `maskable-icon-v1.png` are present in `dist/`.
    - *Audit*: Inspect `manifest.webmanifest` to ensure it only references mobile assets.
    - *Verification*: Verify `orientation: 'portrait'` is strictly enforced in the PWA configuration.
- [ ] **Entry Hardening**:
    - *Action*: Navigating to any route (including `/desktop-enhanced`) should now only render `MobileApp`.
    - *Audit*: Verify no `desktop.html` or `desktop.js` artifacts exist in the build output.

#### 5.2.2 Hardware & Interaction (Physical Device Required)
- [ ] **Scan Speed & Accuracy**:
    - *Verification*: Test NFC and QR scanning on a physical iOS/Android device.
    - *Metric*: Animation 'E' should play without drop-frames during the scanning state.
- [ ] **Haptic & Sound Feedback**:
    - *Verification*: Success and Error haptic patterns must trigger correctly upon scan result.
    - *Audit*: Verify sound levels are consistent across different mobile OS versions.
- [ ] **Gesture Performance**:
    - *Verification*: Test "Side Menu Drag" and "Filmstrip Transitions".
    - *Audit*: Ensure `touch-action: pan-y` prevents accidental browser pull-to-refresh while dragging elements.

#### 5.2.3 Cinematic & Logic Verification
- [ ] **Offline & Pruning Logic**:
    - *Action*: Disable internet on device. Verify `OfflineToggleFab` appears.
    - *Verification*: Complete 10+ checks offline. Verify they are stored in `localStorage` and marked as `queued`.
    - *Stress Test*: Artificially fill `localStorage` to trigger the `attemptPruneAndSave` logic in `appDataAtoms.ts`.
- [ ] **De-platforming Audit**:
    - *Audit*: Ensure "Supervisor" or "Dashboard" terminology is nowhere in the mobile UI.
    - *Verification*: Verify that `DeveloperModal.tsx` no longer contains "Switch to Desktop" toggles.
- [ ] **Viewport Lock**: Verify that the virtual keyboard does not push the `AppHeader` off-screen, utilizing the `useVisualViewport` hook's metrics.

---

## 6. Execution Timeline & Strategy
*Objective: Transition from a monolithic prototype to two specialized production-ready forks while maintaining a viable rollback path.*

#### 6.1 Preparation & Infrastructure
- [ ] **Snapshot & Safeguard**:
    - [ ] Create git tag: `v0-monorepo-baseline`.
    - [ ] Create branch `fork/desktop-stream` and `fork/mobile-stream`.
- [ ] **Day 0: Shared Extraction (Execute Phase 0)**:
    - [ ] Extract `HeartbeatManager`.
    - [ ] Verify ticker functionality across all views.

- [ ] **Repository Strategy**:
    - *Decision*: Separate Repositories vs. Divergent Branches.
    - *Action*: Update GH Actions/CI pipelines to point to the correct entry points (`index.html` for both, but with different `main.tsx`).

#### 6.2 Phase A: Desktop Divergence (The "Supervisor" Fork)
- [ ] **Day 1: Structural Amputation**: Execute Sections 2.1 & 2.2 (Remove PWA, Mobile Chrome, and Scanning).
- [ ] **Day 2: Hardening**: Execute Section 2.3 (Routing consolidation, Entry linearization).
- [ ] **Day 3: Verification**: Execute Section 5.1 (Build audit, routing check, platform attribute validation).

#### 6.3 Phase B: Mobile Hardening (The "Officer" Fork)
- [ ] **Day 4: Desktop Pruning**: Execute Section 3.1 (Remove `src/desktop`, `src/desktop-enhanced`, and dashboard dependencies).
- [ ] **Day 5: Restoration**: Execute Section 3.2 (PWA re-validation, orientation locks, stable feature flags).
- [ ] **Day 6: Verification**: Execute Section 5.2 (Physical device testing, NFC/QR speed, haptic audit).

#### 6.4 Shared Core Discipline & Maintenance
- [ ] **Dependency Synchronization**: Establish a policy for updating shared packages (React, Radix, Jotai) across both forks to prevent version drift.
- [ ] **Bug-Fix Backporting**:
    - *Action*: Fixes in `src/data/coreAtoms.ts` or `src/components/ActionListItem.tsx` should be cherry-picked into both forks.
- [ ] **Documentation Update**:
    - [ ] Rewrite `README.md` for each fork to reflect its specific identity (e.g., "eProbation: Supervisor Dashboard" vs "eProbation: Officer Scanner").

#### 6.5 Contingency & Rollback
- [ ] **Rollback Triggers**:
    - Build failure on physical mobile devices after purging desktop deps.
    - Unresolved bundle size bloat (Mobile exceeding 2MB initial JS).
- [ ] **Recovery Path**: Revert to `v0-monorepo-baseline` and perform a more conservative "Conditional Display" cleanup instead of a hard delete.

---

## Appendix: Risk Assessment & Strategy Refinement

### A. Overlooked Aspects (Post-Review Audit)

1.  **LocalStorage Key Collision**: Both apps currently share keys (e.g., `sc_config`). Opening both in one browser will cause state clobbering. *Mitigation: Namespace everything.*
2.  **CSS Density Divergence**: Desktop "Enhanced" is optimized for mouse precision. Mobile needs "Officer" ergonomics (large tap targets). *Mitigation: Formalize `desktop-overrides.css` as a structural divergence, not just a patch.*
3.  **Z-Index Layering**: The stacking context for Radix Popovers (Desktop) vs Vaul Drawers (Mobile) may conflict in shared components. *Mitigation: Audit `ToastContainer.tsx` and Portal logic per fork.*
4.  **Global Event Leakage**: Shared hooks using `window` listeners for orientation/keyboard need pruning to prevent Desktop memory leaks.

### B. Unintended Consequences

1.  **Shared Component "Prop Fatigue"**: Shared primitives (`ActionListItem`) will accumulate `isMobile` flags. *Consequence: Increased complexity in "Shared Core" making maintenance harder.*
2.  **Mock Data Schema Drift**: If the Mobile ingest schema evolves but Desktop mocks don't follow, dashboard visualizations will break.
3.  **Dependency Synchronization Debt**: Separate repos will eventually drift in React/Jotai versions, making backporting of shared fixes difficult.
