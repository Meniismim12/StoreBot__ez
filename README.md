# 🛍️ Telegram Store & Post Automation Bot

> A robust, type-safe Telegram bot built with **Node.js**, **TypeScript**, and **grammY** (utilizing `@grammyjs/conversations`), designed to interactively manage product listings and seamlessly broadcast them to official Telegram channels.

---

## 🏗️ Technical Stack & Architecture

This project follows a clean, modular structure optimized for type safety, maintainability, and step-by-step user interaction flows (Conversations plugin).

* **Language:** [TypeScript](https://www.typescriptlang.org/) — For strict typing and enhanced developer experience.
* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [grammY](https://grammy.dev/) — A modern, high-performance Telegram bot framework.
* **Flow Control:** `@grammyjs/conversations` — For managing complex multi-step forms (e.g., adding products step-by-step: title, description, price, media).
* **Environment Management:** `dotenv` for secure configuration handling.

---

## 📂 Project Structure

```text
📦 
 ┣ 📂 node_modules
 ┣ 📂 src
 ┃ ┣ 📂 conversations       # Multi-step interactive conversation flows (e.g., product creation wizard)
 ┃ ┃ ┗ 📜 post-product.ts   # Product creation & channel broadcasting logic
 ┃ ┣ 📂 types               # Custom TypeScript definitions & context extensions
 ┃ ┃ ┗ 📜 context.ts        # Custom session and conversation context types
 ┃ ┣ 📜 bot.ts              # Application entry point, middleware & bot initialization
 ┃ ┗ 📜 config.ts           # Environment variables validation & configuration setup
 ┣ 📜 .env                  # Local environment variables (git-ignored)
 ┣ 📜 .env.example          # Template for environment configuration
 ┣ 📜 package-lock.json
 ┣ 📜 package.json          # Dependencies and script scripts
 ┗ 📜 tsconfig.json         # TypeScript compiler options
