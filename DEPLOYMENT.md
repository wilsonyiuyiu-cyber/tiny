# Deployment Guide for Tiny Project 🚀

To put your website online, the recommended platform is **Vercel** (it's the creator of Next.js and has the best support).

### Step 1: Push to GitHub
1. Create a new repository on [GitHub](https://github.com/new).
2. Follow the instructions to push your local code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel
1. Go to [Vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New"** > **"Project"**.
3. Import your GitHub repository.
4. Click **"Deploy"**.
5. Once finished, Vercel will provide you with a `.vercel.app` URL. You can also link a custom domain later.

### Step 3: Handling Images
- Ensure all images (`tiny-human.png` and `memes/*.jpg`) are in the `public/` folder. They will be automatically deployed.

---

### Note on VSCode Errors
- **`globals.css` (@theme/@apply)**: These are just linting warnings because VSCode's CSS engine doesn't fully recognize Tailwind v4 syntax yet. It will **not** affect your site's functionality or deployment.
- **`TinyHuman.tsx`**: I have fixed the syntax errors. The site should now build perfectly.
