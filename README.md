<!-- # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:
# MinUI

MinUI is a minimalist React component library built with **Vite**, **TypeScript**, and **Tailwind CSS**. It's designed to offer a sleek set of components that are easy to integrate and even easier to customize using Tailwind utility classes.

🌐 **Live Demo:** [https://minui-six.vercel.app](https://minui-six.vercel.app)

## 🚀 Why MinUI?

The goal of MinUI is to:
- Provide clean, accessible components with zero external dependencies
- Allow developers to effortlessly style components using Tailwind's utility-first approach
- Keep the design minimal so you can scale it however you like

## 🛠️ Tech Stack

MinUI is powered by:
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## 💡 Features

- ⚡ Fast and lightweight
- 🎨 Easily theme-able via Tailwind
- 📦 Ready for npm publishing
- 🧱 Built for composability

## 📚 Usage

Coming soon...

_MinUI is still under active development. Installation instructions, component examples, and customization guides will be added soon._

## ✨ Inspiration & Hope

MinUI was born from a desire to make UI development with Tailwind smoother and more joyful. I hope this library becomes a helpful tool for developers looking to create polished, user-friendly interfaces quickly and with full control over styling.

If you find it useful or have ideas for improvement, feel free to share feedback or contribute!
```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
``` -->
