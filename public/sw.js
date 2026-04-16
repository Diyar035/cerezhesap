self.addEventListener("install", (event) => {
  console.log("Service Worker kuruldu.");
});

self.addEventListener("fetch", (event) => {
  // Çevrimdışı desteği için burası ileride doldurulabilir
});