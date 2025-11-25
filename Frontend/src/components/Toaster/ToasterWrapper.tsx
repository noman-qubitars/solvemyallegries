"use client";

import { ToasterProvider } from "./Toaster";

export default function ToasterWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ToasterProvider>{children}</ToasterProvider>;
}

