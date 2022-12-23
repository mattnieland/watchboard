// React
import React from "react";
import ReactDOM from "react-dom/client";
// Sentry
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
// Routing
import { BrowserRouter } from "react-router-dom";
// PWA : Service Workers
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
// Web Vitals
import reportWebVitals from "./reportWebVitals";
// Global - App Base
import AppBase from "base";
import Page404 from "pages/404";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  environment: process.env.REACT_APP_ENVIRONMENT?.toLowerCase() || "dev",
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Sentry.ErrorBoundary fallback={<Page404 />} showDialog>
    <React.StrictMode>
      <BrowserRouter>
        <AppBase />
      </BrowserRouter>
    </React.StrictMode>
  </Sentry.ErrorBoundary>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
