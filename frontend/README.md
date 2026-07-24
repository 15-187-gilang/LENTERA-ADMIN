# LENTERA — Admin Frontend

> Panel administrasi untuk sistem manajemen data prestasi **LENTERA**

---

## Daftar Isi

- [Tentang Proyek](#tentang-proyek)
- [Teknologi](#teknologi)
- [Arsitektur](#arsitektur)
- [Struktur Direktori](#struktur-direktori)
- [Persyaratan Sistem](#persyaratan-sistem)
- [Instalasi & Setup](#instalasi--setup)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Halaman & Fitur](#halaman--fitur)
- [Routing](#routing)
- [Manajemen State & Autentikasi](#manajemen-state--autentikasi)
- [Komunikasi dengan API Backend](#komunikasi-dengan-api-backend)
- [Struktur Komponen](#struktur-komponen)
- [Custom Hooks](#custom-hooks)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)

---

## Tentang Proyek

LENTERA Admin Frontend adalah antarmuka panel administrasi yang memungkinkan administrator untuk:

- Login dan manajemen sesi secara aman
- Mengelola data prestasi (tambah, ubah, hapus, publish/draft)
- Mengelola kategori prestasi
- Mengelola media library (upload, preview, hapus file)
- Melihat statistik dan dashboard ringkasan
- Mengelola pengaturan website
- Mengelola profil dan password akun administrator

---

## Teknologi

| Komponen | Teknologi |
|---|---|
| UI Framework | [React 19](https://react.dev) |
| Bahasa | [TypeScript ~6.0](https://www.typescriptlang.org/) |
| Build Tool | [Vite 8](https://vitejs.dev/) |
| Routing | [React Router DOM v7](https://reactrouter.com/) |
| HTTP Client | [Axios 1.x](https://axios-http.com/) |
| Grafik & Chart | [Recharts 3](https://recharts.org/) |
| Icon | [Lucide React](https://lucide.dev/) |
| Notifikasi | [React Hot Toast](https://react-hot-toast.com/) |
| Upload File | [React Dropzone](https://react-dropzone.js.org/) |
| Preview PDF | [pdfjs-dist](https://mozilla.github.io/pdf.js/) |
| Styling | Vanilla CSS + [Tailwind CSS 4](https://tailwindcss.com/) |
| Linter | [Oxlint](https://oxc.rs/docs/guide/usage/linter) |
| Formatter | [Prettier](https://prettier.io/) |

---

## Arsitektur

Proyek ini menggunakan arsitektur berlapis:

```
src/
├── pages/          ← Halaman (route-level component)
│   └── Dashboard, Prestasi, Kategori, dll.
│
├── components/     ← Komponen reusable per domain
│   ├── common/     ← Komponen generik (Button, Badge, Modal, dll.)
│   ├── achievement/
│   ├── dashboard/
│   ├── media/
│   └── ...
│
├── hooks/          ← Custom hooks (state + business logic UI)
│   ├── useAchievement.ts
│   ├── useCategory.ts
│   └── ...
│
├── api/            ← Layer HTTP request ke backend
│   ├── axios.ts    ← Instance Axios + Interceptor
│   ├── achievementApi.ts
│   └── ...
│
├── contexts/       ← React Context (AuthContext)
├── types/          ← TypeScript type/interface definitions
├── constants/      ← Nilai konstan (routes, labels, options)
└── utils/          ← Helper function murni
```

**Prinsip utama:**
- **Pages** hanya mengatur layout dan memanggil hooks
- **Custom Hooks** mengurus state management dan logika interaksi
- **API Layer** hanya bertugas melakukan HTTP request dan mengembalikan data
- **Constants** mencegah magic string di seluruh codebase
- **Types** mendefinisikan kontrak data antara frontend dan backend

---

## Struktur Direktori

```
frontend/
├── public/
├── src/
│   ├── api/
│   │   ├── axios.ts               # Konfigurasi Axios + Interceptor
│   │   ├── achievementApi.ts      # CRUD Prestasi
│   │   ├── authApi.ts             # Login & Logout
│   │   ├── categoryApi.ts         # CRUD Kategori
│   │   ├── dashboardApi.ts        # Data Dashboard
│   │   ├── mediaApi.ts            # Upload & Manajemen Media
│   │   ├── profileApi.ts          # Profil & Password Admin
│   │   └── settingApi.ts          # Pengaturan Website
│   │
│   ├── components/
│   │   ├── Header/                # Header aplikasi
│   │   ├── Sidebar/               # Navigasi sidebar
│   │   ├── achievement/           # Komponen halaman Prestasi
│   │   │   ├── AchievementDetail/
│   │   │   ├── AchievementForm/   # Form tambah/edit prestasi
│   │   │   ├── AchievementStatistics/
│   │   │   ├── AchievementTable/
│   │   │   ├── AchievementTableRow/
│   │   │   └── AchievementToolbar/
│   │   ├── auth/                  # Komponen Login
│   │   ├── category/              # Komponen halaman Kategori
│   │   ├── common/                # Komponen generik reusable
│   │   │   ├── Badge/
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── ConfirmModal/      # Modal konfirmasi hapus
│   │   │   ├── EmptyState/
│   │   │   ├── ErrorState/
│   │   │   ├── Form/
│   │   │   ├── Loading/
│   │   │   └── Pagination/
│   │   ├── dashboard/             # Komponen Dashboard
│   │   │   ├── AchievementChart/  # Grafik tren prestasi
│   │   │   ├── RecentAchievements/
│   │   │   ├── SummaryCard/
│   │   │   └── SummaryCards/
│   │   ├── institution/
│   │   ├── media/                 # Komponen Media Library
│   │   │   ├── MediaCard/
│   │   │   ├── MediaGrid/
│   │   │   ├── MediaPickerModal/  # Pilih media dari library
│   │   │   ├── MediaToolbar/
│   │   │   ├── PreviewModal/      # Preview gambar/PDF
│   │   │   └── UploadModal/       # Upload file baru
│   │   └── profile/
│   │
│   ├── constants/
│   │   ├── api.ts                 # Base URL API
│   │   ├── badges.ts              # Konfigurasi badge level/status
│   │   ├── colors.ts              # Palet warna
│   │   ├── icons.ts               # Mapping icon
│   │   ├── levels.ts              # Opsi level prestasi
│   │   ├── navigation.ts          # Konfigurasi menu sidebar
│   │   ├── options.ts             # Dropdown options
│   │   ├── routes.ts              # Definisi semua route
│   │   ├── sort.ts                # Opsi pengurutan
│   │   ├── status.ts              # Label status prestasi
│   │   └── theme.ts               # Tema warna
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx        # Context autentikasi global
│   │
│   ├── hooks/
│   │   ├── dashboard/             # Hook khusus dashboard
│   │   ├── useAchievement.ts      # State & operasi prestasi
│   │   ├── useAuth.ts             # Akses AuthContext
│   │   ├── useCategory.ts         # State & operasi kategori
│   │   ├── useDebounce.ts         # Debounce input pencarian
│   │   ├── useForm.ts             # State management form
│   │   ├── useMedia.ts            # State & operasi media
│   │   └── useProfile.ts          # State & operasi profil
│   │
│   ├── layouts/
│   │   └── AdminLayout/           # Layout utama dengan Sidebar & Header
│   │
│   ├── pages/
│   │   ├── Dashboard/             # Halaman Dashboard
│   │   ├── Kategori/              # Halaman Kategori (list, tambah, edit)
│   │   ├── Login/                 # Halaman Login
│   │   ├── MediaLibrary/          # Halaman Media Library
│   │   ├── Prestasi/              # Halaman Prestasi (list, detail, tambah, edit)
│   │   └── Profil/                # Halaman Profil Administrator
│   │
│   ├── routes/
│   │   └── ProtectedRoute.tsx     # Guard route untuk halaman terproteksi
│   │
│   ├── types/
│   │   ├── AchievementForm.ts     # Type form prestasi
│   │   ├── Api.ts                 # Type response API (Achievement, Media, dll.)
│   │   ├── Auth.ts                # Type autentikasi
│   │   ├── Dashboard.ts           # Type data dashboard
│   │   └── Profile.ts             # Type profil admin
│   │
│   ├── utils/
│   │   ├── achievementValidation.ts  # Validasi form prestasi
│   │   ├── auth.ts                   # Helper localStorage (token, admin)
│   │   ├── badgeHelpers.ts           # Helper badge level/status
│   │   ├── file.ts                   # Helper format ukuran file
│   │   ├── formatDate.ts             # Helper format tanggal
│   │   ├── formatNumber.ts           # Helper format angka
│   │   ├── notify.ts                 # Wrapper react-hot-toast
│   │   ├── storage.ts                # Helper localStorage generik
│   │   ├── truncateText.ts           # Helper potong teks panjang
│   │   └── validation.ts             # Validasi form generik
│   │
│   ├── App.tsx                    # Root routing
│   ├── main.tsx                   # Entry point React
│   └── index.css                  # Global CSS
│
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── .env.example
```

---

## Persyaratan Sistem

- Node.js >= 18.x
- NPM >= 9.x
- Backend LENTERA berjalan di `http://localhost:8000`

---

## Instalasi & Setup

### 1. Clone repositori

```bash
git clone <url-repositori>
cd frontend
```

### 2. Install dependency

```bash
npm install
```

### 3. Konfigurasi environment

```bash
cp .env.example .env
```

Lalu isi variabel di `.env` (lihat bagian [Konfigurasi Environment](#konfigurasi-environment)).

### 4. Jalankan development server

```bash
npm run dev
```

Aplikasi berjalan di `http://localhost:5173/admin/`.

---

## Konfigurasi Environment

Buat file `.env` di root folder `frontend/`, salin dari `.env.example`:

```env
# URL API backend (wajib diisi)
VITE_API_URL=http://localhost:8000/api
```

> **Catatan:** Semua variabel environment Vite harus diawali `VITE_` agar dapat diakses di dalam kode.
> Jangan commit file `.env` ke repositori; file ini sudah terdaftar di `.gitignore`.

---

## Halaman & Fitur

### Login (`/login`)
- Form login dengan email dan password
- Menyimpan token Sanctum ke `localStorage`
- Redirect otomatis ke Dashboard setelah login berhasil
- Redirect ke Login jika token kadaluarsa (401)

### Dashboard (`/dashboard`)
- Kartu ringkasan statistik (total prestasi, publikasi, draft, unggulan)
- Grafik tren prestasi berdasarkan periode (bulanan/tahunan)
- Daftar prestasi terbaru

### Prestasi (`/prestasi`)
- Tabel daftar prestasi dengan filter dan pencarian
- Filter berdasarkan: kategori, level, status publikasi, unggulan
- Pencarian berdasarkan judul (dengan debounce)
- Pengurutan (terbaru / terlama)
- Paginasi

### Tambah Prestasi (`/prestasi/create`)
- Form lengkap data prestasi
- Upload thumbnail: dari komputer atau pilih dari Media Library
- Upload lampiran (PDF, dokumen)
- Dua mode simpan: **Simpan sebagai Draft** atau **Publish**

### Edit Prestasi (`/prestasi/:id/edit`)
- Form edit dengan data prestasi yang sudah ada
- Thumbnail saat ini ditampilkan sebagai preview
- Pilihan mengubah thumbnail: upload baru atau ganti dari library

### Detail Prestasi (`/prestasi/:id`)
- Tampilan detail lengkap satu prestasi
- Informasi penerima, penyelenggara, level, tanggal
- Status publikasi dan featured

### Kategori (`/kategori`)
- Daftar semua kategori prestasi
- Tambah, edit, dan hapus kategori

### Media Library (`/media`)
- Grid tampilan semua file yang diupload
- Upload file baru via drag & drop atau klik
- Preview gambar dan PDF
- Hapus file

### Profil Admin (`/profile`)
- Tampilkan dan edit nama serta email administrator
- Ganti password dengan verifikasi password lama

---

## Routing

Seluruh route didefinisikan terpusat di `src/constants/routes.ts`:

| Konstanta | Path | Halaman |
|---|---|---|
| `ROUTES.login` | `/login` | Halaman Login |
| `ROUTES.dashboard` | `/dashboard` | Dashboard |
| `ROUTES.achievements` | `/prestasi` | Daftar Prestasi |
| `ROUTES.achievementCreate` | `/prestasi/create` | Tambah Prestasi |
| `ROUTES.achievementDetail(id)` | `/prestasi/:id` | Detail Prestasi |
| `ROUTES.achievementEdit(id)` | `/prestasi/:id/edit` | Edit Prestasi |
| `ROUTES.categories` | `/kategori` | Daftar Kategori |
| `ROUTES.categoryCreate` | `/kategori/create` | Tambah Kategori |
| `ROUTES.categoryEdit(id)` | `/kategori/:id/edit` | Edit Kategori |
| `ROUTES.media` | `/media` | Media Library |
| `ROUTES.profile` | `/profile` | Profil Admin |

### Protected Route

Semua halaman (kecuali `/login`) dilindungi oleh `ProtectedRoute`. Jika token tidak ditemukan di `localStorage`, pengguna diarahkan kembali ke `/login`.

---

## Manajemen State & Autentikasi

### AuthContext

Sumber kebenaran tunggal untuk status autentikasi, tersedia di seluruh aplikasi melalui `AuthContext`:

```typescript
interface AuthContextType {
  admin: Admin | null;       // Data admin yang login
  token: string | null;      // Bearer token
  isAuthenticated: boolean;  // true jika token ada
  login: (credentials) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;          // true saat memuat session awal
}
```

**Cara penggunaan di komponen:**
```tsx
import { useAuth } from '../hooks/useAuth';

const { admin, logout } = useAuth();
```

### Penyimpanan Session

Token dan data admin disimpan di `localStorage`:

| Key | Isi |
|---|---|
| `token` | Bearer token dari Laravel Sanctum |
| `admin` | Data admin dalam format JSON |

Session direstorasi otomatis saat aplikasi dibuka ulang.

---

## Komunikasi dengan API Backend

### Konfigurasi Axios

Instance Axios dikonfigurasi di `src/api/axios.ts`:

- **Base URL:** `VITE_API_URL` dari environment
- **Timeout:** 10 detik
- **Default Headers:** `Accept: application/json`, `Content-Type: application/json`

**Request Interceptor:**
Secara otomatis menyisipkan `Authorization: Bearer {token}` ke setiap request jika token tersedia.

**Response Interceptor:**
Jika menerima response `401 Unauthorized`, secara otomatis menghapus session dan mengalihkan ke halaman login.

### Daftar API Module

| File | Endpoint yang Dipanggil | Fungsi |
|---|---|---|
| `achievementApi.ts` | `/achievements` | List, detail, create, update, delete, statistik |
| `authApi.ts` | `/login`, `/logout` | Login dan logout |
| `categoryApi.ts` | `/categories` | CRUD kategori |
| `dashboardApi.ts` | `/dashboard` | Data ringkasan dashboard |
| `mediaApi.ts` | `/media` | List, upload, hapus media |
| `profileApi.ts` | `/profile`, `/profile/password` | Lihat & update profil, ganti password |
| `settingApi.ts` | `/settings` | Ambil pengaturan website |

### Pengiriman File (multipart/form-data)

Untuk upload thumbnail dan lampiran, API menggunakan `FormData`:

```typescript
const formData = new FormData();
formData.append('title', 'Judul Prestasi');
formData.append('thumbnail', file); // File object
// Untuk update: tambahkan _method=PUT (Laravel method spoofing)
formData.append('_method', 'PUT');
```

---

## Struktur Komponen

### Common Components

Komponen generik yang dapat digunakan di semua halaman:

| Komponen | Deskripsi |
|---|---|
| `Badge` | Label berwarna untuk status/level |
| `Button` | Tombol dengan varian (primary, secondary, danger) |
| `Card` | Wadah konten dengan shadow |
| `ConfirmModal` | Modal konfirmasi sebelum menghapus data |
| `EmptyState` | Tampilan ketika data kosong |
| `ErrorState` | Tampilan ketika terjadi error |
| `Form` | Wrapper dan field form |
| `Loading` | Spinner loading |
| `Pagination` | Kontrol navigasi halaman |

### Achievement Components

| Komponen | Deskripsi |
|---|---|
| `AchievementForm` | Form lengkap tambah/edit prestasi |
| `AchievementTable` | Tabel daftar prestasi |
| `AchievementTableRow` | Satu baris tabel prestasi |
| `AchievementToolbar` | Filter, pencarian, dan sort bar |
| `AchievementDetail` | Tampilan detail satu prestasi |
| `AchievementStatistics` | Kartu statistik ringkasan |

### Dashboard Components

| Komponen | Deskripsi |
|---|---|
| `SummaryCards` | Sekumpulan kartu statistik |
| `SummaryCard` | Satu kartu statistik |
| `AchievementChart` | Grafik tren prestasi (Recharts) |
| `RecentAchievements` | Daftar prestasi terbaru |

### Media Components

| Komponen | Deskripsi |
|---|---|
| `MediaGrid` | Grid tampilan semua media |
| `MediaCard` | Satu item media |
| `MediaToolbar` | Pencarian dan filter media |
| `UploadModal` | Modal upload file baru |
| `PreviewModal` | Preview gambar atau PDF |
| `MediaPickerModal` | Picker untuk memilih media dari library saat mengisi form prestasi |

---

## Custom Hooks

Hook berfungsi sebagai layer logika antara komponen dan API:

### `useAchievement`
Mengelola seluruh operasi data prestasi:
- State: `achievements`, `pagination`, `loading`, `submitting`, `error`, `filters`
- Filter: `setSearchFilter`, `setLevelFilter`, `setPublishedFilter`, `setFeaturedFilter`, `setSortFilter`
- Aksi: `createAchievement`, `updateAchievement`, `deleteAchievement`
- Paginasi: `changePage`
- Lain-lain: `resetFilters`, `refresh`

### `useCategory`
Mengelola operasi CRUD kategori:
- State: `categories`, `loading`, `error`
- Aksi: `createCategory`, `updateCategory`, `deleteCategory`

### `useMedia`
Mengelola operasi media library:
- State: `media`, `pagination`, `loading`
- Aksi: `uploadMedia`, `deleteMedia`
- Filter: pencarian dan paginasi

### `useProfile`
Mengelola profil administrator:
- Aksi: `updateProfile`, `changePassword`

### `useAuth`
Akses cepat ke `AuthContext`:
```typescript
const { admin, isAuthenticated, login, logout } = useAuth();
```

### `useDebounce`
Menunda eksekusi hingga pengguna berhenti mengetik (digunakan pada input pencarian):
```typescript
const debouncedSearch = useDebounce(search, 400);
```

### `useForm`
Manajemen state form generik dengan validasi:
- State: `values`, `errors`, `loading`
- Aksi: `onChange`, `setErrors`, `reset`

---

## Menjalankan Aplikasi

### Development

```bash
npm run dev
```

Aplikasi berjalan di `http://localhost:5173/admin/`.

> **Catatan:** Karena `base: "/admin/"` dikonfigurasi di `vite.config.ts`, URL dasar aplikasi adalah `/admin/`.

### Build Production

```bash
npm run build
```

Output tersimpan di folder `dist/`.

### Preview Build

```bash
npm run preview
```

### Linting & Formatting

```bash
# Linting
npm run lint

# Format semua file
npm run format

# Cek format tanpa mengubah
npm run format:check
```

---

## Proxy Storage

Vite dikonfigurasi untuk mem-proxy request ke `/storage` ke server backend agar file yang diupload dapat diakses saat development:

```typescript
// vite.config.ts
server: {
  proxy: {
    "/storage": {
      target: "http://127.0.0.1:8000",
      changeOrigin: true,
    },
  },
},
```

Sehingga URL seperti `http://localhost:5173/storage/achievements/foto.jpg` akan diteruskan ke `http://127.0.0.1:8000/storage/achievements/foto.jpg`.

---

## Lisensi

Proyek ini dikembangkan untuk keperluan akademik.
