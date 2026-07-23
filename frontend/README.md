# Frontend Admin LENTERA

## 1. Deskripsi Proyek
Frontend Admin LENTERA merupakan aplikasi berbasis web yang dirancang khusus untuk administrator sistem guna mengelola data dan konten pada platform LENTERA. Aplikasi ini menyajikan antarmuka (dashboard) yang interaktif, modern, dan intuitif untuk mengontrol berbagai entitas sistem secara mudah.

## 2. Tujuan
Tujuan utama dari proyek ini adalah menyediakan dasbor manajemen terpusat yang memudahkan administrator dalam:
- Melakukan operasi CRUD (Create, Read, Update, Delete) pada data utama aplikasi (seperti data prestasi dan kategori).
- Mengelola aset file dan dokumen melalui Media Library.
- Memonitor ringkasan aktivitas sistem melalui dasbor.
- Memastikan keamanan akses konten melalui sistem autentikasi.

## 3. Fitur
- **Autentikasi:** Sistem login dan proteksi halaman (Protected Routes).
- **Dasbor Utama:** Menampilkan ringkasan data dan grafik statistik.
- **Manajemen Prestasi:** Fitur untuk melihat daftar, menambah, mengubah, dan menghapus data prestasi.
- **Manajemen Kategori:** Fitur untuk mengelola kategori prestasi.
- **Media Library:** Pengelolaan aset media (gambar, dokumen) dengan fitur unggah file.
- **Manajemen Profil:** Pengaturan profil administrator.

## 4. Teknologi
Proyek ini dibangun menggunakan teknologi modern:
- **Core:** React 19, TypeScript
- **Build Tool:** Vite
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS v4
- **HTTP Client:** Axios
- **Ikon & UI:** Lucide React
- **Grafik:** Recharts
- **File Upload:** React Dropzone
- **Notifikasi:** React Hot Toast
- **Linting & Formatting:** Oxlint, Prettier

## 5. Arsitektur Frontend
Arsitektur frontend dibangun menggunakan pendekatan berbasis komponen (*Component-based architecture*) dengan React. Logika aplikasi dipisahkan secara modular: antarmuka pengguna ditangani oleh komponen fungsional di `pages` dan `components`, state global dikelola melalui `contexts`, logika yang berulang diabstraksi dalam `hooks`, dan komunikasi dengan backend terpusat melalui folder `api`. Hal ini memastikan basis kode lebih bersih, mudah dipelihara, dan skalabel.

## 6. Struktur Folder
Berikut adalah struktur direktori utama di dalam `src/`:

- `src/api/` : Berisi konfigurasi Axios dan fungsi pemanggilan API ke backend.
- `src/assets/` : Menyimpan file statis seperti gambar, ikon, atau font.
- `src/components/` : Kumpulan komponen UI modular dan *reusable* (seperti Button, Modal, dll).
- `src/constants/` : Berisi variabel konstan seperti daftar rute (ROUTES) atau konfigurasi aplikasi.
- `src/contexts/` : Implementasi React Context API untuk manajemen state global (seperti AuthContext).
- `src/hooks/` : Kumpulan *custom hooks* untuk memisahkan logika dari tampilan komponen.
- `src/layouts/` : Komponen pembungkus tata letak struktur halaman (misal: Sidebar, Header).
- `src/pages/` : Komponen utama yang merepresentasikan setiap halaman (Dashboard, Login, Prestasi, dll).
- `src/routes/` : Konfigurasi rute aplikasi, termasuk `ProtectedRoute` untuk membatasi akses.
- `src/types/` : Definisi *interface* dan tipe data TypeScript untuk menjaga konsistensi dan *type safety*.
- `src/utils/` : Fungsi-fungsi utilitas pendukung (seperti pemformatan tanggal, mata uang, dll).

## 7. Routing
Pengaturan rute menggunakan `react-router-dom` dan dibagi menjadi dua jenis:
- **Public Routes:** Rute yang bisa diakses siapa saja tanpa login, contohnya halaman Login (`/`).
- **Protected Routes:** Rute yang hanya dapat diakses setelah autentikasi berhasil. Dibungkus menggunakan komponen `<ProtectedRoute>`. Contoh: `/dashboard`, `/prestasi`, `/kategori`, `/media`.

## 8. Integrasi API
Seluruh proses pertukaran data dengan server menggunakan `axios`. Implementasinya terpusat agar pengelolaan *base URL* dan *interceptor* (seperti menyisipkan token otorisasi pada *header* permintaan, atau penanganan *error* token *expired*) dapat dilakukan pada satu titik yang kemudian dipanggil oleh komponen halaman yang membutuhkan.

## 9. Screenshot
*(Silakan tambahkan gambar screenshot aplikasi dengan menempatkan file gambar di dalam folder proyek dan memperbarui tautan di bawah ini)*

![Screenshot Dashboard Admin](./screenshot-placeholder.png)
