# Backend API LENTERA

## 1. Deskripsi Proyek
Backend LENTERA merupakan layanan API (Application Programming Interface) berbasis Laravel yang bertugas mengelola data, logika bisnis, dan basis data untuk platform LENTERA. Backend ini melayani permintaan baik dari frontend admin (dasbor) maupun aplikasi publik LENTERA, menyediakan antarmuka pertukaran data berbasis JSON yang aman dan efisien.

## 2. Tujuan
Proyek backend ini bertujuan untuk:
- Menyediakan endpoint RESTful API untuk mengelola sumber daya utama (prestasi, kategori, media, pengguna, pengaturan).
- Menangani proses autentikasi, otorisasi, dan validasi data secara terpusat dan aman.
- Menjadi jembatan antara aplikasi sisi klien (frontend) dengan basis data.
- Menyediakan arsitektur data yang kokoh untuk mendukung kinerja tinggi pada portal LENTERA.

## 3. Fitur
- **Autentikasi & Otorisasi:** Sistem autentikasi berbasis token menggunakan Laravel Sanctum.
- **RESTful API Endpoint:** Mendukung penuh operasi CRUD untuk entitas Prestasi, Kategori, Media, Profil, dan Pengaturan.
- **Validasi Data (Form Requests):** Validasi permintaan di sisi server untuk memastikan integritas dan keamanan data.
- **Manajemen Media:** Endpoint untuk mengelola unggahan (upload) dan penghapusan aset atau berkas.
- **Statistik & Analitik:** Endpoint khusus untuk menyajikan data statistik ke dasbor admin.
- **Dokumentasi Terintegrasi:** Menyediakan laman dokumentasi API secara otomatis menggunakan Scramble.

## 4. Teknologi
- **Framework:** Laravel 12.0
- **Bahasa Pemrograman:** PHP 8.2+
- **Autentikasi API:** Laravel Sanctum 4.0
- **Dokumentasi API:** Dedoc/Scramble
- **Database:** Fleksibel untuk RDBMS (MySQL / SQLite / PostgreSQL) melalui konfigurasi ORM.
- **Pengujian:** PHPUnit & pestphp (disediakan pada instalasi standar Laravel).

## 5. Arsitektur Backend
Arsitektur aplikasi mengadopsi pola MVC (Model-View-Controller).
- **Routing:** Semua rute atau *entry point* API didaftarkan di dalam `routes/api.php`.
- **Controllers:** Menangani logika *request-response* dan pendelegasian proses bisnis.
- **Models & Eloquent ORM:** Mengelola struktur dan relasi antartabel database dalam wujud objek.
- **Middleware:** Mengintersepsi permintaan jaringan untuk keperluan seperti verifikasi token Sanctum, proteksi rute, dan pengaturan CORS.
- **Requests:** Memisahkan aturan validasi (Form Request) dari dalam *Controller* agar lebih rapi dan dapat digunakan ulang.

## 6. Struktur Folder
Berikut adalah penjelasan singkat untuk setiap folder utama dalam proyek backend:

- `app/` : Inti dari logika aplikasi. Berisi *Models*, *Controllers*, *Middleware*, *Requests* (validasi form), dan *Providers*.
- `bootstrap/` : Berkas untuk inisialisasi awal (bootstrapping) aplikasi Laravel dan pengaturan prosesnya.
- `config/` : Tempat menyimpan seluruh file konfigurasi sistem (database, CORS, *mail*, layanan pihak ketiga, dll).
- `database/` : Menampung *Migrations* (pembentuk skema tabel), *Seeders* (penyuntik data awal), dan *Factories*.
- `public/` : *Document root* atau *entry point* utama aplikasi (`index.php`), serta direktori publik tempat aset yang boleh diakses dari luar.
- `resources/` : Berisi berkas *views* pendukung (seperti template email), berkas translasi bahasa, dan aset mentah.
- `routes/` : Pusat pendaftaran seluruh rute (URL) yang diizinkan (khususnya `api.php` dan `web.php`).
- `storage/` : Menyimpan log sistem, *cache* framework, dan berkas unggahan (*upload*) publik atau privat.
- `tests/` : Menyimpan skrip pengujian atau *testing* (Feature & Unit Test) untuk menguji keandalan aplikasi.
- `vendor/` : Direktori yang berisi segala *library* pihak ketiga atau dependensi aplikasi yang diunduh melalui Composer.

## 7. Routing
Seluruh manajemen rute API diatur di dalam berkas `routes/api.php` dan dipisahkan menjadi dua kelompok besar:
- **Public API:** Endpoint yang dapat dipanggil tanpa autentikasi, seperti rute untuk masuk/`login`, daftar kategori, publikasi prestasi, detail informasi pengaturan, dan baca data media.
- **Protected API:** Kelompok rute yang membutuhkan hak akses pengguna (dibungkus dalam kelompok `Route::middleware('auth:sanctum')`). Rute ini digunakan untuk mengamankan fungsi *dashboard*, modifikasi profil admin, serta semua instruksi *Create, Update, Delete* pada entitas sistem.

## 8. Integrasi API
Aplikasi menyajikan komunikasi standar menggunakan JSON (JavaScript Object Notation). Backend menggunakan Laravel Sanctum untuk mencetak Token, yang harus dikirim kembali oleh Frontend sebagai *Bearer Token* di bagian _header_ (Authorization).
Sistem akan otomatis melempar HTTP Code `401 Unauthorized` pada sesi yang gagal (token absen/kedaluwarsa), atau merespons dengan status `422 Unprocessable Entity` saat form tidak valid tanpa mempengaruhi keamanan logika utama. Kebijakan domain silang diatur aman melalui konfigurasi `CORS`.

## 9. Screenshot

