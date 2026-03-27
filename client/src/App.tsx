import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// Use Vite's base URL for GitHub Pages (/startsuite-brand-hq) vs local dev (/)
const basePath = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Toaster />
          <Router base={basePath}>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/404" component={NotFound} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
