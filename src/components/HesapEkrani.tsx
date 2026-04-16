"use client";
import { useState, useEffect } from "react";

interface SepetItem {
  id: string;
  isim: string;
  fiyat: number;
  tutar: number;
  gram: number;
}

export default function HesapEkrani() {
  const [urunler, setUrunler] = useState<{ isim: string; fiyat: number }[]>([]);
  const [seciliUrun, setSeciliUrun] = useState<{ isim: string; fiyat: number } | null>(null);
  const [tutar, setTutar] = useState("");
  const [gramaj, setGramaj] = useState("");
  const [sepet, setSepet] = useState<SepetItem[]>([]);
  const [hesapTuru, setHesapTuru] = useState<"TL-GR" | "GR-TL">("TL-GR");

  useEffect(() => {
    const veri = localStorage.getItem("atom_urunler");
    if (veri) setUrunler(JSON.parse(veri));
  }, []);

  const sepeteEkle = () => {
    if (!seciliUrun) return;
    
    let hesaplananGram = 0;
    let hesaplananTutar = 0;

    if (hesapTuru === "TL-GR" && tutar) {
      hesaplananTutar = Number(tutar);
      hesaplananGram = Math.round((hesaplananTutar / seciliUrun.fiyat) * 1000);
    } else if (hesapTuru === "GR-TL" && gramaj) {
      hesaplananGram = Number(gramaj);
      hesaplananTutar = Number(((hesaplananGram / 1000) * seciliUrun.fiyat).toFixed(2));
    } else {
      return;
    }

    const yeniItem: SepetItem = {
      id: Date.now().toString(),
      isim: seciliUrun.isim,
      fiyat: seciliUrun.fiyat,
      tutar: hesaplananTutar,
      gram: hesaplananGram
    };

    setSepet([yeniItem, ...sepet]);
    setTutar("");
    setGramaj("");
  };

  const toplamGram = sepet.reduce((acc, item) => acc + item.gram, 0);
  const toplamTutar = sepet.reduce((acc, item) => acc + item.tutar, 0);

  return (
    <div className="space-y-6">
      {/* Ürün Seçimi */}
      <div className="grid grid-cols-2 gap-2">
        {urunler.map((u, i) => (
          <button 
            key={i} 
            onClick={() => {setSeciliUrun(u); setTutar(""); setGramaj("");}} 
            className={`p-3 rounded-xl border-2 transition-all font-bold text-sm ${seciliUrun?.isim === u.isim ? "border-orange-500 bg-orange-50 text-orange-600" : "border-slate-100 bg-white text-slate-600"}`}
          >
            {u.isim}
          </button>
        ))}
      </div>

      {seciliUrun && (
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex bg-white p-1 rounded-xl border border-slate-200">
            <button onClick={() => setHesapTuru("TL-GR")} className={`flex-1 py-2 rounded-lg text-xs font-bold ${hesapTuru === "TL-GR" ? "bg-orange-500 text-white" : "text-slate-400"}`}>TL ➔ GRAM</button>
            <button onClick={() => setHesapTuru("GR-TL")} className={`flex-1 py-2 rounded-lg text-xs font-bold ${hesapTuru === "GR-TL" ? "bg-slate-800 text-white" : "text-slate-400"}`}>GRAM ➔ TL</button>
          </div>

          <div className="flex flex-col gap-3">
            <input 
              value={hesapTuru === "TL-GR" ? tutar : gramaj} 
              onChange={(e) => hesapTuru === "TL-GR" ? setTutar(e.target.value) : setGramaj(e.target.value)} 
              type="number" 
              placeholder={hesapTuru === "TL-GR" ? "Kaç TL'lik?" : "Kaç Gram?"}
              className="w-full text-2xl font-bold p-4 rounded-xl border-2 border-orange-200 outline-none focus:border-orange-500 shadow-inner"
            />
            <button onClick={sepeteEkle} className="w-full bg-orange-500 text-white py-4 rounded-xl font-black shadow-lg text-lg">LİSTEYE EKLE</button>
          </div>
        </div>
      )}

      {/* Sepet Listesi */}
      <div className="space-y-2">
        {sepet.map((item) => (
          <div key={item.id} className="flex justify-between items-center bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
            <div>
              <span className="font-bold text-slate-800">{item.isim}</span>
              <span className="text-xs text-slate-400 block">{item.tutar} TL / {item.gram} gr</span>
            </div>
            <button onClick={() => setSepet(sepet.filter(i => i.id !== item.id))} className="text-red-400 font-bold px-2 text-xl">×</button>
          </div>
        ))}
      </div>

      {/* Toplam Barı */}
      {sepet.length > 0 && (
        <div className="sticky bottom-0 bg-slate-800 text-white p-6 rounded-3xl shadow-2xl border-4 border-orange-500">
          <div className="flex justify-between items-center mb-2 border-b border-slate-700 pb-2">
            <span className="text-xs font-bold opacity-60">TOPLAM TUTAR:</span>
            <span className="text-xl font-black text-orange-400">{toplamTutar.toFixed(2)} TL</span>
          </div>
          <div className="text-center">
            <span className="text-xs font-bold opacity-60 block">TERAZİYE KOY:</span>
            <span className="text-5xl font-black">{toplamGram} <small className="text-xl italic">gr</small></span>
          </div>
          <button onClick={() => setSepet([])} className="w-full mt-4 text-[10px] opacity-40 uppercase font-bold">Listeyi Temizle</button>
        </div>
      )}
    </div>
  );
}