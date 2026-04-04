import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// CONTEXT
import { CarrinhoProvider } from "./context/CarrinhoContext";

// ROOT
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CarrinhoProvider>
      <App />
    </CarrinhoProvider>
  </React.StrictMode>
);