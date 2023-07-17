import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Redux/Store/store.js";
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
       <Provider store={store}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeContextProvider>
            <App />
          </ThemeContextProvider>
        </QueryClientProvider>
      </ErrorBoundary>
        </Provider>
    </React.StrictMode>
 
);
