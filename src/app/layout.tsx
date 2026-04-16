"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // PWA (Uygulamayı Telefona Kaydetme) Kaydı
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => console.log("Servis İşçisi Hazır: ", reg.scope))
          .catch((err) => console.log("Servis İşçisi Hatası: ", err));
      });
    }
  }, []);

  return (
    <html lang="tr">
      <head>
        {/* Uygulama Başlığı ve Açıklaması */}
        <title>Atom Kardeşler Hesapmatik</title>
        <meta name="description" content="Atom Kardeşler için pratik gramaj hesaplama" />

        {/* PWA Ayarları - Manifest Dosyasını Bağlıyoruz */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f97316" />
        
        {/* iOS (iPhone) İçin Özel Ayarlar */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AtomHesap" />
        <link rel="apple-touch-icon" href="/icon.png" />

        {/* MOBİL EKRAN AYARI: Yakınlaştırmayı (zoom) engeller, tam uygulama hissi verir */}
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover" 
        />
      </head>
      <body className={`${inter.className} overscroll-none antialiased`}
      suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}