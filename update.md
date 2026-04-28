## 2026-04-28 (Today)

### What I changed
- Fixed website navigation so menu labels go to the correct pages:
  - Buy Old Cars → used cars listing
  - Sell Old Cars → sell-only form
  - Exchange to EV → exchange (trade-in) flow
- Added a new Sell Old Cars page (sell-only) with its own design (not like the Exchange EV form).
- Added a sell-only API route to submit the Sell Old Cars form.
- Improved the admin Sell Cars page so it clearly shows which entries are:
  - Inventory (added by admin)
  - Sell-only submissions
  - Exchange submissions (linked to exchange requests)
- Updated the used car details page UI by adding an action button section with icons:
  - Buy Now
  - Book Test Drive
  - Compare
  - Request Callback

### Files touched
- app/sell-old-cars/page.tsx
- app/api/sell-old-car/route.ts
- components/Header.tsx
- components/SideMenu.tsx
- actions/adminSellCar.action.ts
- app/admin/(panel)/sellcars/page.tsx
- components/admin/SellCarsTable.tsx
- app/sellcars/[id]/page.tsx

### Quick verification
- Ran `npm run build` successfully (no build errors).
