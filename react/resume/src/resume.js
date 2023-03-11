import { createRoot } from "react-dom/client";
import { Base } from './Base';
import './Style.css';

setTimeout(() => {
    document.getElementById('resume_js_app').innerHTML = '';
    const container = document.getElementById("resume_js_app");
    const root = createRoot(container)
    root.render(<Base />);
}, (Math.random() * 50) + 50)