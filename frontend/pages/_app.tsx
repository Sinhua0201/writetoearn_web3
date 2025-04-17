import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.css";
import RainbowKitAppProvider from "./_rainbowkit";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RainbowKitAppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RainbowKitAppProvider>
  );
}
