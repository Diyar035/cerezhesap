"use client";
import { useState } from "react";
// Senin oluşturduğun dosyaları buraya çağırıyoruz (Import ediyoruz)
import HesapEkrani from "@/components/HesapEkrani";
import UrunGirisEkrani from "@/components/UrunGirisEkrani";

export default function Home() {
  const [aktifEkran, setAktifEkran] = useState<"hesap" | "ayarlar">("hesap");

  return (
    <main className="min-h-screen bg-slate-100 p-4 font-sans text-slate-900">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-black text-center mb-6 text-orange-600">
          ATOM KARDEŞLER <span className="text-slate-800 text-xs block tracking-widest uppercase">Hesapmatik</span>
        </h1>
        
        {/* Sekme Değiştirme Butonları */}
        <div className="flex gap-2 mb-6 bg-white p-1 rounded-2xl shadow-sm">
          <button 
            onClick={() => setAktifEkran("hesap")}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${aktifEkran === "hesap" ? "bg-orange-500 text-white shadow-md" : "text-slate-500"}`}
          >
            HESAPLA
          </button>
          <button 
            onClick={() => setAktifEkran("ayarlar")}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${aktifEkran === "ayarlar" ? "bg-slate-800 text-white shadow-md" : "text-slate-500"}`}
          >
            ÜRÜN GİRİŞİ
          </button>
        </div>

        {/* Seçilen Ekrana Göre İçerik */}
        <div className="bg-white rounded-3xl shadow-xl p-6 min-h-[400px]">
          {aktifEkran === "hesap" ? <HesapEkrani /> : <UrunGirisEkrani />}
        </div>
      </div>
    </main>
  );
}