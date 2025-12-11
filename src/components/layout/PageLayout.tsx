import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageLayoutProps } from "../../types/layout";

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
