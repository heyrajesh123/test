import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GameVault – Discover the Best Games",
  description: "Hand-picked collection of premium games. Find your next favorite adventure.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
