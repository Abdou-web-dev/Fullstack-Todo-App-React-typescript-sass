import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import { TasksContextProvider } from "./context/ItemsContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <TasksContextProvider>
        <App />
      </TasksContextProvider>
    </Router>
  </React.StrictMode>
);
