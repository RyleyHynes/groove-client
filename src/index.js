import './custom.scss';
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Groove } from './Groove';
import "./index.css"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <Groove />
    </BrowserRouter>
)

