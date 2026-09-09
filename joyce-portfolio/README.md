# Joyce Alam — Portfolio

A one-page portfolio built from your CV: React + Vite, Tailwind CSS for styling, and a Three.js
network animation in the hero section (nodes/edges — a nod to full-stack + the AI interaction
model on your CV). Sections: Hero, Experience, Skills, Education & Certifications, Contact.

## 1. Run it locally

You need [Node.js](https://nodejs.org) 18+ installed. Then, in this folder:

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`). Edit and save any file — the page
updates instantly.

## 2. Edit your content

Everything from your CV lives in one file: **`src/data/cvData.js`**. To update your summary,
jobs, skills, education, or certifications, edit that file only — you don't need to touch any
component. The whole site re-reads from it automatically.

Colors and fonts live in **`tailwind.config.js`** under `theme.extend`. The current palette:

| Token    | Hex       | Used for                       |
|----------|-----------|---------------------------------|
| `void`   | `#080B14` | Background                      |
| `panel`  | `#0E1424` | Card backgrounds                |
| `line`   | `#1D2740` | Borders, dividers                |
| `signal` | `#4FE0D8` | Cyan accent (CTAs, highlights)  |
| `pulse`  | `#8E7CFF` | Violet accent (secondary)       |
| `ink`    | `#E7ECF7` | Primary text                    |
| `mute`   | `#7C8AAD` | Secondary text                  |

## 3. Build for production

```bash
npm run build
```

This creates a `dist/` folder with the finished static site (HTML, CSS, JS). That folder is
what you deploy.

## 4. Deploy it

The easiest options for a static Vite site — pick one:

### Option A — Vercel (recommended, free, connects to GitHub)
1. Push this folder to a GitHub repository (create one on github.com, then from this folder:
   `git init && git add . && git commit -m "portfolio" && git remote add origin <your-repo-url> && git push -u origin main`).
2. Go to [vercel.com](https://vercel.com), sign up/log in with GitHub.
3. Click **Add New → Project**, select your repository.
4. Vercel auto-detects Vite. Leave the defaults (Build command `npm run build`, Output
   directory `dist`) and click **Deploy**.
5. You'll get a live URL like `joyce-alam-portfolio.vercel.app` in about a minute. You can later
   attach a custom domain for free under Project → Settings → Domains.

### Option B — Netlify (also free, drag-and-drop option)
1. Run `npm run build` locally to generate `dist/`.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag the `dist` folder in.
3. Netlify gives you a live URL immediately. For updates, either re-drag `dist` after each
   build, or connect a GitHub repo the same way as the Vercel steps above for automatic deploys.

### Option C — GitHub Pages (free, no separate host account)
1. Push the project to GitHub (same as step 1 above).
2. In `vite.config.js`, add your repo name as the base path:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/your-repo-name/',
   })
   ```
3. Install the deploy helper and add a script:
   ```bash
   npm install gh-pages --save-dev
   ```
   Add to `package.json` scripts: `"deploy": "npm run build && npx gh-pages -d dist"`
4. Run `npm run deploy`. Your site publishes to
   `https://<your-username>.github.io/<your-repo-name>/`.

For a personal portfolio, Vercel is the simplest: it deploys automatically every time you push
to GitHub, includes HTTPS, and free custom domains.

## 5. Connect a custom domain (optional)

Buy a domain (Namecheap, Google Domains, GoDaddy — a `.dev` or `.me` domain suits a developer
portfolio well), then in Vercel or Netlify go to your project's domain settings, add the domain,
and update your DNS records as instructed. Propagation usually takes under an hour.

## 6. Project structure

```
joyce-portfolio/
├── src/
│   ├── data/cvData.js       ← your CV content — edit this
│   ├── components/
│   │   ├── Nav.jsx
│   │   ├── Hero.jsx         ← headline + 3D network background
│   │   ├── Scene3D.jsx      ← the Three.js animation
│   │   ├── Experience.jsx
│   │   ├── Skills.jsx
│   │   ├── Education.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
└── package.json
```

## Notes

- The 3D scene is lazy-loaded so the rest of the page renders instantly even on slower
  connections.
- Motion respects `prefers-reduced-motion` for accessibility.
- Everything is responsive down to mobile; the nav collapses its links below `sm` breakpoint (you
  may want to add a mobile menu button if you plan on adding more links later).
