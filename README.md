# siwi — Static JSON Resume Viewer (Schaltstelle Edition)

[![GitHub Pages](https://img.shields.io/github/deployments/schaltstelle/siwi/github-pages?label=deployed)](https://schaltstelle.github.io/siwi/)
![Next.js](https://img.shields.io/badge/Next.js-15-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-%2317B1B8?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)
[![Contributors](https://img.shields.io/github/contributors/schaltstelle/siwi)](https://github.com/schaltstelle/siwi/graphs/contributors)
![MIT License](https://img.shields.io/github/license/schaltstelle/siwi)

This project renders CVs using the [JSON Resume format](https://jsonresume.org/) + Next.js, styled with Tailwind and deployed as a **static site** on **GitHub Pages**.  
Built for maximum nerd-friendliness, modularity, and zero config onboarding.

---

## Projekt starten / kompilieren

```bash
npm install
npm run build
npm run start
```

Rufe die App auf unter:

```
http://localhost:3000/siwi
```

> Der `basePath` ist `/siwi`, weil das Projekt unter `https://schaltstelle.github.io/siwi/` läuft.

---

## Neues CV hinzufügen

1. **Repo klonen:**

```bash
git clone https://github.com/schaltstelle/siwi.git
cd siwi
```

2. **Folgende Dateien hinzufügen in** `/public/resumes/`:

```bash
alex.png       # Bild (wird als Profilbild angezeigt)
alex.json      # JSON-Resume (https://jsonresume.org/)
```

Die URL zum Rendern des CVs ist:
```
https://schaltstelle.github.io/siwi/resumes/alex/themes/schaltstelle
```

3. **Statische Routen registrieren**

In der Datei:  
`app/resumes/[resumeid]/themes/[themeid]/page.tsx`  
anpassen:

```ts
export async function generateStaticParams() {
  return [
    { resumeid: 'alex', themeid: 'schaltstelle' },
    // weitere Lebensläufe hier ergänzen...
  ]
}
```

Nur hier definierte Kombinationen werden beim Build exportiert!

4. **Build & Deploy für GitHub Pages**

```bash
npm run build
git add .
git commit -am "cv added"
git push origin main
```

**Warte ~1 Minute und trink einen Kaffee**, bis GitHub Pages deployed hat.  
Dann öffne deinen finalen Link:

```
https://schaltstelle.github.io/siwi/resumes/alex/themes/schaltstelle
```

---

## Sonstiges

- Bilder werden automatisch relativ zum `basePath` geladen → z. B. `/siwi/resumes/alex.png`
- Die App unterstützt Themes, aktuell z. B. `schaltstelle`
- Der Export ist statisch (`output: 'export'`), kein SSR → `getServerSideProps` o.Ä. wird **nicht** unterstützt
- Deployment erfolgt via GitHub Actions mit [`peaceiris/actions-gh-pages`](https://github.com/peaceiris/actions-gh-pages)

---

## Beispiel-Link

> [`https://schaltstelle.github.io/siwi/resumes/alex/themes/schaltstelle`](https://schaltstelle.github.io/siwi/resumes/alex/themes/schaltstelle)

---

Happy CV-ing
Made with 💙 by [Alex](https://github.com/leantrace)
