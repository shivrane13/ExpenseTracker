import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { GlobalStyle } from "./ui/GlobalStyles.js";

import store from "./store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
