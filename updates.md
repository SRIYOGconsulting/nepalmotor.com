## Project Updates (NepalMotor)

Date: 2026-04-27

### What I completed

- I created an admin panel with login and connected it to MongoDB.
- From the admin panel, I can add, edit, and manage Car and EV data (including images).
- I connected the Exchange form to MongoDB.
- I saved uploaded Exchange files using GridFS.
- I added email alerts using Gmail (Nodemailer).
- I removed dummy data and now the website uses real data from MongoDB.
- I added safe seed and reset functions for database setup.
- I added sample Car and EV data to MongoDB and tested the API.

### Testing status (from my side)

- The API works well in development.
- I ran `npm run lint` and it passed (only warnings about using `<img>`).
- I ran `npm run build` and the build finished successfully.
- During build, MongoDB Atlas connection failed because the current IP is not whitelisted. This will be fixed after we get the organization MongoDB details/access.

### Pending / Next steps

- After this, we need organizational details for MongoDB, Cloudinary, and other production services (credentials, access, and environment variables).
