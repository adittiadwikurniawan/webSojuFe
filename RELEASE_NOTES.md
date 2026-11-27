# Release Notes — SOJU FnB Web Frontend (`v2.1.0`)

**Versi:** 2.1  
**Tanggal Rilis:** 27 November 2026  
**Branch:** `feat/v2.1-midtrans-openrouter-ai`

---

## Ringkasan Pengembangan Versi 2.1

### 1. Integrasi Pembayaran Midtrans Snap (Customer & Admin)
- **Halaman Checkout Customer (`app/(customer)/customer/checkout/page.tsx`):**
  - Integrasi pembayaran non-tunai **Midtrans Snap** (QRIS, Virtual Account, GoPay, dan E-Wallet, tanpa COD).
  - Otomatis membuka halaman pembayaran `snapRedirectUrl` di tab baru setelah pesanan dibuat, lalu mengarahkan pelanggan ke halaman Riwayat Pesanan.
- **Halaman Riwayat Pesanan Customer (`app/(customer)/dashboard-customer/pesanan/page.tsx`):**
  - Menampilkan badge status pembayaran Midtrans real-time (`Lunas (Midtrans)`, `Menunggu Pembayaran`, `Belum Dibayar`, `Kedaluwarsa`, `Dibatalkan`, `Gagal`).
  - Menyediakan tombol **Bayar via Midtrans** untuk pesanan yang masih menunggu pembayaran.
  - Menyediakan panel **Struk Digital** untuk pesanan berstatus `SETTLEMENT` lengkap dengan metode bayar, waktu pelunasan, dan total pembayaran.
- **Halaman Pengelola Pesanan Admin (`app/dashboard/orders/page.tsx`):**
  - Menampilkan status pembayaran Midtrans dan metode pembayaran di setiap kartu pesanan masuk agar admin dapat memverifikasi pelunasan sebelum memproses pesanan.

### 2. Integrasi Soju AI (OpenRouter + Action Draft Tambah Barang)
- **Kontrak API & Draft (`lib/api.ts`):**
  - Memperluas tipe `AiActionDraft` untuk mendukung aksi **`CREATE_PRODUCT`** (`endpoint: '/api/v1/products'`, `sheet: 'Produk'`).
- **Chat AI & Konfirmasi Produk (`app/dashboard/ai/components/AiView.tsx`, `DraftCard.tsx`, `constants.ts`):**
  - Terintegrasi langsung dengan Hybrid RAG backend (OpenRouter / Gemini).
  - Menambahkan chip pintasan **Tambah Barang** dan contoh prompt (`tambah barang Es Teh Manis harga 5000 satuan cup varian dingin, tawar`).
  - Saat admin menekan tombol konfirmasi pada kartu draft produk, web otomatis mengirim `POST /api/v1/products` dan menampilkan tautan **Lihat di Katalog Produk →** (`/dashboard/cms`).

### 3. CI/CD GitHub Actions
- Menambahkan workflow `.github/workflows/web-ci.yml` yang menjalankan `npm ci`, `npx tsc --noEmit`, dan `npm run build` (Next.js 16 Turbopack) secara otomatis pada branch `main`, `WebSojuFeV2`, dan `feat/**`.

---

## Verifikasi
- `npx tsc --noEmit`: **0 errors**
- `npm run build` (Next.js 16.3.4 Turbopack): **27/27 routes compiled & generated successfully**
