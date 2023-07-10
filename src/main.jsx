import React from "react";
import ReactDOM from "react-dom/client";
<<<<<<< HEAD
// import { Provider } from "react-redux";
// import {store} from "./Redux/Store/index.js";
=======
>>>>>>> caf6db4f0073b4af270ad63662c017f1422fca47
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
<<<<<<< HEAD
  // <Provider store={store}>
    <React.StrictMode>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeContextProvider>
            <App />
          </ThemeContextProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.StrictMode>
  // </Provider>
=======
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
>>>>>>> caf6db4f0073b4af270ad63662c017f1422fca47
);
