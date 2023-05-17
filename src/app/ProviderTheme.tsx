"use client";
import { ThemeProvider } from "@material-tailwind/react";

export default function ProviderTheme({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
