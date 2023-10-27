import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import TopBar from "@/components/TopBar";
import { RoomIDProvider } from "../../RoomIDContext";
import {TokenProvider} from '../../TokenContext'
import { SupabaseProvider } from '../../RealtimeContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ludo Mania",
  description: "Play and Earn cash on Ludo Mania.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <SupabaseProvider>
      <RoomIDProvider>
        <html lang="en">
          <body className={inter.className}>
            {/* <Background /> */}
            <TopBar />
            <div className="mt-28 mb-16">{children}</div>
          </body>
        </html>
      </RoomIDProvider>
      </SupabaseProvider>
    </ClerkProvider>
  );
}
