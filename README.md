# Ido Tanne | Full-Stack Developer Portfolio

[![Framework: Next.js](https://img.shields.io/badge/Framework-Next.js-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Style: Tailwind v4](https://img.shields.io/badge/CSS-Tailwind%20v4-blue?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![React: v19](https://img.shields.io/badge/React-v19-blue?style=flat-square&logo=react)](https://react.dev/)
[![Deployment: Vercel](https://img.shields.io/badge/Deployment-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A clean, modern, and high-performance developer portfolio showcasing professional projects, skills, and experience as a Full-Stack Web Developer. 

This project is built using **Next.js (Pages Router)**, styled with **Tailwind CSS v4**, and optimized for fast loading times, rich micro-animations, and seamless deployment to **Vercel**.

---

## 📖 Table of Contents

- [About the Developer](#-about-the-developer)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Running Tests](#-running-tests)
- [Deployment on Vercel](#-deployment-on-vercel)
- [Project Structure](#-project-structure)
- [AI Development Guidelines](#-ai-development-guidelines)
- [License](#-license)

---

## 👤 About the Developer

Ido Tanne is a results-oriented Full-Stack Web Developer with 3+ years of experience building and maintaining high-quality web applications.
- **Experience**: Analyst / Full-Stack Engineer at **Deloitte**.
- **Specializations**: ASP.NET, React, PostgreSQL/MSSQL, Azure DevOps, Okta, and Custom AI Agent/MCP Server integration.
- **Background**: BS in Information Technology from New Jersey Institute of Technology (NJIT).

---

## ✨ Key Features

- **Responsive Design**: Mobile-first grid layouts adjusting beautifully across all devices.
- **Rich Aesthetics**: Harmonious dark-mode/light-mode color palettes, modern typography (Geist Sans/Mono), and subtle micro-animations.
- **Accessibility (a11y)**: Built in accordance with WCAG 2.2 guidelines for screen reader and keyboard compatibility.
- **Modular Codebase**: Highly structured Pages Router layout, clean CSS config, and automated code linting/testing.

---

## 🛠️ Tech Stack

- **Core**: Next.js v16.2.9, React 19, HTML5
- **Styling**: Tailwind CSS v4, PostCSS
- **Testing**: Jest
- **Linting**: ESLint v9
- **Deployment**: Vercel

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js (v18+) and npm installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/itanne99/ido-portfolio.git
   cd ido-portfolio
   ```

2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

3. Run the local development server:
   ```bash
   yarn dev
   # or
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

---

## 🧪 Running Tests

We write logical and unit tests using **Jest** to ensure the stability of core features (API endpoints, state, and parsing logic).

To run the test suite:
```bash
npm test
# or
yarn test
```

---

## 🌐 Deployment on Vercel

This portfolio is configured for zero-config deployment to Vercel:

1. Push your changes to GitHub.
2. Link your repository to a project on the [Vercel Dashboard](https://vercel.com/new).
3. Vercel will auto-detect Next.js and deploy the production build on every push to the `main` branch.

For custom domain configuration or manual deployment:
```bash
npm install -g vercel
vercel
```

---

## 📁 Project Structure

```text
ido-portfolio/
├── public/                 # Static assets (images, logos, icons)
├── src/
│   ├── pages/              # Next.js page views and API routes
│   │   ├── api/            # Serverless API endpoints
│   │   ├── _app.js         # Application layout and global font configurations
│   │   ├── _document.js    # Custom HTML structure (meta, fonts)
│   │   └── index.js        # Main portfolio homepage
│   └── styles/             # Global styles and custom CSS tokens
├── AGENT.MD                # AI developer rules and required skills
├── eslint.config.mjs       # Linting configurations
├── next.config.mjs         # Next.js configurations
└── package.json            # Scripts and dependency versions
```

---

## 🤖 AI Development Guidelines

Any AI agent collaborating on this project must read and adhere to the guidelines set in [AGENT.MD](AGENT.MD). This file defines:
- Required Antigravity skills for UI/UX, security, and accessibility.
- Strict 5-phase development workflow (**Plan** $\rightarrow$ **Generate** $\rightarrow$ **Lint** $\rightarrow$ **Build** $\rightarrow$ **Test**).

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
