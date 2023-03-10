import { createRoot } from "react-dom/client";
import { Base } from './Base';

setTimeout(() => {
    document.getElementById('resume_js_app').innerHTML = '';
    const container = document.getElementById("resume_js_app");
    const root = createRoot(container)
    root.render(<Base />);
}, (Math.random() * 200) + 500)