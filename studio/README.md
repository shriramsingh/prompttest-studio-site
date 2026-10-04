# PromptTest Studio 📱✨

> **Official Visual Desktop IDE & Interactive Mobile QA Studio for [PromptTest](https://github.com/shriramsingh/prompttest-community)**

PromptTest Studio provides a visual, interactive desktop environment for building, inspecting, and running autonomous mobile tests with plain English.

---

## ⚡ Features

- 📱 **Interactive Live Phone Canvas:** Direct ADB screen mirroring with interactive coordinate tapping and hover highlights.
- 🎯 **Visual Element Inspector:** Hover over native Android buttons, inputs, and text to view resource IDs, bounds, and hierarchy attributes.
- ✨ **Click-to-Prompt Test Generator:** Click any element on screen to automatically generate `Tap "..."`, `Type "..."`, or `Assert "..."` test steps.
- ⏱️ **Real-Time Step Stream:** Live SSE connection streaming test step executions, durations, and pass/fail diagnostics.
- 🕹️ **Virtual Android Navigation Bar:** Hardware Back, Home, and Recents buttons directly in the desktop interface.
- 🔋 **Device Manager & Wake:** Auto-detects connected USB and Wi-Fi devices, with one-click wake & keyguard unlock.

---

## 🛠️ Quick Start (Development)

```bash
# 1. Install dependencies
npm install

# 2. Start development studio (boots in ~50ms)
npm run dev
```

The studio will be live on `http://localhost:5173`, automatically proxying requests to your local PromptTest engine on port `4040`.

### Licensing (offline)

Studio verifies commercial licenses locally with Ed25519 — no network call, works air-gapped.

```bash
npm run license:keygen   # one-time keypair: public key committed, private key written to scripts/.license-keys/ (gitignored)
npm run license:issue -- --customer "Acme Corp" --tier pro --days 365 --out acme.license.json
npm run license:check    # release gate — fails while the committed key is a placeholder
```

Paste the issued key into **Settings → License**. The verification *public* key is committed on
purpose (it is not a secret, so no release build can ship without one); the *private* key must be
moved offline after generation. Full key-handling and rotation rules: `docs/PUBLISHING.md §9.1`.

---

## 📥 Download & Changelog

- **Latest installer (Windows `.exe`):** [prompttest-studio-site → releases/latest](https://github.com/shriramsingh/prompttest-studio-site/releases/latest)
- **What changed in each version:** [release changelog](https://shriramsingh.github.io/prompttest-studio-site/changelog.html)

---

## 🧭 Explore PromptTest Studio

- [Feature tour](https://shriramsingh.github.io/prompttest-studio-site/features.html): What the studio does, screen by screen.
- [Getting started](https://shriramsingh.github.io/prompttest-studio-site/getting-started.html): Install it, connect a device, and run a first test.
- [Downloads](https://shriramsingh.github.io/prompttest-studio-site/downloads.html): Latest Windows installer and every published release.
- [Release changelog](https://shriramsingh.github.io/prompttest-studio-site/changelog.html): What changed in each version.

---

## 📄 License

Proprietary & Confidential — All rights reserved. Copyright (c) 2026 Shriram Singh.
