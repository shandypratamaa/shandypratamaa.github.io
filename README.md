# Shandy Putra — Portfolio

A responsive portfolio built with React, TypeScript, and Vite. It presents the verified achievement inventory supplied with the build specification and provides dedicated routes for work and personal interests.

## Run locally

```sh
npm install   # once, after opening this project folder in a terminal
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173). Keep the terminal running while you browse; press `Ctrl+C` there when you want to stop the local site. Opening `index.html` directly will not work because the site uses Vite and client-side routes.

Create a production build with `npm run build`; preview it locally with `npm run preview`.

## Update content

- Edit achievement records and category labels in `src/content/achievements.ts`.
- Keep each public fact limited to what has been confirmed. The repeated 2024 IRCYS Bronze Medal line in the source inventory was deduplicated and appears once.
- Project, research, personal essay, contact, and travel photos are not supplied yet. The `/travel` page preserves the provided order: Bali, Lombok, The Netherlands, Barcelona (also Madrid), and Singapore.
- The About page has a placeholder section for the essay you plan to upload.
- The header navigation jumps to corresponding sections on the homepage from any route; the logo returns to the homepage top.
- Sections, travel stops, cards, and achievement rows animate as they enter or leave the viewport. Motion is disabled when reduced motion is requested and content remains available if the reveal observer is unsupported.
- The homepage hero photo is `public/images/hero/portfolio-hero.webp`; replace that file to update the main portrait. Other feature pages still use CSS artwork until personal photos are supplied.
- Avoid publishing certificates until they have been reviewed for private details.
- The footer must remain exactly `Shandy Putra (2026)`.

## Routes

`/`, `/about`, `/achievements`, `/projects`, `/research`, `/automotive`, `/aviation`, `/badminton`, `/travel`, `/technology`, and `/contact`.

## GitHub and Vercel

1. Choose a GitHub repository name and public domain, then create or connect the repository from this folder. Review the diff and ensure no private certificate scans or secrets are committed.
2. Import that repository into Vercel. Vercel should detect Vite; use `npm run build` and `dist` as the output directory.
3. Review the shareable Preview deployment for content, images, privacy, accessibility, and direct-route refreshes before promoting to Production.
4. Add the final public domain to `public/sitemap.xml` once it is chosen, and update `robots.txt` to reference that sitemap. A domain is intentionally not guessed here.

`vercel.json` rewrites app routes to the SPA entry point so direct route visits and refreshes work. No backend, contact form, API keys, or third-party font requests are used.
