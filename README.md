This is a Todo application built with React, TypeScript, and Vite.

Prerequisites
Before running this project locally, ensure you have the following installed on your machine:

Node.js (v14.x or later)
npm (v6.x or later)

Getting Started
Follow the steps below to run the Todo app locally:

1. Clone the Repository

   # git clone [https://github.com/Abdou-web-dev/todo-app-test-sobr-git.git](https://github.com/Abdou-web-dev/Fullstack-Todo-App-React-typescript-sass.git)

2. Navigate to the Project Directory

   # cd todo-app-test-sobr-git

3. Install Dependencies

   # npm install

4. Start the Development Server

   # npm run dev

This will start the development server and open the app in your default web browser. If it doesn't open automatically, you can access the app by navigating to http://localhost:5173/ in your browser.

## Expanding the ESLint configuration

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
