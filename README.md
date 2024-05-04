# Compose React Providers

Example repository of composing React providers with TypeScript

## Published articles

- [How to compose React Providers with TypeScript - Medium.com](https://fastnguyen.medium.com/how-to-compose-react-providers-with-typescript-8dfd7eede827?source=friends_link&sk=486d6e33fd1a5c1d519f383ec3d65d71
)
- [How to compose React Providers with TypeScript - GitHub](./how-to-compose-react-providers-with-typescript.md)
- [How to compose React Providers with TypeScript - Gist](https://gist.github.com/phatnguyenuit/68122170e317d13e7148c7563be021b6)

## Vite + ReactJS + TypeScript template

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
