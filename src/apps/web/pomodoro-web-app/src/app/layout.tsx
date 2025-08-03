import type { Metadata } from "next";
import "../styles/globals.css";
import React from "react";
import Header from "@/components/header/Header/Header";
import Footer from "@/components/footer/Footer/Footer";
import Container from "@/components/containers/Container/Container";
import {cn} from "@/libs/utils";
import Bootstrap from "@/components/bootstrap/Bootstrap";

export const metadata: Metadata = {
    title: "Pomodoro Tracker - удобное приложение для управления задачами",
    description: "Pomodoro Tracker — удобное веб-приложение для управления задачами и концентрации " +
      "с помощью техники Pomodoro. Планируйте работу, отслеживайте время и улучшайте продуктивность.",
    icons: {
        icon: [
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon.ico' }, // fallback
        ],
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
          <body
            className={`
              antialiased 
              flex
              flex-col
              min-h-screen
              `
          }
          >
            <Bootstrap />
            <Header />
            <main className={cn("flex-grow")}>
                <Container>
                    {children}
                </Container>
            </main>
            <Footer />
          </body>
        </html>
    );
}
