"use client";
import { useState, useEffect } from "react";

export default function UrunGirisEkrani() {
  const [isim, setIsim] = useState("");
  const [fiyat, setFiyat] = useState("");
  const [liste, setListe] = useState<any[]>([]);

  // HAFIZADAN ÇEKME: Sadece senin eklediklerin gelir
  useEffect(() => {
    const kayitli = localStorage.getItem("atom_urunler");
    if (kayitli) {
      setListe(JSON.parse(kayitli));
    } else {
      setListe([]); // Eğer hafıza boşsa, hiçbir şey getirme
    }
  }, []);

  const urunEkle = () => {
    if (!isim || !fiyat) return;
    const yeniListe = [...liste, { id: Date.now().toString(), isim, fiyat: Number(fiyat) }];
    setListe(yeniListe);
    
    // KAYIT: Tarayıcı hafızasına yaz
    localStorage.setItem("atom_urunler", JSON.stringify(yeniListe));
    setIsim(""); 
    setFiyat("");
  };

  const sil = (id: string) => {
    const yeniListe = liste.filter(item => item.id !== id);
    setListe(yeniListe);
    localStorage.setItem("atom_urunler", JSON.stringify(yeniListe));
  };

  return (
    <div className="space-y-4">
      <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
        <p className="text-xs font-bold text-orange-700 mb-2 uppercase italic">Yeni Ürün Ekle</p>
        <div className="flex flex-col gap-2">
          <input 
            value={isim} 
            onChange={(e) => setIsim(e.target.value)} 
            placeholder="Ürün Adı (Örn: Antep Fıstığı)" 
            className="p-3 rounded-xl border-2 border-transparent focus:border-orange-300 outline-none shadow-sm text-slate-700" 
          />
          <input 
            value={fiyat} 
            onChange={(e) => setFiyat(e.target.value)} 
            type="number" 
            placeholder="Kilo Fiyatı (TL)" 
            className="p-3 rounded-xl border-2 border-transparent focus:border-orange-300 outline-none shadow-sm text-slate-700" 
          />
          <button 
            onClick={urunEkle} 
            className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl font-black shadow-md transition-all active:scale-95"
          >
            EKLE
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-bold text-slate-400 mb-3 uppercase tracking-tighter">Senin Fiyat Listen</h3>
        {liste.length === 0 ? (
          <p className="text-xs text-slate-400 italic text-center py-10 bg-slate-50 rounded-2xl border-2 border-dashed">Henüz ürün eklemedin. <br/> Yukarıdan dükkan fiyatlarını girmeye başla!</p>
        ) : (
          liste.map(urun => (
            <div key={urun.id} className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-2">
              <span className="font-bold text-slate-700">{urun.isim}</span>
              <div className="flex items-center gap-4">
                <span className="text-orange-600 font-black">{urun.fiyat} TL</span>
                <button 
                  onClick={() => sil(urun.id)} 
                  className="bg-red-50 text-red-400 text-xs px-3 py-1 rounded-lg font-bold hover:bg-red-500 hover:text-white transition-colors"
                >
                  Sil
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}