import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeContextProvider } from "./theme/ThemeModeContext.jsx";
import ErrorBoundary from "./app/utils/ErrorBoundary.jsx";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeContextProvider>
<<<<<<< HEAD
            <App />
=======
          <App />
>>>>>>> f6de41a995c1bf692dd5e1645e796d11aa203cd9
        </ThemeContextProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
