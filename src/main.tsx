import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastProvider } from "./toast/index.tsx";

const cliente = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={cliente}>
        <ChakraProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
