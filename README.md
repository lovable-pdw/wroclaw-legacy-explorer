# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c2962617-ed06-4a93-8ce8-a1a5d1558a9e

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c2962617-ed06-4a93-8ce8-a1a5d1558a9e) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev

# Step 5: In a separate terminal, start the backend server.
npm run server
```

### Backend Server

This project includes a Node.js/Express backend server in the `/server` directory to handle PayU API interactions.

To run the backend server:
```sh
npm run server
```
Or for development with auto-reloading (if you have `nodemon` installed globally or add it to project devDependencies):
```sh
npm run dev:server
```

**Important: PayU Configuration**

The backend server requires PayU API credentials to be configured via environment variables:
- `PAYU_APP_ID`: Your PayU Application ID.
- `PAYU_PRIVATE_KEY`: Your PayU Private Key.
- `PAYU_ENV`: Set to `test` for testing environment or `live` for production. (Defaults to `test` if `NODE_ENV` is not `production`).

Create a `.env` file in the `/server` directory (this file is gitignored):
```
PAYU_APP_ID=your_app_id_here
PAYU_PRIVATE_KEY=your_private_key_here
PAYU_ENV=test
```
Remember to replace placeholders with your actual PayU credentials. The frontend also requires a `PAYU_PUBLIC_KEY` to be set in `src/pages/Booking.tsx` and the correct PayU Secure Fields SDK URL in `index.html`.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c2962617-ed06-4a93-8ce8-a1a5d1558a9e) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
