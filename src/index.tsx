import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/Store";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  // </React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Provider>
  </BrowserRouter>
  // <React.StrictMode>

);

reportWebVitals();
