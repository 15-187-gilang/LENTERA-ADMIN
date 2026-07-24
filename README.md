# LENTERA Admin

**LENTERA** *(Layanan Etalase Prestasi dan Reputasi)* adalah sistem informasi berbasis web untuk mendokumentasikan dan mempublikasikan data prestasi institusi. Repositori ini berisi modul **Admin Panel**, yaitu antarmuka administrasi yang digunakan untuk mengelola seluruh data yang ditampilkan pada website publik LENTERA.

---

## Daftar Isi

- [Gambaran Sistem](#gambaran-sistem)
- [Fitur Utama](#fitur-utama)
- [Teknologi](#teknologi)
- [Struktur Repositori](#struktur-repositori)
- [Persyaratan Sistem](#persyaratan-sistem)
- [Instalasi & Setup](#instalasi--setup)
- [Penggunaan](#penggunaan)
- [Alur Kerja Aplikasi](#alur-kerja-aplikasi)
- [Dokumentasi Lebih Lanjut](#dokumentasi-lebih-lanjut)

---

## Gambaran Sistem

LENTERA Admin terdiri dari dua bagian utama yang bekerja bersama:

```
┌──────────────────────────────────────────────────────────────┐
│                     LENTERA Admin Panel                      │
│                                                              │
│   ┌────────────────────┐     ┌─────────────────────────┐    │
│   │   Admin Frontend   │────▶│     Backend API          │    │
│   │  React + TypeScript│     │  Laravel 12 + Sanctum   │    │
│   │  (SPA - Vite)      │     │  (RESTful JSON API)     │    │
│   └────────────────────┘     └──────────┬──────────────┘    │
│                                         │                    │
│                                         ▼                    │
│                               ┌──────────────────┐          │
│                               │  Database         │          │
│                               │  SQLite / MySQL   │          │
│                               └──────────────────┘          │
└──────────────────────────────────────────────────────────────┘
                                         │
                                         │ Public API
                                         ▼
                              ┌─────────────────────┐
                              │  Website Publik      │
                              │  (Repositori Terpisah)│
                              └─────────────────────┘
```

**Admin Frontend** berkomunikasi dengan **Backend API** menggunakan Axios (Bearer Token via Laravel Sanctum). Backend menyediakan data melalui RESTful API yang juga dikonsumsi oleh website publik LENTERA.

---

## Fitur Utama

### Manajemen Prestasi
- Tambah, ubah, hapus data prestasi
- Sistem **publish / draft**: prestasi dapat disimpan sebagai draft sebelum dipublikasikan
- Tandai prestasi sebagai **unggulan** (*featured*)
- Upload **thumbnail** (gambar) dan **lampiran** (dokumen PDF)
- Pemilihan thumbnail dari **Media Library** yang sudah ada
- Pencarian, filter (kategori, level, status), dan pengurutan

### Manajemen Kategori
- CRUD kategori prestasi
- Kategori bawaan: Penghargaan, Kompetisi, Inovasi, Publikasi

### Media Library
- Upload dan manajemen file gambar/dokumen
- Tampilan grid dengan thumbnail otomatis
- Preview file gambar dan PDF langsung di browser
- Fitur picker: pilih media dari library saat mengisi form prestasi

### Dashboard & Statistik
- Ringkasan jumlah: total prestasi, publikasi, draft, unggulan
- Grafik tren prestasi (tahunan / bulanan)
- Daftar prestasi terbaru

### Pengaturan Website
- Nama & deskripsi website
- Logo, favicon, hero image
- Informasi kontak (email, telepon, alamat)
- Tautan media sosial
- Konfigurasi SEO (meta title & description)
- Mode maintenance

### Manajemen Profil Admin
- Lihat dan ubah nama serta email
- Ganti password dengan verifikasi password lama

### Keamanan
- Autentikasi menggunakan **Laravel Sanctum** (Bearer Token)
- **Rate limiting** login: maks. 5 percobaan gagal, kunci 30 detik
- Protected route: seluruh halaman admin memerlukan sesi aktif
- Token kadaluarsa → redirect otomatis ke halaman login

---

## Teknologi

### Backend

| Komponen | Teknologi |
|---|---|
| Framework | Laravel 12 |
| PHP | ^8.2 |
| Autentikasi | Laravel Sanctum 4 |
| Database | SQLite (dev) / MySQL (prod) |
| Arsitektur | Repository-Service-Controller |

### Frontend

| Komponen | Teknologi |
|---|---|
| UI Framework | React 19 |
| Bahasa | TypeScript ~6.0 |
| Build Tool | Vite 8 |
| Routing | React Router DOM v7 |
| HTTP Client | Axios 1.x |
| Grafik | Recharts 3 |
| Icon | Lucide React |
| Notifikasi | React Hot Toast |
| Upload | React Dropzone |
| Styling | Vanilla CSS + Tailwind CSS 4 |

---

## Struktur Repositori

```
LENTERA-Admin/
├── backend/          # Laravel 12 API
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   ├── Models/
│   │   ├── Services/
│   │   └── Repositories/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/api.php
│   └── README.md     # Dokumentasi Backend
│
├── frontend/         # React + TypeScript SPA
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── types/
│   │   └── utils/
│   └── README.md     # Dokumentasi Frontend
│
└── README.md         # Dokumen ini
```

---

## Persyaratan Sistem

| Kebutuhan | Versi Minimum |
|---|---|
| PHP | 8.2 |
| Composer | 2.x |
| Node.js | 18.x |
| NPM | 9.x |
| Database | SQLite atau MySQL 8 / MariaDB 10.6 |

---

## Instalasi & Setup

### 1. Clone Repositori

```bash
git clone <url-repositori>
cd LENTERA-Admin
```

### 2. Setup Backend

```bash
cd backend

# Salin file environment
cp .env.example .env

# Install dependency & setup otomatis
composer run setup
```

Perintah `composer run setup` akan:
- Install seluruh dependency PHP
- Generate `APP_KEY`
- Jalankan migrasi database
- Install dependency NPM dan build assets

Atau lakukan secara manual:

```bash
composer install
php artisan key:generate
php artisan migrate
php artisan db:seed        # Isi data awal (opsional)
php artisan storage:link   # Buat symlink storage
```

### 3. Setup Frontend

```bash
cd frontend

# Salin file environment
cp .env.example .env

# Isi VITE_API_URL di .env:
# VITE_API_URL=http://localhost:8000/api

# Install dependency
npm install
```

### 4. Jalankan Aplikasi

Jalankan backend dan frontend secara bersamaan dari terminal terpisah:

```bash
# Terminal 1 — Backend
cd backend
php artisan serve

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Atau gunakan perintah `dev` bawaan backend (menjalankan semuanya sekaligus):

```bash
cd backend
composer run dev
```

**Akses Aplikasi:**
- Frontend Admin: `http://localhost:5173/admin/`
- Backend API: `http://localhost:8000/api/`

---

## Penggunaan

### Login Pertama Kali

Setelah menjalankan `php artisan db:seed`, akun administrator default tersedia. Segera ganti password setelah login pertama melalui menu **Profil Admin**.

### Alur Mengelola Prestasi

```
1. Login ke Admin Panel
2. Buka menu "Tambah Prestasi"
3. Isi data: judul, kategori, penerima, penyelenggara, level, tanggal
4. Upload thumbnail (dari komputer atau pilih dari Media Library)
5. Tambahkan lampiran dokumen (opsional)
6. Pilih aksi:
   - "Simpan Draft" → tersimpan, belum tampil di website publik
   - "Publish"      → langsung tampil di website publik
```

### Level Prestasi

Sistem mendukung empat tingkatan prestasi:

| Level | Keterangan |
|---|---|
| Kabupaten | Tingkat kabupaten / kota |
| Provinsi | Tingkat provinsi |
| Nasional | Tingkat nasional |
| Internasional | Tingkat internasional |

### Kategori Bawaan

| Kategori | Deskripsi |
|---|---|
| Penghargaan | Prestasi berupa penghargaan |
| Kompetisi | Prestasi hasil kompetisi |
| Inovasi | Prestasi inovasi institusi |
| Publikasi | Publikasi ilmiah |

---

## Alur Kerja Aplikasi

```
Administrator
     │
     │  1. Login (email + password)
     ▼
┌─────────────┐
│ Admin Panel │  React SPA
│  Frontend   │─────────────────────────────────────┐
└─────────────┘                                     │
     │                                              │
     │  2. Kelola data (prestasi, kategori, media)  │
     │                                              ▼
     │                                    ┌──────────────────┐
     │                                    │   Backend API    │
     │                                    │  (Laravel 12)    │
     │                                    └────────┬─────────┘
     │                                             │
     │                                    3. Simpan ke database
     │                                             │
     │                                             ▼
     │                                    ┌──────────────────┐
     │                                    │    Database      │
     └──────────────────────────────────▶ │ (SQLite/MySQL)   │
                                          └────────┬─────────┘
                                                   │
                                          4. Data dipublikasikan
                                                   │
                                                   ▼
                                          ┌──────────────────┐
                                          │  Website Publik  │
                                          │  LENTERA         │
                                          └──────────────────┘
```


