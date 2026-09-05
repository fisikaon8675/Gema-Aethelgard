# Gema-Aethelgard
Gema Aethelgard: Petualangan Gelombang &amp; Bunyi
Gema Aethelgard: Petualangan Gelombang & Bunyi

Gema Aethelgard adalah game edukasi RPG 2D berbasis web yang dikembangkan menggunakan Phaser.js. Dalam game ini, pemain bertugas untuk memulihkan keseimbangan dunia yang rusak akibat anomali gelombang fisik dan suara, dengan batas waktu maksimal 30 menit.

🗺️ Area & Misi Fisika

Pemain harus menjelajahi peta untuk menemukan NPC dan menyelesaikan 4 minigame yang didasarkan pada konsep fisika nyata.

| Area / Lokasi | NPC | Konsep Fisika | Deskripsi Tantangan |
| :--- | :--- | :--- | :--- |
| Kastil Pusat | Prajurit Penjaga | Amplitudo & Frekuensi | Memanipulasi visual gelombang sinus (tinggi/amplitudo dan rapat/frekuensi) untuk membuka gerbang. |
| Perumahan (Kiri Bawah) | Ilmuwan Warga | Kecepatan Gelombang (v = λ × f) | Menganalisis frekuensi router (2.4 GHz vs 5 GHz) untuk mendapatkan panjang gelombang yang mampu menembus tembok tebal. |
| Gurun Pasir (Kanan) | Pengelana Gurun | Pipa Organa | Memahami perbedaan frekuensi nada dasar ujung terbuka (f0 = v/2L) dan tertutup (f0 = v/4L) untuk membuka pintu reruntuhan. |
| Hutan Pinus (Kiri Atas) | Penebang Pohon | Efek Doppler | Menghitung kecepatan sumber suara (vs) hewan buas menggunakan rumus fp = fs * [v / (v - vs)] sebagai sandi gerbang. |

💎 Sistem Kristal & Kuis Tersebar

Selain misi utama, terdapat 30 kristal bernilai miliaran Rupiah yang tersebar secara acak di seluruh peta. Untuk mengklaim nilainya, pemain harus menjawab kuis fisika (pilihan ganda) dengan benar.

| Item | Aset | Nilai | Topik Kuis |
| :--- | :--- | :--- | :--- |
| Kristal Merah | redCrystal.png | Rp 1 Miliar | Konsep dasar amplitudo, volume, dan nada. |
| Kristal Biru | blueCrystal.png | Rp 1,5 Miliar | Hubungan panjang gelombang, kecepatan, dan frekuensi. |
| Permata Hijau | greenJewel.png | Rp 3 Miliar | Karakteristik pipa organa terbuka dan tertutup. |

⚙️ Mekanika & Kontrol Permainan

* Bergerak: Gunakan tombol Panah (Atas, Bawah, Kiri, Kanan) pada keyboard.
* Interaksi NPC: Berjalan mendekat (radius 80 piksel) ke karakter NPC untuk memunculkan dialog secara otomatis.
* Memicu Minigame: Berjalan menyentuh zona berwarna (Biru, Hijau, Kuning) atau pintu kastil.
* Dashboard UI: Tekan tombol "M" di keyboard (atau klik UI di kiri atas) untuk memantau status penyelesaian 4 misi utama dan total uang dari kristal yang dikumpulkan.
* Batas Waktu: Pemain hanya memiliki waktu 30 menit (1800 detik). Waktu akan terus berjalan; jika mencapai angka nol sebelum 4 misi selesai, permainan berakhir (Game Over).
* Kemenangan: Layar perayaan akan muncul beserta total uang yang berhasil dikumpulkan sesaat setelah misi keempat diselesaikan. 

🚀 Cara Menjalankan Game

1. Unduh atau clone seluruh source code.
2. Pastikan semua gambar ditempatkan di dalam folder assets/.
3. Jalankan file index.html menggunakan Local Web Server (misalnya ekstensi Live Server di VS Code) untuk menghindari masalah pembatasan CORS pada browser.
