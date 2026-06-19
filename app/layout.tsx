import type { Metadata } from "next";
import { Inter, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { EditProvider } from "@/components/EditMode";
import { MusicProvider } from "@/components/MusicContext";
import BackgroundMusic from "@/components/BackgroundMusic";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-sc",
});

export const metadata: Metadata = {
  title: "张攀岳 - 个人网站",
  description: "农学出身 · AI 驱动的产品运营人",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${notoSansSC.variable}`}>
      <body>
        <EditProvider>
          <MusicProvider>
            <BackgroundWrapper>
              {children}
              <BackgroundMusic />
            </BackgroundWrapper>
          </MusicProvider>
        </EditProvider>
      </body>
    </html>
  );
}
