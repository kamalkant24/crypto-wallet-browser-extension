import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Router from "./router";
import { HashRouter } from "react-router-dom";
import { LoginContextProvider, useLogin } from "../providers/LoginProvider";

export default function App({ Component, pageProps }: AppProps) {
  const [render, setRender] = useState(false);
  

  useEffect(() => setRender(true), []);


  return render ? (
    <LoginContextProvider>
      <Component {...pageProps} />
    </LoginContextProvider>
  ) : null;
}
