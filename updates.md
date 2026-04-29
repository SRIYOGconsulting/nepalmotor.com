## Project Updates (nepalmotor.com)

### 2026-04-29 (Day 06)

#### Progress
- Fixed admin panel errors caused by passing MongoDB/Mongoose objects (ObjectId/Date) from Server Components to Client Components by serializing Exchange EV requests into plain JSON-safe values.
- Improved Admin → Old Cars UI so admins can see user-submitted uploads:
  - Added an Uploads column (document link + photo thumbnails) on the Old Cars table.
  - Enhanced the Edit Old Car page to preview photos and show Open/Download for the document (with image preview when applicable).
- Made admin login more robust by allowing login to work even when only `ADMIN_AUTH_SECRET` is configured.

#### Files touched
- actions/exchangeEV.action.ts
- components/admin/SellCarsTable.tsx
- components/admin/EditSellCarForm.tsx
- app/admin/(panel)/sellcars/page.tsx
- app/admin/(panel)/sellcars/[id]/edit/page.tsx
- app/api/admin/login/route.ts

#### Testing status (from my side)
- Ran `npm run build` successfully (no build errors).

### 2026-04-28 (Day 05)

#### Progress
- Fixed website navigation so menu labels go to the correct pages:
  - Buy Old Cars → used cars listing
  - Sell Old Cars → sell-only form
  - Exchange to EV → exchange (trade-in) flow
- Added a new Sell Old Cars page (sell-only) with a different UI design (not like the Exchange EV form).
- Added a sell-only API route to submit the Sell Old Cars form.
- Improved the admin Sell Cars page so it clearly shows which entries are Inventory, Sell-only, or Exchange.
- Updated the used car details page UI by adding action buttons with icons:
  - Buy Now
  - Book Test Drive
  - Compare
  - Request Callback

#### Files touched
- app/sell-old-cars/page.tsx
- app/api/sell-old-car/route.ts
- components/Header.tsx
- components/SideMenu.tsx
- actions/adminSellCar.action.ts
- app/admin/(panel)/sellcars/page.tsx
- components/admin/SellCarsTable.tsx
- app/sellcars/[id]/page.tsx

#### Testing status (from my side)
- Ran `npm run build` successfully (no build errors).

### 2026-04-27

#### Progress
- Built an admin panel with login and connected it to MongoDB.
- From the admin panel, I can add, update, and manage Car and EV data (including images).
- Connected the Exchange form to MongoDB and stored uploaded files using GridFS.
- Added email notification alerts using Gmail SMTP (Nodemailer).
- Removed dummy data and replaced it with real MongoDB data.
- Added safe seed and reset functions, and tested sample car and EV data successfully in the API.

#### Testing status (from my side)
- The API works well in development.
- Ran `npm run lint` (passed, only warnings about using `<img>`).
- Ran `npm run build` successfully.

#### Pending / Next steps
- Confirm organization production credentials and environment variables (MongoDB, SMTP, file storage/CDN if needed).
