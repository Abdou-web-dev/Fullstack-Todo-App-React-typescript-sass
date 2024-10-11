This is a Todo application built with React, TypeScript, and Vite.

Prerequisites
Before running this project locally, ensure you have the following installed on your machine:

Node.js (v14.x or later)
npm (v6.x or later)

Getting Started
Follow the steps below to run the Todo app locally:

1. Clone the Repository
2. 

   # git clone https://github.com/Abdou-web-dev/Fullstack-Todo-App-React-typescript-sass.git

3. Navigate to the Project Directory

   # cd todo-app-test-sobr-git

4. Install Dependencies

   # npm install

5. Start the Development Server

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



Some screenshots of the app's UI : 
![image](https://github.com/user-attachments/assets/c6315fd0-e2c8-449b-9281-2ceb837cde1e)
![image](https://github.com/user-attachments/assets/f40de9b8-e185-49b7-ba6e-23da2c3bcb68)
![image](https://github.com/user-attachments/assets/cf3ac67d-4b17-405a-8385-51ba434b19a7)
![image](https://github.com/user-attachments/assets/ae7bf482-60f2-4065-b48f-0ce909bd7e74)
![image](https://github.com/user-attachments/assets/829edf27-7a5a-48fb-9e82-02bc69cc215a)
![image](https://github.com/user-attachments/assets/603ba0a0-3dda-4a6c-af69-4af51185d37c)
![image](https://github.com/user-attachments/assets/b56c37a9-dd65-4244-9f0b-13782f0de87c)
![image](https://github.com/user-attachments/assets/3335d64c-0269-46a0-ac2c-82ea9a17bb46)
![image](https://github.com/user-attachments/assets/6cb7a44f-e9cc-4d51-b094-f835cb325eaf)
![image](https://github.com/user-attachments/assets/b60fb6eb-70f2-4180-aebb-6e398264325d)
![image](https://github.com/user-attachments/assets/fbcfa469-ce5d-40a8-9f67-c9ca0a3a2fcc)
![image](https://github.com/user-attachments/assets/2c3b0bf9-9796-46fa-880b-e4d546114e0f)





















