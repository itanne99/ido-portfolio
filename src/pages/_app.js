import "@/styles/globals.css";
import dynamic from "next/dynamic";
import { AlertProvider } from "@/context/alert-context";
import { Analytics } from "@vercel/analytics/next"

const Agentation = dynamic(
  () => import("agentation").then((module) => module.Agentation),
  { ssr: false }
);

export default function App({ Component, pageProps }) {
  return (
    <AlertProvider>
      <Component {...pageProps} />
      {process.env.NODE_ENV === "development" && <Agentation />}
      <Analytics />
    </AlertProvider>
  );
}
