import { createRoot } from "react-dom/client";
import { Console } from "./Console";

const container = document.getElementById("resume_js_app");
const root = createRoot(container)
root.render(<Console />);