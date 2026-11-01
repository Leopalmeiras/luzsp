import type { Metadata } from "next";
import "./styles.css";
export const metadata: Metadata = { title: "Radar Elétrico SP", description: "Inteligência comercial B2B com dados de demonstração" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR" suppressHydrationWarning><body>{children}</body></html>; }
