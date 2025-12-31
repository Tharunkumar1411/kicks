import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import { initAuthListener } from "./utils/authInitilizer";

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

initAuthListener();

root.render(<App />);
