import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./output.css";
import App from "./App.tsx";
import { PhotoContextProvider } from "./context/PhotoFeedContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <PhotoContextProvider>
            <App />
        </PhotoContextProvider>
    </StrictMode>
);
