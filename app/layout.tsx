import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import ConvexProvider from "@/components/providers/convex-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Canvasly",
  description:
    "Unleash your team's brainstorming and sketching potential. Canvasly provides a collaborative space for free-flowing ideas and visual exploration, allowing your team to spark creativity and innovation. Seamless Collaboration, Infinite Creativity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <ConvexProvider>{children}</ConvexProvider>
      </body>
    </html>
  );
}
