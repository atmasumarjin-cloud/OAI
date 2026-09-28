# OLIMPIADE ANAK INDONESIA (OAI)
> **Didukung Penuh oleh YAYASAN BESARRASA BAGI BANGSA**
> Platform Resmi Olimpiade Online Nasional Berstandar CBT Mandiri & Enterprise.

---

## 📋 Ikhtisar Proyek

Aplikasi **Olimpiade Anak Indonesia** adalah platform kompetisi sains & akademik berskala nasional yang dirancang 100% responsif dengan pendekatan *Mobile First*, kemewahan visual (*Executive Luxury UI/UX*), stabilitas asset gambar 100%, serta integrasi kecerdasan buatan (*AI Educational Consultant* berbasis `@google/genai` Gemini 3.1 Pro Preview with Thinking Mode).

### Fitur Utama:
1. **Pendaftaran Mandiri & Lead Funnel**:
   - Pendaftaran peserta mandiri (Nama Siswa, Nama Wali, No WhatsApp Aktif, Sekolah, Domisili, Kategori A/B/C, Mapel).
   - Integrasi Meta Pixel (Facebook Ads) dengan injeksi script dinamis dari Admin Dashboard.
2. **Konfirmasi WhatsApp & Syarat Follow Sosmed**:
   - Satu-klik pesan otomatis ke WhatsApp panitia.
   - Verifikasi follow Instagram & YouTube resmi sebelum akses ruang simulasi dibuka.
3. **CBT Ujian Engine (20 Butir Soal Acak HOTS)**:
   - 20 butir soal acak unik per peserta dari bank soal terstandar (5 poin per soal = 100 poin).
   - Mode Simulasi (Try Out Mandiri), Babak Penyisihan, dan Babak Final.
   - Sistem Anti-Contek cerdas: Deteksi perpindahan tab layar, anti copy-paste, dan countdown timer.
4. **Alur Kualifikasi & Tiket Final Promo**:
   - Pengumuman lolos pada H+2 babak penyisihan.
   - Promo Tiket Final Rp 99.000 (diskon dari Rp 180.000 untuk 10 peserta pertama).
   - Pembayaran resmi transfer **BCA: 3843-136-911 a.n. SRI PRIHATININGSIH SH.**
   - Konfirmasi bukti bayar otomatis ke WhatsApp panitia & penandaan status *Closing / Lunas* di Admin.
5. **E-Sertifikat Penghargaan Resmi**:
   - Piagam digital berlisensi resmi dengan logo Olimpiade Anak Indonesia & seal Yayasan Besarasa Bagi Bangsa.
   - Nomor seri unik, predikat medali (Emas/Perak/Peserta Berprestasi), dan siap cetak / PDF.
6. **Dashboard Administrator Pusat**:
   - Kredensial rahasia panitia (User: `admin`, Password: `rahasia123`).
   - Database peserta lengkap dengan semua kolom formulir pendaftaran.
   - Tombol hapus data per siswa.
   - Tombol action WhatsApp Follow-Up: belum simulasi, belum penyisihan (reminder H-2/H-1), dan follow-up tiket final.
   - Penandaan status closing pembayaran tiket final.
   - Tabel laporan pengerjaan ujian lengkap dengan nilai/skor tampil transparan.
   - Manajemen Bank Soal: Tambah, edit satuan, hapus satuan, hapus massal, export/import JSON.
   - Pengaturan jadwal tanggal ujian dan Meta Pixel script.

---

## 🛠️ Tech Stack

- **Frontend**: React 18+ (Vite), Tailwind CSS v4, Lucide React Icons, Google Font *Plus Jakarta Sans*, Canvas Confetti
- **Backend**: Express.js (Node.js ESM) + SDK Resmi Google Gen AI (`@google/genai`)
- **AI Model**: `gemini-3.1-pro-preview` dengan `thinkingLevel: 'HIGH'`
- **Whitelabel Config**: `appConfig.js`

---

## 💻 Panduan Pengujian Lokal (Development)

### 1. Prasyarat:
- Node.js versi 18 atau 20+
- NPM atau Bun / Yarn

### 2. Instalasi Dependensi:
```bash
npm install
```

### 3. Konfigurasi Environment (`.env`):
Buat atau sesuaikan file `.env` di direktori root:
```env
PORT=3000
GEMINI_API_KEY="AIzaSy..."
APP_URL="http://localhost:3000"
```

### 4. Menjalankan Server Development:
```bash
npm run dev
```
Buka browser di `http://localhost:3000`.

---

## 🚀 Panduan Deployment cPanel (Satelitweb / Cloud Hosting)

Platform ini sudah dilengkapi arsitektur cPanel Node.js Selector-ready dengan entry point root `app.js` dan `server.js`.

### Langkah-langkah Deployment di cPanel:

1. **Build Frontend Production**:
   Jalankan perintah build di lokal atau terminal cPanel:
   ```bash
   npm run build
   ```
   Perintah ini akan menghasilkan folder statis `./dist` yang siap disajikan oleh Express.

2. **Upload Berkas ke File Manager cPanel**:
   Upload seluruh berkas proyek ke direktori aplikasi (misal: `/home/user/public_html` atau direktori subdomain):
   - `app.js`
   - `server.js`
   - `appConfig.js`
   - `package.json`
   - `dist/` (folder hasil build)
   - `server/` (folder router API)
   - `.env` (file environment)

3. **Buka Menu "Setup Node.js App" di cPanel**:
   - **Node.js version**: Pilih versi **18.x** atau **20.x**.
   - **Application mode**: `Production`
   - **Application root**: Isi direktori tempat berkas diupload (misal: `public_html` atau nama folder app Anda).
   - **Application URL**: Pilih domain atau subdomain Anda.
   - **Application startup file**: Isi `app.js` (atau `server.js`).

4. **Konfigurasi Environment Variables di cPanel**:
   Di tab *Environment Variables* pada cPanel Node.js Selector, tambahkan:
   - `NODE_ENV` = `production`
   - `GEMINI_API_KEY` = `[API_KEY_ANDA]`

5. **Install Dependensi di cPanel**:
   Klik tombol **Run NPM Install** di dashboard cPanel Node.js Selector.

6. **Restart Aplikasi**:
   Klik tombol **Restart Application**.
   Aplikasi Anda kini telah aktif 100% di domain publik!

---

## 🔒 Kredensial Panitia

- **URL Akses**: Klik tombol "Login Panitia" di header atau footer
- **Username**: `admin`
- **Password**: `rahasia123`
*(Sesuai aturan keamanan, kredensial ini tidak ditampilkan di antarmuka publik)*.

---

## 📞 Kontak & Dukungan Resmi

- **Penyelenggara**: OLIMPIADE ANAK INDONESIA
- **Didukung oleh**: YAYASAN BESARRASA BAGI BANGSA
- **WhatsApp**: +62 859-2492-1592
- **Rekening Tiket Final**: BCA 3843-136-911 a.n. SRI PRIHATININGSIH SH.
