import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeContextProvider } from "./theme/ThemeModeContext.jsx";
import ErrorBoundary from "./app/utils/ErrorBoundary.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
  </Provider>
);
