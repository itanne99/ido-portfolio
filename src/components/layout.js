import React from "react";
import Head from "next/head";
import TopNavBar from "./top-nav-bar";
import Footer from "./footer";

export default function Layout({ title, description, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="bg-surface text-on-surface min-h-screen overflow-x-hidden selection:bg-primary-fixed-dim selection:text-on-primary-fixed">
        <TopNavBar />
        {children}
        <Footer />
      </div>
    </>
  );
}
