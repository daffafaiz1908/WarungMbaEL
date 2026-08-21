# Product Requirements Document (PRD)

**Nama Proyek:** Website Katalog & Pemesanan Warung (Order-to-WhatsApp)
**Platform:** Web (Mobile-First Web App)
**Fokus Utama:** MVP (Minimum Viable Product)
**Tanggal:** 21 Agustus 2026

---

## 1. Ringkasan Proyek
Pembuatan aplikasi web satu halaman (SPA/Multi-page) yang berfungsi sebagai etalase digital interaktif untuk warung makan. Website ini menampilkan katalog menu (olahan ayam dan dimsum), mengelola keranjang belanja pengguna, dan memproses pesanan dengan mengarahkan (*redirect*) pelanggan beserta rincian pesanan secara otomatis ke WhatsApp admin.

## 2. Tujuan & Sasaran
*   **Fungsional:** Memudahkan pelanggan melihat menu secara visual dan melakukan pesanan tanpa perlu mendaftar akun atau *login*.
*   **Bisnis:** Meningkatkan konversi pemesanan dengan proses yang minim gesekan (minim *click*), serta meniadakan potongan komisi dari aplikasi pihak ketiga.
*   **Teknis:** Mencapai skor performa Lighthouse > 90 untuk perangkat seluler.

## 3. Fitur Utama (Fase MVP)

### 3.1. Halaman Utama (Landing Page)
*   **Hero Section:** Banner foto menu andalan dengan tombol *Call-to-Action* (CTA) "Pesan Sekarang".
*   **Navigasi Kategori:** Filter atau navigasi cepat untuk kategori:
    *   Serba Ayam (Ayam Geprek, Ayam Crispy)
    *   Cemilan & Bites (Chicken Popcorn)
    *   Aneka Dimsum (Chili Oil, Mentai)
    *   Minuman & Tambahan

### 3.2. Katalog & Kartu Produk
*   Menampilkan foto produk resolusi tinggi (menggunakan komponen optimasi gambar bawaan *framework*).
*   Menampilkan informasi: Nama Menu, Deskripsi Singkat, dan Harga.
*   Tombol interaktif `+` dan `-` untuk menambah/mengurangi jumlah *item* ke keranjang belanja.

### 3.3. Keranjang Belanja (Cart)
*   **Floating Cart Button:** Ikon keranjang mengambang di sudut layar yang menampilkan indikator jumlah *item* aktif.
*   **Cart Drawer/Modal:** Saat diklik, menampilkan rincian *item* yang dipilih, kuantitas, subtotal harga, dan tombol lanjut ke *checkout*.

### 3.4. Halaman Checkout (Form Pesanan)
*   Formulir data diri singkat:
    *   Nama Pemesan (Wajib)
    *   Tipe Pesanan (Dropdown/Radio Button: Dine-in, Takeaway, Delivery)
    *   Alamat Pengiriman (Muncul kondisional jika memilih Delivery)
    *   Catatan Tambahan (Opsional)
*   Tombol CTA Utama: **"Kirim Pesanan via WhatsApp"**

### 3.5. Logika Integrasi WhatsApp (WhatsApp Link Generator)
*   Fungsi di belakang layar yang mengambil *state* dari keranjang dan form *checkout*.
*   Mengubah data tersebut menjadi format teks (URL-encoded).
*   Melakukan *redirect* ke API WhatsApp (`https://wa.me/NOMOR_ADMIN?text=FORMAT_PESAN`).

---

## 4. Spesifikasi Teknis (Tech Stack)
*   **Framework Frontend:** Next.js (App Router direkomendasikan).
*   **Styling:** Tailwind CSS.
*   **State Management:** Zustand (Untuk mengelola global *state* keranjang belanja).
*   **Optimasi Gambar:** `next/image` (Untuk *lazy loading* dan kompresi WebP otomatis).
*   **Sumber Data (Database Sementara):** JSON *file* lokal (Hardcoded data menu untuk peluncuran cepat).
*   **Deployment & Hosting:** Vercel (CI/CD terintegrasi).

---

## 5. Alur Pengguna (User Flow)
1.  **Akses:** Pengguna masuk ke website via tautan (bio IG, Google Maps, atau QR Code).
2.  **Eksplorasi:** Pengguna menggulir halaman dan melihat-lihat menu.
3.  **Pemilihan:** Pengguna mengklik tombol `+` pada menu yang diinginkan (misal: 2x Ayam Geprek, 1x Dimsum).
4.  **Tinjau Pesanan:** Pengguna menekan *floating cart* untuk melihat subtotal.
5.  **Pengisian Data:** Pengguna mengisi nama, memilih opsi *Takeaway*, dan menambahkan catatan ("Sambal dipisah").
6.  **Redirect & Selesai:** Pengguna menekan tombol "Kirim via WhatsApp", otomatis berpindah ke aplikasi WhatsApp dengan draf pesan pesanan, lalu menekan "Kirim".

---

## 6. Persyaratan Desain (UI/UX)
*   **Mobile-First Design:** Tata letak utama dioptimalkan untuk ukuran layar *smartphone*. Di layar *desktop*, kontainer konten dibuat terpusat (maksimal lebar ~480px atau ~600px).
*   **Tema Visual:** Identitas warna hangat (merah cabai/oranye) untuk merangsang selera makan, selaras dengan visual sambal pada foto produk.
*   **Micro-interactions:** *Toast notification* atau animasi kecil setiap kali pengguna berhasil menambahkan produk ke keranjang.

---

## 7. Metrik Kesuksesan (Success Metrics)
*   Penyelesaian pengembangan dan *deployment* ke Vercel dalam tenggat waktu yang ditentukan.
*   *Zero errors* (tidak ada *bug* pemblokir) pada alur dari memilih produk hingga *redirect* ke WhatsApp.
*   *Load time* awal di bawah 2.5 detik pada jaringan seluler 3G/4G.