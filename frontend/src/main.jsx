import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/store.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThmemeProvider from "./components/tmemeProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ThmemeProvider>
          <App />
        </ThmemeProvider>
      </Provider>
    </PersistGate>
  </BrowserRouter>
);
