# 🌿 Farm to Yaad

A hyper-local Jamaican marketplace connecting farmers, butchers, and food producers directly with consumers. No middlemen.

## Live App

**[yourusername.github.io/farm-to-yaad](https://yourusername.github.io/farm-to-yaad)**

## Roles

| Role | Access |
|------|--------|
| Buyer | Browse products, place orders, choose Yaad Stop |
| Farmer | List products, manage inventory, view orders |
| Admin | Create Yaad Stops, verify farmers, manage all orders |

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173/farm-to-yaad/](http://localhost:5173/farm-to-yaad/)

## Deploy

Push to `main` — GitHub Actions builds and deploys automatically to GitHub Pages.

## Stack

- React 18 + Vite
- Hosted on GitHub Pages
- GitHub Actions for CI/CD
- Airtable (Phase 2 — real data)
- WhatsApp Bot (Phase 2 — farmer listings via chat)

## Repo Structure

```
farm-to-yaad/
├── .github/workflows/deploy.yml   ← Auto-deploy to Pages
├── public/404.html                ← SPA routing fix
├── src/
│   ├── main.jsx                   ← React entry
│   ├── App.jsx                    ← Full application
│   └── index.css                  ← Global reset
├── index.html
├── vite.config.js                 ← base path set for Pages
└── package.json
```
