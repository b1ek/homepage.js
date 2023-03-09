import { createRoot } from "react-dom/client";
import { Base } from './Base';

const container = document.getElementById("resume_js_app");
const root = createRoot(container)
root.render(<Base />);