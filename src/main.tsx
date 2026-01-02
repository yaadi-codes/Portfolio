/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                                                                           ║
 * ║                        MALIQUE EDWARDS PORTFOLIO                          ║
 * ║                                                                           ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║                                                                           ║
 * ║  Author:       Malique Edwards                                            ║
 * ║  GitHub:       https://github.com/yaadi-codes                             ║
 * ║  Created:      January 2026                                               ║
 * ║  License:      MIT                                                        ║
 * ║                                                                           ║
 * ║  Description:  Personal portfolio website showcasing web development      ║
 * ║                skills, projects, and professional journey.                ║
 * ║                                                                           ║
 * ║  Built with:   React, TypeScript, Vite                                    ║
 * ║                                                                           ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
