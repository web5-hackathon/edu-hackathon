import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
import Providers from "./providers";
import OCConnectWrapper from "./components/OCConnectWrapper";
import * as dotenv from "dotenv";
dotenv.config();

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const opts = {
    redirectUri: `${baseUrl}/redirect`, // Adjust this URL
  };
  const cookie = headers().get("cookie");
  return (
    <html lang="en">
      <body className={inter.className}>
        <OCConnectWrapper opts={opts} sandboxMode={true}>
          <Providers cookie={cookie}>{children}</Providers>
        </OCConnectWrapper>
      </body>
    </html>
  );
}
