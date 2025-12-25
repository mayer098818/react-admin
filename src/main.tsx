import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import 'antd/dist/reset.css'

import App from "./App.tsx";
import { AppWrapper } from "./common/PageMeta.tsx";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <AppWrapper>
      <App />
    </AppWrapper>
  </StrictMode>
);
