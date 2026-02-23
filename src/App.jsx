import React, { useState } from "react";
import { ThemeProvider } from "./ThemeContext";
import WelcomePage from "./pages/WelcomePage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  const [page, setPage] = useState("welcome");

  return (
    <ThemeProvider>
      {page === "welcome" ? (
        <WelcomePage onGetStarted={() => setPage("dashboard")} />
      ) : (
        <DashboardPage onBack={() => setPage("welcome")} />
      )}
    </ThemeProvider>
  );
}
