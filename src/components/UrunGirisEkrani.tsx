"use client";
import { useState, useEffect } from "react";

// Dükkan açıldığında otomatik gelecek ürünler
const varsayilanUrunler = [
  { id: "1", isim: "Fındık", fiyat: 800 },
  { id: "2", isim: "Antep Fıstığı", fiyat: 950 },
  { id: "3", isim: "Badem İçi", fiyat: 750 },
  { id: "4", isim: "Kaju", fiyat: 700 }
];

export default function UrunGirisEkrani() {
  const [isim, setIsim] = useState("");
  const [fiyat, setFiyat] = useState("");
  const [liste, setListe] = useState<any[]>([]);

  // OTOMATİK ÇEKME: Uygulama açılır açılmaz hafızaya bak, yoksa varsayılanları yükle
  useEffect(() => {
    const kayitli = localStorage.getItem("atom_urunler");
    if (kayitli) {
      setListe(JSON.parse(kayitli));
    } else {
      setListe(varsayilanUrunler);
      localStorage.setItem("atom_urunler", JSON.stringify(varsayilanUrunler));
    }
  }, []);

  const urunEkle = () => {
    if (!isim || !fiyat) return;
    const yeniListe = [...liste, { id: Date.now().toString(), isim, fiyat: Number(fiyat) }];
    setListe(yeniListe);
    // OTOMATİK KAYIT: Saniyeler içinde hafızaya yazar
    localStorage.setItem("atom_urunler", JSON.stringify(yeniListe));
    setIsim(""); setFiyat("");
  };

  const sil = (id: string) => {
    const yeniListe = liste.filter(item => item.id !== id);
    setListe(yeniListe);
    localStorage.setItem("atom_urunler", JSON.stringify(yeniListe));
  };

  return (
    <div className="space-y-4">
      <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
        <p className="text-xs font-bold text-orange-700 mb-2 uppercase">Hızlı Ürün Ekle</p>
        <div className="flex flex-col gap-2">
          <input value={isim} onChange={(e) => setIsim(e.target.value)} placeholder="Ürün Adı" className="p-3 rounded-xl border-none shadow-inner" />
          <input value={fiyat} onChange={(e) => setFiyat(e.target.value)} type="number" placeholder="Kilo Fiyatı" className="p-3 rounded-xl border-none shadow-inner" />
          <button onClick={urunEkle} className="bg-orange-500 text-white p-3 rounded-xl font-black shadow-md">EKLE</button>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-tighter">Fiyat Listesi (Otomatik Kayıtlı)</h3>
        {liste.map(urun => (
          <div key={urun.id} className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-2">
            <span className="font-bold">{urun.isim}</span>
            <div className="flex items-center gap-4">
              <span className="text-orange-600 font-black">{urun.fiyat} TL</span>
              <button onClick={() => sil(urun.id)} className="text-slate-300 hover:text-red-500">Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}