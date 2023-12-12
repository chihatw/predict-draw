import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./views";

import { configureStore } from "@/application/0-store/store";
import services from "@/infrastructure/services";
import { Provider } from "react-redux";

if (import.meta.env.PROD) {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
  console.warn = () => {};
}

const store = configureStore(services);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = typeof store.dispatch;
