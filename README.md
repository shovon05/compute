# compute
### A Foundational Java Project: Collaborative Scientific Calculator

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Language](https://img.shields.io/badge/language-Java%20%7C%20JavaScript-orange) ![Status](https://img.shields.io/badge/status-Active-green)

**[Live Web Demo](https://shovon05.github.io/compute/)**

---

## 📖 About
**compute** is a dual-implementation calculator project designed to foster collaboration and explore algorithm design. It demonstrates the **Shunting-Yard Algorithm** implemented in two environments:
1.  **Web (Frontend):** A responsive, Material Design web app hosted on GitHub Pages.
2.  **Java (Backend):** A robust Java implementation for desktop or server-side usage.

This project serves as a solid foundation for developers looking to understand parsing, stack-based evaluation, and UI/UX design.

---

## ✨ Features
* **Scientific Operations:** Supports trigonometric functions (`sin`, `cos`, `tan`), exponents (`^`), and basic arithmetic.
* **Smart Parsing:** Uses a custom recursive parser/Shunting-Yard algorithm to handle operator precedence (e.g., `3 + 5 * 2 = 13`).
* **Material Design UI:** Features a modern "Dark Mode" interface with neumorphic button styles, soft shadows, and responsive layout.
* **Hybrid Architecture:**
    * **JavaScript:** Runs the live web version.
    * **Java:** runs the core backend logic (located in `backend-java/`).

---

## 📂 Project Structure
The repository is organized to separate the web deployment from the core Java logic:

```text
compute/
├── index.html              # Web Interface (Main Entry)
├── style.css               # Material Design Styling
├── app.js                  # JavaScript Logic (Shunting-Yard Port)
├── backend-java/           # Original Java Implementation
│   ├── ExpressionEvaluator.java  # Core Java Logic
│   └── ...
└── README.md