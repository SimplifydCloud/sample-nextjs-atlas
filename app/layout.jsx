import "./style.css";
export const metadata = {
  title: "Atlas — A weekend somewhere new",
  description:
    "Six African cities. A thousand possible weekends. A Next.js sample by Simplifyd Cloud.",
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
