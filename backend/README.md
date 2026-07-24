# LENTERA — Backend API

> **L**aporan **E**lektronik **N**ilai dan **T**ranskripsi **E**stimasi **R**aih **A**prestasi

Backend RESTful API untuk sistem manajemen data prestasi institusi, dibangun dengan **Laravel 12** dan diautentikasi menggunakan **Laravel Sanctum**.

---

## Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Teknologi](#teknologi)
- [Arsitektur](#arsitektur)
- [Struktur Direktori](#struktur-direktori)
- [Persyaratan Sistem](#persyaratan-sistem)
- [Instalasi & Setup](#instalasi--setup)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Database](#database)
- [API Endpoints](#api-endpoints)
- [Response Format](#response-format)
- [Autentikasi](#autentikasi)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Testing](#testing)

---

## Tentang Proyek

LENTERA adalah sistem informasi prestasi yang menyediakan:

- **Admin Panel API** — endpoint terproteksi untuk manajemen data oleh administrator
- **Public API** — endpoint publik untuk konsumsi frontend/website publik
- Manajemen data prestasi dengan sistem publish/draft
- Media library untuk pengelolaan file gambar dan dokumen
- Dashboard statistik dan analytics
- Pengaturan konten website secara dinamis

---

## Teknologi

| Komponen | Teknologi |
|---|---|
| Framework | [Laravel 12](https://laravel.com) |
| PHP | ^8.2 |
| Autentikasi | [Laravel Sanctum 4](https://laravel.com/docs/sanctum) |
| Database | SQLite (development) / MySQL (production) |
| API Docs | [Dedoc Scramble](https://scramble.dedoc.co/) |
| Testing | PHPUnit 11 |
| Code Style | Laravel Pint |

---

## Arsitektur

Proyek ini menggunakan pola **Repository-Service-Controller** untuk pemisahan concerns yang jelas:

```
HTTP Request
    │
    ▼
┌─────────────┐
│  Controller │  ← Menerima request, mengembalikan response
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Service   │  ← Business logic
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Repository  │  ← Akses database (abstraksi query)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Model    │  ← Eloquent ORM
└─────────────┘
```

**Keuntungan pola ini:**
- Controller tetap tipis, hanya bertugas routing response
- Business logic terisolasi di Service, mudah diuji
- Repository dapat diganti implementasinya tanpa mengubah Service
- Mendukung Dependency Injection dan Interface binding

---

## Struktur Direktori

```
backend/
├── app/
│   ├── Enums/
│   │   └── AchievementLevel.php       # Level prestasi (Kabupaten–Internasional)
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Api/
│   │   │       ├── AchievementController.php
│   │   │       ├── AuthController.php
│   │   │       ├── CategoryController.php
│   │   │       ├── DashboardController.php
│   │   │       ├── MediaController.php
│   │   │       ├── ProfileController.php
│   │   │       └── SettingController.php
│   │   ├── Requests/                  # Form Request Validation
│   │   └── Resources/                 # API Resource Transformer
│   ├── Models/
│   │   ├── Achievement.php
│   │   ├── AchievementImage.php
│   │   ├── Admin.php
│   │   ├── Category.php
│   │   ├── Institution.php
│   │   ├── Media.php
│   │   └── Setting.php
│   ├── Repositories/
│   │   ├── Interfaces/                # Contract/Interface Repository
│   │   ├── AchievementRepository.php
│   │   ├── AdminRepository.php
│   │   ├── CategoryRepository.php
│   │   ├── DashboardRepository.php
│   │   ├── MediaRepository.php
│   │   └── SettingRepository.php
│   ├── Services/
│   │   ├── AchievementService.php
│   │   ├── AuthService.php
│   │   ├── CategoryService.php
│   │   ├── DashboardService.php
│   │   ├── MediaService.php
│   │   ├── ProfileService.php
│   │   └── SettingService.php
│   └── Traits/
│       ├── ApiResponse.php            # Response helper
│       └── HasSlug.php                # Auto-slug generator
├── database/
│   ├── migrations/
│   └── seeders/
├── routes/
│   └── api.php
├── .env.example
└── composer.json
```

---

## Persyaratan Sistem

- PHP >= 8.2
- Composer
- Node.js & NPM
- SQLite (untuk development) atau MySQL/MariaDB (untuk production)
- PHP Extension: `pdo`, `pdo_sqlite` atau `pdo_mysql`, `mbstring`, `xml`, `json`, `fileinfo`

---

## Instalasi & Setup

### 1. Clone repositori

```bash
git clone <url-repositori>
cd backend
```

### 2. Jalankan setup otomatis

```bash
composer run setup
```

Perintah ini secara otomatis akan:
- Menginstall dependency PHP via Composer
- Menyalin `.env.example` menjadi `.env`
- Men-generate `APP_KEY`
- Menjalankan migration database
- Menginstall dependency NPM
- Build assets

### 3. Setup manual (alternatif)

```bash
# Install dependency
composer install

# Salin file environment
cp .env.example .env

# Generate application key
php artisan key:generate

# Jalankan migration
php artisan migrate

# Jalankan seeder (opsional, untuk data awal)
php artisan db:seed

# Buat symlink storage
php artisan storage:link
```

---

## Konfigurasi Environment

Salin `.env.example` menjadi `.env` lalu sesuaikan variabel berikut:

```env
# Nama dan URL aplikasi
APP_NAME=LENTERA
APP_ENV=local          # Ubah ke "production" di server
APP_DEBUG=false        # Selalu false di production
APP_URL=http://localhost:8000

# Database (SQLite untuk development)
DB_CONNECTION=sqlite

# Database (MySQL untuk production — aktifkan baris berikut)
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=lentera_db
# DB_USERNAME=db_user
# DB_PASSWORD=db_password

# Filesystem
FILESYSTEM_DISK=public

# Queue (gunakan database untuk kesederhanaan)
QUEUE_CONNECTION=database
```

> **Catatan:** Jangan pernah mengcommit file `.env` ke repositori. File ini sudah terdaftar di `.gitignore`.

---

## Database

### Skema Tabel

#### `admins`
Menyimpan data administrator sistem.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint (PK) | Primary key |
| `name` | varchar(100) | Nama administrator |
| `email` | varchar (unique) | Email login |
| `password` | varchar | Password (hashed bcrypt) |
| `last_login_at` | timestamp | Waktu login terakhir |
| `remember_token` | varchar | Token "ingat saya" |
| `created_at` / `updated_at` | timestamp | Timestamps |

#### `categories`
Kategori pengelompokan prestasi.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint (PK) | Primary key |
| `name` | varchar | Nama kategori |
| `created_at` / `updated_at` | timestamp | Timestamps |

#### `achievements`
Tabel utama data prestasi.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint (PK) | Primary key |
| `category_id` | bigint (FK) | Referensi ke `categories` |
| `created_by` | bigint (FK) | Referensi ke `admins` |
| `title` | varchar | Judul prestasi |
| `slug` | varchar (unique) | URL-friendly identifier (auto-generate) |
| `excerpt` | text (nullable) | Ringkasan singkat |
| `description` | longtext | Deskripsi lengkap |
| `recipient` | varchar | Penerima prestasi |
| `organizer` | varchar | Penyelenggara |
| `level` | varchar(30) | Tingkat: Kabupaten / Provinsi / Nasional / Internasional |
| `achievement_date` | date | Tanggal prestasi diraih |
| `thumbnail` | varchar (nullable) | Path file thumbnail |
| `attachment` | varchar (nullable) | Path file lampiran (PDF, dll) |
| `views` | unsigned int | Jumlah kunjungan halaman detail |
| `sort_order` | unsigned int | Urutan tampilan |
| `featured` | boolean | Ditandai sebagai unggulan |
| `is_published` | boolean | Status publikasi |
| `published_at` | timestamp (nullable) | Waktu dipublikasikan |
| `deleted_at` | timestamp (nullable) | Soft delete |
| `created_at` / `updated_at` | timestamp | Timestamps |

> Tabel ini menggunakan **Soft Delete** — data yang dihapus tidak langsung hilang dari database.

#### `media`
Library file/media yang diupload administrator.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | bigint (PK) | Primary key |
| `original_name` | varchar | Nama file asli |
| `filename` | varchar (unique) | Nama file yang disimpan |
| `mime_type` | varchar | MIME type file |
| `extension` | varchar(10) | Ekstensi file |
| `size` | unsigned bigint | Ukuran file dalam bytes |
| `disk` | varchar | Disk storage (default: public) |
| `directory` | varchar | Direktori penyimpanan |
| `path` | varchar | Path relatif file |
| `url` | text | URL akses publik |
| `thumbnail_path` | varchar (nullable) | Path thumbnail |
| `thumbnail_url` | text (nullable) | URL thumbnail |
| `uploaded_by` | bigint (FK, nullable) | Referensi ke `admins` |
| `created_at` / `updated_at` | timestamp | Timestamps |

#### `settings`
Konfigurasi website (single record).

| Kolom | Tipe | Keterangan |
|---|---|---|
| `site_name` | varchar | Nama website |
| `site_description` | text | Deskripsi website |
| `logo` | varchar | Path logo |
| `institution_logo` | varchar | Path logo institusi |
| `favicon` | varchar | Path favicon |
| `hero_image` | varchar | Path gambar hero |
| `email` | varchar | Email kontak |
| `phone` | varchar | Nomor telepon |
| `address` | text | Alamat |
| `facebook` | varchar | URL Facebook |
| `instagram` | varchar | URL Instagram |
| `youtube` | varchar | URL YouTube |
| `twitter` | varchar | URL Twitter |
| `copyright` | varchar | Teks copyright |
| `seo_title` | varchar | Meta title SEO |
| `seo_description` | text | Meta description SEO |
| `maintenance_mode` | boolean | Mode maintenance |
| `maintenance_message` | text | Pesan maintenance |

### Seeder

```bash
# Jalankan semua seeder
php artisan db:seed

# Jalankan seeder tertentu
php artisan db:seed --class=AdminSeeder
php artisan db:seed --class=CategorySeeder
php artisan db:seed --class=SettingSeeder
```

Seeder yang tersedia:
- **`AdminSeeder`** — Membuat akun administrator default
- **`CategorySeeder`** — Membuat kategori prestasi awal
- **`SettingSeeder`** — Mengisi pengaturan website default
- **`AchievementSeeder`** — Membuat data prestasi contoh

> **Penting:** Setelah menjalankan `AdminSeeder`, segera ganti password default melalui endpoint `PUT /api/profile/password`.

---

## API Endpoints

Base URL: `/api`

### Publik (tanpa autentikasi)

#### Autentikasi
| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/api/login` | Login administrator |

#### Pengaturan Website
| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/settings` | Ambil pengaturan website publik |

#### Kategori
| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/categories` | Daftar semua kategori |
| `GET` | `/api/categories/{id}` | Detail kategori |

#### Prestasi
| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/achievements` | Daftar prestasi (dengan filter & pagination) |
| `GET` | `/api/achievements/{id}` | Detail prestasi berdasarkan ID |
| `GET` | `/api/achievements/featured` | Daftar prestasi unggulan |
| `GET` | `/api/achievements/statistics` | Statistik ringkasan prestasi |
| `GET` | `/api/public/achievements` | Daftar prestasi yang dipublikasikan |
| `GET` | `/api/public/achievements/{slug}` | Detail prestasi publik berdasarkan slug |

#### Media
| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/media` | Daftar file media |
| `GET` | `/api/media/{id}` | Detail satu file media |

---

### Terproteksi (memerlukan Bearer Token)

Semua endpoint di bawah ini memerlukan header:
```
Authorization: Bearer {token}
```

#### Autentikasi
| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/api/logout` | Logout (hapus token aktif) |
| `GET` | `/api/me` | Data admin yang sedang login |

#### Dashboard
| Method | Endpoint | Query Params | Deskripsi |
|---|---|---|---|
| `GET` | `/api/dashboard` | `period`, `year` | Data ringkasan dashboard |

#### Kategori
| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/api/categories` | Tambah kategori baru |
| `PUT` | `/api/categories/{id}` | Perbarui kategori |
| `DELETE` | `/api/categories/{id}` | Hapus kategori |

#### Prestasi
| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/api/achievements` | Tambah data prestasi baru |
| `PUT` | `/api/achievements/{id}` | Perbarui data prestasi |
| `DELETE` | `/api/achievements/{id}` | Hapus data prestasi (soft delete) |

#### Pengaturan Website
| Method | Endpoint | Deskripsi |
|---|---|---|
| `PUT` | `/api/settings` | Perbarui pengaturan website |

#### Profil Administrator
| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/profile` | Lihat profil admin aktif |
| `PUT` | `/api/profile` | Perbarui nama & email |
| `PUT` | `/api/profile/password` | Ganti password |

#### Media
| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/api/media` | Upload file baru |
| `DELETE` | `/api/media/{id}` | Hapus file media |

---

### Query Parameter — Filter Prestasi

Endpoint `GET /api/achievements` mendukung parameter filter berikut:

| Parameter | Tipe | Contoh | Keterangan |
|---|---|---|---|
| `search` | string | `?search=olimpiade` | Cari berdasarkan judul |
| `category_id` | integer | `?category_id=2` | Filter berdasarkan kategori |
| `level` | string | `?level=Nasional` | Filter berdasarkan level |
| `featured` | boolean | `?featured=1` | Hanya tampilkan yang unggulan |
| `published` | boolean | `?published=1` | Hanya tampilkan yang dipublikasikan |
| `sort` | string | `?sort=latest` | Pengurutan (`latest`, `oldest`) |
| `per_page` | integer | `?per_page=20` | Jumlah item per halaman |

---

### Level Prestasi

Nilai valid untuk field `level`:

| Nilai | Keterangan |
|---|---|
| `Kabupaten` | Tingkat kabupaten/kota |
| `Provinsi` | Tingkat provinsi |
| `Nasional` | Tingkat nasional |
| `Internasional` | Tingkat internasional |

---

## Response Format

Seluruh response API menggunakan format JSON yang konsisten.

### Response Sukses

```json
{
  "success": true,
  "message": "Pesan sukses",
  "data": { }
}
```

### Response dengan Paginasi

```json
{
  "success": true,
  "message": "Data berhasil diambil.",
  "data": [],
  "pagination": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 10,
    "total": 48,
    "from": 1,
    "to": 10,
    "next_page_url": "http://localhost/api/achievements?page=2",
    "prev_page_url": null
  }
}
```

### Response Error Validasi (422)

```json
{
  "success": false,
  "message": "The given data was invalid.",
  "errors": {
    "email": ["The email field is required."]
  }
}
```

### Response Error Autentikasi (401)

```json
{
  "message": "Unauthenticated."
}
```

---

## Autentikasi

Backend menggunakan **Laravel Sanctum** dengan mekanisme **token berbasis API**.

### Alur Login

```
1. POST /api/login  →  { email, password }
2. Server memvalidasi kredensial + rate limiter
3. Server mengembalikan Bearer Token
4. Simpan token di client (localStorage / cookie)
5. Sertakan token di header setiap request terproteksi:
   Authorization: Bearer {token}
```

### Rate Limiting Login

Untuk mencegah brute force, endpoint login membatasi:
- **Maksimum 5 percobaan gagal** per kombinasi email + IP address
- Setelah batas tercapai, terkunci selama **30 detik**

### Contoh Request Login

```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"email": "admin@example.com", "password": "your_password"}'
```

### Contoh Response Login

```json
{
  "success": true,
  "message": "Login berhasil.",
  "data": {
    "token": "1|abc123...",
    "admin": {
      "id": 1,
      "name": "Administrator",
      "email": "admin@example.com"
    }
  }
}
```

---

## Menjalankan Aplikasi

### Mode Development

```bash
composer run dev
```

Perintah ini menjalankan secara bersamaan:
- `php artisan serve` — Server aplikasi
- `php artisan queue:listen` — Queue worker
- `php artisan pail` — Log viewer
- `npm run dev` — Vite asset bundler

### Hanya Server API

```bash
php artisan serve
```

Server akan berjalan di `http://localhost:8000`.

### Storage Link (wajib)

Agar file yang diupload dapat diakses publik:

```bash
php artisan storage:link
```

---

## Testing

```bash
# Jalankan semua test
composer run test

# Atau langsung dengan Artisan
php artisan test

# Jalankan test tertentu
php artisan test --filter=AuthTest
```

---

## Perintah Artisan

```bash
# Clear semua cache
php artisan optimize:clear

# Refresh migration + seeder (HATI-HATI: menghapus semua data)
php artisan migrate:fresh --seed

# Lihat daftar route
php artisan route:list --path=api

# Generate APP_KEY baru
php artisan key:generate
```


