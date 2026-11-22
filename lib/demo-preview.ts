const DEMO_MODE_KEY = "soju_demo_mode";
const DEMO_DATA_KEY = "soju_demo_data";

type DemoJenis = {
  id: number;
  kode: string;
  namaTransaksi: string;
  arah: "PEMASUKAN" | "PENGELUARAN";
  jenisAkun: string;
  aktif: boolean;
};

type DemoColumn = {
  id: number;
  namaKolom: string;
  tipeData: string;
  opsiDropdown?: string[] | null;
};

type DemoEntry = {
  id: number;
  kode: string;
  tanggal: string;
  detail: string;
  jenisTransaksiId: number;
  namaTransaksi: string;
  jenisTransaksi: { arah: "PEMASUKAN" | "PENGELUARAN" };
  nominal: number;
  debit: string;
  kredit: string;
  customData: Record<string, string>;
};

type DemoTable = {
  id: number;
  namaTabel: string;
  deskripsi: string;
  kolom: DemoColumn[];
  baris: { id: number; data: Record<string, string> }[];
};

type DemoProduct = {
  id: number;
  namaBarang: string;
  hargaDefault: number;
  gambar: string;
  deskripsi: string;
  varian: string;
  aktif: boolean;
};

type DemoContent = {
  key: string;
  judul: string;
  subJudul: string;
  konten: string;
  aktif: boolean;
};

export type DemoProfile = {
  user: { nama: string; email: string; telepon: string; jabatan: string; toko: string };
  toko: { nama: string; alamat: string; telepon: string; instagram: string; whatsapp: string; deskripsi: string };
  pengaturan: {
    notifWa: boolean;
    notifEmail: boolean;
    notifStok: boolean;
    notifOrder: boolean;
    tanggalAwalBulan: number;
    mataUang: string;
    bahasa: string;
  };
};

type DemoStore = {
  types: DemoJenis[];
  columns: Record<string, DemoColumn[]>;
  transactions: DemoEntry[];
  tables: DemoTable[];
  products: DemoProduct[];
  contents: Record<string, DemoContent>;
  menu: { id: number; label: string; path: string; urutan: number; aktif: boolean }[];
  audit: Record<string, unknown>[];
  profile: DemoProfile;
  nextId: number;
};

const SEED: DemoStore = {
  types: [
    { id: 1, kode: "JUAL", namaTransaksi: "Penjualan Produk", arah: "PEMASUKAN", jenisAkun: "Pendapatan", aktif: true },
    { id: 2, kode: "BELI", namaTransaksi: "Pembelian Bahan Baku", arah: "PENGELUARAN", jenisAkun: "Beban", aktif: true },
    { id: 3, kode: "OPER", namaTransaksi: "Biaya Operasional", arah: "PENGELUARAN", jenisAkun: "Beban", aktif: true },
  ],
  columns: {
    "1": [
      { id: 11, namaKolom: "Customer", tipeData: "TEKS" },
      { id: 12, namaKolom: "Sumber", tipeData: "TEKS" },
    ],
    "2": [{ id: 21, namaKolom: "Supplier", tipeData: "TEKS" }],
    "3": [{ id: 31, namaKolom: "Kategori", tipeData: "TEKS" }],
  },
  transactions: [
    {
      id: 101, kode: "TRX-00101", tanggal: "2026-11-15", detail: "Penjualan nugget ayam",
      jenisTransaksiId: 1, namaTransaksi: "Penjualan Produk", jenisTransaksi: { arah: "PEMASUKAN" },
      nominal: 240_000, debit: "Kas", kredit: "Penjualan", customData: { "11": "Bu Siti", "12": "WhatsApp" },
    },
    {
      id: 102, kode: "TRX-00102", tanggal: "2026-11-14", detail: "Pembelian daging ayam",
      jenisTransaksiId: 2, namaTransaksi: "Pembelian Bahan Baku", jenisTransaksi: { arah: "PENGELUARAN" },
      nominal: 320_000, debit: "Persediaan", kredit: "Kas", customData: { "21": "Bahan Sejahtera" },
    },
    {
      id: 103, kode: "TRX-00103", tanggal: "2026-11-13", detail: "Biaya listrik dan air",
      jenisTransaksiId: 3, namaTransaksi: "Biaya Operasional", jenisTransaksi: { arah: "PENGELUARAN" },
      nominal: 185_000, debit: "Beban Operasional", kredit: "Kas", customData: { "31": "Utilitas" },
    },
    {
      id: 104, kode: "TRX-00104", tanggal: "2026-11-12", detail: "Pesanan frozen food",
      jenisTransaksiId: 1, namaTransaksi: "Penjualan Produk", jenisTransaksi: { arah: "PEMASUKAN" },
      nominal: 475_000, debit: "Kas", kredit: "Penjualan", customData: { "11": "Dapur Rasa", "12": "Instagram" },
    },
  ],
  tables: [
    {
      id: 201,
      namaTabel: "Daftar Supplier",
      deskripsi: "Kontak pemasok bahan baku",
      kolom: [
        { id: 2011, namaKolom: "Nama Supplier", tipeData: "TEKS" },
        { id: 2012, namaKolom: "Kontak", tipeData: "TEKS" },
        { id: 2013, namaKolom: "Kategori", tipeData: "TEKS" },
      ],
      baris: [
        { id: 20101, data: { "2011": "Bahan Sejahtera", "2012": "0812-3456-7890", "2013": "Bahan baku" } },
        { id: 20102, data: { "2011": "Frozen Mart", "2012": "0813-4567-8901", "2013": "Produk frozen" } },
      ],
    },
  ],
  products: [
    { id: 301, namaBarang: "Nugget Ayam 500g", hargaDefault: 48_000, gambar: "", deskripsi: "Nugget ayam siap goreng", varian: "500g", aktif: true },
    { id: 302, namaBarang: "Siomay Ayam", hargaDefault: 35_000, gambar: "", deskripsi: "Siomay ayam frozen", varian: "10 pcs", aktif: true },
    { id: 303, namaBarang: "Dimsum Udang", hargaDefault: 42_000, gambar: "", deskripsi: "Dimsum udang pilihan", varian: "10 pcs", aktif: true },
    { id: 304, namaBarang: "Tempura Udang", hargaDefault: 39_000, gambar: "", deskripsi: "Tempura udang crispy", varian: "250g", aktif: true },
  ],
  contents: {
    headline_beranda: { key: "headline_beranda", judul: "Frozen food favorit keluarga", subJudul: "Praktis disajikan, nikmat setiap hari", konten: "Pilihan makanan beku berkualitas untuk stok di rumah.", aktif: true },
    tentang_kami: { key: "tentang_kami", judul: "Tentang SOJU", subJudul: "Dapur praktis untuk keluarga", konten: "SOJU menyediakan pilihan kuliner dan frozen food untuk kebutuhan sehari-hari.", aktif: true },
    kontak: { key: "kontak", judul: "0812-3456-7890", subJudul: "halo@soju.local", konten: "Bandung, Jawa Barat", aktif: true },
    produk_unggulan: { key: "produk_unggulan", judul: "Produk Unggulan", subJudul: "Maksimal 5 produk", konten: "[301,302]", aktif: true },
  },
  menu: [
    { id: 1, label: "Beranda", path: "/", urutan: 1, aktif: true },
    { id: 2, label: "Menu", path: "/customer/menu", urutan: 2, aktif: true },
    { id: 3, label: "Tentang Kami", path: "/customer/tentang", urutan: 3, aktif: true },
    { id: 4, label: "Kontak", path: "/customer/kontak", urutan: 4, aktif: true },
  ],
  audit: [
    { id: 401, createdAt: "2026-11-15T08:30:00.000Z", sheet: "transaksi", recordLabel: "TRX-00101", action: "TAMBAH", source: "MANUAL", user: { nama: "Bu Pemilik" }, detail: "Penjualan nugget ayam", dataSesudah: "Rp 240.000" },
    { id: 402, createdAt: "2026-11-14T06:20:00.000Z", sheet: "produk", recordLabel: "Nugget Ayam 500g", action: "UBAH", source: "AI", user: { nama: "Bu Pemilik" }, detail: "Harga menu diperbarui", dataSebelum: "Rp 45.000", dataSesudah: "Rp 48.000" },
    { id: 403, createdAt: "2026-11-13T04:10:00.000Z", sheet: "tabel bebas", recordLabel: "Daftar Supplier", action: "TAMBAH", source: "MANUAL", user: { nama: "Bu Pemilik" }, detail: "Data supplier ditambahkan" },
  ],
  profile: {
    user: { nama: "Bu Pemilik", email: "demo@soju.local", telepon: "0812-3456-7890", jabatan: "Pemilik Toko", toko: "SOJU Kuliner" },
    toko: { nama: "SOJU Kuliner & Frozen Food", alamat: "Bandung, Jawa Barat", telepon: "0812-3456-7890", instagram: "@soju.kuliner", whatsapp: "0812-3456-7890", deskripsi: "Kuliner dan frozen food untuk kebutuhan keluarga." },
    pengaturan: { notifWa: true, notifEmail: false, notifStok: true, notifOrder: true, tanggalAwalBulan: 1, mataUang: "IDR (Rp)", bahasa: "Bahasa Indonesia" },
  },
  nextId: 500,
};

export function isDemoPreviewSession(): boolean {
  return typeof window !== "undefined";
}

export function setDemoPreviewSession(enabled: boolean): void {
  if (typeof window === "undefined") return;
  if (enabled) window.localStorage.setItem(DEMO_MODE_KEY, "1");
  else window.localStorage.removeItem(DEMO_MODE_KEY);
  window.dispatchEvent(new Event("soju-demo-mode-change"));
}

function getStore(): DemoStore {
  const raw = window.localStorage.getItem(DEMO_DATA_KEY);
  if (!raw) {
    saveStore(SEED);
    return structuredClone(SEED);
  }
  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || !("types" in parsed) || !Array.isArray(parsed.types)) {
    throw new Error("Data pratinjau lokal tidak valid. Keluar lalu masuk kembali dengan akun demo.");
  }
  return parsed as DemoStore;
}

function saveStore(store: DemoStore): void {
  window.localStorage.setItem(DEMO_DATA_KEY, JSON.stringify(store));
}

function parseBody(body: BodyInit | null | undefined): Record<string, unknown> {
  if (typeof body !== "string" || !body) return {};
  const parsed: unknown = JSON.parse(body);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
  return parsed as Record<string, unknown>;
}

function envelope<T>(data: T): { success: true; data: T } {
  return { success: true, data };
}

function addAudit(store: DemoStore, sheet: string, recordLabel: string, action: string, detail: string): void {
  store.audit.unshift({
    id: store.nextId++,
    createdAt: new Date().toISOString(),
    sheet,
    recordLabel,
    action,
    source: "MANUAL",
    user: { nama: "Bu Pemilik" },
    detail,
  });
}

function transactionResponse(store: DemoStore, query: URLSearchParams) {
  const search = (query.get("search") || "").toLowerCase();
  const typeId = Number(query.get("jenis_transaksi_id") || 0);
  const startDate = query.get("tanggal_mulai") || "";
  const endDate = query.get("tanggal_selesai") || "";
  const filtered = store.transactions.filter((entry) =>
    (!typeId || entry.jenisTransaksiId === typeId) &&
    (!startDate || entry.tanggal >= startDate) &&
    (!endDate || entry.tanggal <= endDate) &&
    (!search || `${entry.kode} ${entry.detail} ${entry.namaTransaksi}`.toLowerCase().includes(search)),
  );
  const page = Math.max(1, Number(query.get("page") || 1));
  const limit = Math.max(1, Number(query.get("limit") || 10));
  const start = (page - 1) * limit;
  return envelope({ data: filtered.slice(start, start + limit), pagination: { total: filtered.length, page, limit } });
}

export function getDemoContent(key: string) {
  return getStore().contents[key] ?? null;
}

export function getDemoProducts(search = "") {
  const query = search.toLowerCase();
  return getStore().products.filter((product) =>
    product.aktif && (!query || `${product.namaBarang} ${product.deskripsi}`.toLowerCase().includes(query)),
  );
}

export function getDemoExportRows() {
  return getStore().transactions;
}

export function getDemoFreeTable(id: number) {
  return getStore().tables.find((table) => table.id === id);
}

export function getDemoProfile() {
  return getStore().profile;
}

export function saveDemoProfile(profile: DemoProfile): void {
  const store = getStore();
  store.profile = profile;
  saveStore(store);
}

export async function handleDemoPreviewRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = new URL(endpoint, "http://soju-demo.local");
  const path = url.pathname.split("/").filter(Boolean);
  const method = (options.method || "GET").toUpperCase();
  const body = parseBody(options.body);
  const store = getStore();
  let result: unknown;

  if (path[0] === "auth" && path[1] === "login") {
    result = envelope({ token: "soju-preview-token", user: { id: 1, ...store.profile.user, peran: "SUPER_ADMIN" } });
  } else if (path[0] === "auth" && path[1] === "me") {
    if (method === "PATCH") {
      store.profile.user = {
        ...store.profile.user,
        nama: String(body.nama ?? store.profile.user.nama),
        email: String(body.email ?? store.profile.user.email),
      };
    }
    result = envelope({ id: 1, ...store.profile.user, peran: "SUPER_ADMIN" });
  } else if (path[0] === "dashboard" && path[1] === "summary") {
    result = envelope({ saldo_kas: 4_850_000 });
  } else if (path[0] === "dashboard" && path[1] === "grafik-kas") {
    result = envelope([
      { tanggal: "2026-11-09", pemasukan: 420_000, pengeluaran: 250_000, transaksi: [] },
      { tanggal: "2026-11-10", pemasukan: 550_000, pengeluaran: 320_000, transaksi: [] },
      { tanggal: "2026-11-11", pemasukan: 380_000, pengeluaran: 180_000, transaksi: [] },
      { tanggal: "2026-11-12", pemasukan: 610_000, pengeluaran: 420_000, transaksi: [] },
      { tanggal: "2026-11-13", pemasukan: 720_000, pengeluaran: 300_000, transaksi: [] },
      { tanggal: "2026-11-14", pemasukan: 560_000, pengeluaran: 350_000, transaksi: [] },
      { tanggal: "2026-11-15", pemasukan: 840_000, pengeluaran: 595_000, transaksi: [] },
    ]);
  } else if (path[0] === "dashboard" && path[1] === "sumber-input") {
    result = envelope({ ai: 318, manual: 124, total: 442, aiPersen: 72, manualPersen: 28 });
  } else if (path[0] === "dashboard" && path[1] === "pemasukan-pengeluaran") {
    result = envelope({ daily: Array.from({ length: 7 }), totals: { pemasukan: 4_080_000, pengeluaran: 2_415_000, laba: 1_665_000 } });
  } else if (path[0] === "transaction-types") {
    if (path.length === 1 && method === "GET") {
      const activeOnly = url.searchParams.get("aktif");
      result = envelope(store.types.filter((item) => activeOnly !== "true" || item.aktif));
    } else if (path.length === 1 && method === "POST") {
      const item: DemoJenis = {
        id: store.nextId++,
        kode: String(body.kode || "DEMO"),
        namaTransaksi: String(body.nama_transaksi || "Jenis Baru"),
        arah: body.arah === "PENGELUARAN" ? "PENGELUARAN" : "PEMASUKAN",
        jenisAkun: String(body.jenis_akun || ""),
        aktif: true,
      };
      store.types.push(item);
      store.columns[String(item.id)] = [];
      addAudit(store, "master transaksi", item.namaTransaksi, "TAMBAH", "Jenis transaksi ditambahkan");
      result = envelope(item);
    } else if (path.length === 2) {
      const typeId = Number(path[1]);
      const type = store.types.find((item) => item.id === typeId);
      if (path.length === 2 && method === "GET" && type) result = envelope(type);
      else if (method === "PUT" && type) {
        type.namaTransaksi = String(body.nama_transaksi ?? type.namaTransaksi);
        type.kode = String(body.kode ?? type.kode);
        type.arah = body.arah === "PENGELUARAN" ? "PENGELUARAN" : type.arah;
        addAudit(store, "master transaksi", type.namaTransaksi, "UBAH", "Jenis transaksi diperbarui");
        result = envelope(type);
      } else if (method === "DELETE") {
        store.types = store.types.filter((item) => item.id !== typeId);
        delete store.columns[String(typeId)];
        addAudit(store, "master transaksi", type?.namaTransaksi || String(typeId), "HAPUS", "Jenis transaksi dihapus");
        result = envelope({ deleted: true });
      }
    } else if (path[2] === "columns") {
      const typeId = Number(path[1]);
      const columns = store.columns[String(typeId)] || [];
      if (path.length === 3 && method === "GET") result = envelope(columns);
      else if (path.length === 3 && method === "POST") {
        const column: DemoColumn = {
          id: store.nextId++,
          namaKolom: String(body.nama_kolom || "Kolom baru"),
          tipeData: String(body.tipe_data || "TEKS"),
          opsiDropdown: Array.isArray(body.opsi_dropdown) ? body.opsi_dropdown.map(String) : undefined,
        };
        store.columns[String(typeId)] = [...columns, column];
        result = envelope(column);
      } else {
        const columnId = Number(path[3]);
        const column = columns.find((item) => item.id === columnId);
        if (method === "PUT" && column) {
          column.namaKolom = String(body.nama_kolom ?? column.namaKolom);
          column.tipeData = String(body.tipe_data ?? column.tipeData);
          result = envelope(column);
        } else if (method === "DELETE") {
          store.columns[String(typeId)] = columns.filter((item) => item.id !== columnId);
          result = envelope({ deleted: true });
        }
      }
    }
  } else if (path[0] === "transactions") {
    if (path.length === 1 && method === "GET") {
      result = transactionResponse(store, url.searchParams);
    } else if (path.length === 1 && method === "POST") {
      const typeId = Number(body.jenis_transaksi_id);
      const type = store.types.find((item) => item.id === typeId);
      const entry: DemoEntry = {
        id: store.nextId++,
        kode: `TRX-${String(store.nextId).padStart(5, "0")}`,
        tanggal: String(body.tanggal || "2026-11-15"),
        detail: String(body.detail || ""),
        jenisTransaksiId: typeId,
        namaTransaksi: type?.namaTransaksi || "Transaksi Baru",
        jenisTransaksi: { arah: type?.arah || "PEMASUKAN" },
        nominal: Number(body.nominal || 0),
        debit: String(body.debit || ""),
        kredit: String(body.kredit || ""),
        customData: (body.custom_data as Record<string, string>) || {},
      };
      store.transactions.unshift(entry);
      addAudit(store, "transaksi", entry.kode, "TAMBAH", entry.detail || entry.namaTransaksi);
      result = envelope(entry);
    } else if (path.length === 2) {
      const id = Number(path[1]);
      const entry = store.transactions.find((item) => item.id === id);
      if (method === "GET" && entry) result = envelope(entry);
      else if (method === "PUT" && entry) {
        entry.tanggal = String(body.tanggal ?? entry.tanggal);
        entry.detail = String(body.detail ?? entry.detail);
        entry.nominal = Number(body.nominal ?? entry.nominal);
        entry.debit = String(body.debit ?? entry.debit);
        entry.kredit = String(body.kredit ?? entry.kredit);
        entry.customData = (body.custom_data as Record<string, string>) || entry.customData;
        addAudit(store, "transaksi", entry.kode, "UBAH", entry.detail);
        result = envelope(entry);
      } else if (method === "DELETE") {
        store.transactions = store.transactions.filter((item) => item.id !== id);
        addAudit(store, "transaksi", entry?.kode || String(id), "HAPUS", entry?.detail || "Transaksi dihapus");
        result = envelope({ deleted: true });
      }
    }
  } else if (path[0] === "free-tables") {
    if (path.length === 1 && method === "GET") result = envelope(store.tables);
    else if (path.length === 1 && method === "POST") {
      const columns = Array.isArray(body.kolom) ? body.kolom as Record<string, unknown>[] : [];
      const table: DemoTable = {
        id: store.nextId++,
        namaTabel: String(body.nama_tabel || "Tabel Baru"),
        deskripsi: String(body.deskripsi || ""),
        kolom: columns.map((column) => ({
          id: store.nextId++,
          namaKolom: String(column.nama_kolom || "Kolom"),
          tipeData: String(column.tipe_data || "TEKS"),
          opsiDropdown: Array.isArray(column.opsi_dropdown) ? column.opsi_dropdown.map(String) : undefined,
        })),
        baris: [],
      };
      store.tables.push(table);
      addAudit(store, "tabel bebas", table.namaTabel, "TAMBAH", "Tabel pendataan dibuat");
      result = envelope(table);
    } else if (path.length === 2) {
      const tableId = Number(path[1]);
      const table = store.tables.find((item) => item.id === tableId);
      if (method === "GET" && table) result = envelope(table);
      else if (method === "PUT" && table) {
        table.namaTabel = String(body.nama_tabel ?? table.namaTabel);
        table.deskripsi = String(body.deskripsi ?? table.deskripsi);
        result = envelope(table);
      } else if (method === "DELETE") {
        store.tables = store.tables.filter((item) => item.id !== tableId);
        addAudit(store, "tabel bebas", table?.namaTabel || String(tableId), "HAPUS", "Tabel pendataan dihapus");
        result = envelope({ deleted: true });
      }
    } else if (path[2] === "rows") {
      const table = store.tables.find((item) => item.id === Number(path[1]));
      if (path.length === 3 && method === "POST" && table) {
        const row = { id: store.nextId++, data: (body.data as Record<string, string>) || {} };
        table.baris.push(row);
        addAudit(store, "tabel bebas", table.namaTabel, "TAMBAH", "Baris pendataan ditambahkan");
        result = envelope(row);
      } else if (path.length === 4 && table) {
        const rowId = Number(path[3]);
        const row = table.baris.find((item) => item.id === rowId);
        if (method === "PUT" && row) {
          row.data = (body.data as Record<string, string>) || row.data;
          addAudit(store, "tabel bebas", table.namaTabel, "UBAH", "Baris pendataan diperbarui");
          result = envelope(row);
        } else if (method === "DELETE") {
          table.baris = table.baris.filter((item) => item.id !== rowId);
          addAudit(store, "tabel bebas", table.namaTabel, "HAPUS", "Baris pendataan dihapus");
          result = envelope({ deleted: true });
        }
      }
    }
  } else if (path[0] === "products") {
    if (path.length === 1 && method === "GET") {
      const search = (url.searchParams.get("search") || "").toLowerCase();
      const active = url.searchParams.get("is_active");
      result = envelope(store.products.filter((product) =>
        (active !== "true" || product.aktif) &&
        (!search || `${product.namaBarang} ${product.deskripsi}`.toLowerCase().includes(search)),
      ));
    } else if (path.length === 1 && method === "POST") {
      const product: DemoProduct = {
        id: store.nextId++,
        namaBarang: String(body.namaBarang || "Menu Baru"),
        hargaDefault: Number(body.hargaDefault || 0),
        gambar: String(body.gambar || ""),
        deskripsi: String(body.deskripsi || ""),
        varian: String(body.varian || ""),
        aktif: true,
      };
      store.products.push(product);
      addAudit(store, "produk", product.namaBarang, "TAMBAH", "Menu ditambahkan");
      result = envelope(product);
    } else if (path.length === 2) {
      const id = Number(path[1]);
      const product = store.products.find((item) => item.id === id);
      if (method === "GET" && product) result = envelope(product);
      else if (method === "PUT" && product) {
        product.namaBarang = String(body.namaBarang ?? product.namaBarang);
        product.hargaDefault = Number(body.hargaDefault ?? product.hargaDefault);
        product.gambar = String(body.gambar ?? product.gambar);
        product.deskripsi = String(body.deskripsi ?? product.deskripsi);
        product.varian = String(body.varian ?? product.varian);
        addAudit(store, "produk", product.namaBarang, "UBAH", "Menu diperbarui");
        result = envelope(product);
      } else if (method === "DELETE") {
        store.products = store.products.filter((item) => item.id !== id);
        addAudit(store, "produk", product?.namaBarang || String(id), "HAPUS", "Menu dihapus");
        result = envelope({ deleted: true });
      }
    }
  } else if (path[0] === "cms") {
    if (path[1] === "content") {
      if (path.length === 2 && method === "GET") result = envelope(Object.values(store.contents));
      else if (path.length === 2 && method === "POST") {
        const key = String(body.key || `konten-${store.nextId}`);
        const content: DemoContent = {
          key, judul: String(body.judul || ""), subJudul: String(body.subJudul || ""),
          konten: String(body.konten || ""), aktif: body.aktif !== false,
        };
        store.contents[key] = content;
        result = envelope(content);
      } else if (path.length === 3) {
        const key = decodeURIComponent(path[2]);
        const content = store.contents[key];
        if (method === "GET") result = envelope(content || null);
        else if (method === "PUT") {
          const updated = {
            key,
            judul: String(body.judul ?? content?.judul ?? ""),
            subJudul: String(body.subJudul ?? content?.subJudul ?? ""),
            konten: String(body.konten ?? content?.konten ?? ""),
            aktif: body.aktif !== false,
          };
          store.contents[key] = updated;
          addAudit(store, "cms", key, "UBAH", "Konten halaman diperbarui");
          result = envelope(updated);
        } else if (method === "DELETE") {
          delete store.contents[key];
          result = envelope({ deleted: true });
        }
      }
    } else if (path[1] === "menu") {
      if (path.length === 2 && method === "GET") result = envelope(store.menu);
      else if (path.length === 2 && method === "POST") {
        const item = { id: store.nextId++, label: String(body.label || ""), path: String(body.path || ""), urutan: Number(body.urutan || store.menu.length + 1), aktif: body.aktif !== false };
        store.menu.push(item);
        result = envelope(item);
      } else if (path.length === 3) {
        const id = Number(path[2]);
        const item = store.menu.find((entry) => entry.id === id);
        if (method === "PUT" && item) {
          item.label = String(body.label ?? item.label);
          item.path = String(body.path ?? item.path);
          item.urutan = Number(body.urutan ?? item.urutan);
          item.aktif = body.aktif !== false;
          result = envelope(item);
        } else if (method === "DELETE") {
          store.menu = store.menu.filter((entry) => entry.id !== id);
          result = envelope({ deleted: true });
        }
      }
    }
  } else if (path[0] === "audit-log" && method === "GET") {
    const sheet = (url.searchParams.get("sheet") || "").toLowerCase();
    const source = (url.searchParams.get("source") || "").toUpperCase();
    const search = (url.searchParams.get("search") || "").toLowerCase();
    const logs = store.audit.filter((log) => {
      const searchable = JSON.stringify(log).toLowerCase();
      return (!sheet || String(log.sheet).toLowerCase().includes(sheet)) &&
        (!source || String(log.source).toUpperCase() === source) &&
        (!search || searchable.includes(search));
    });
    result = envelope({ logs });
  }

  if (result === undefined) {
    if (path[0] === "dashboard" && path[1] === "peringatan-stok") {
      result = envelope([
        { id: 1, namaBarang: "Sosis Ayam", stok: 8, satuan: "pcs", status: "Rendah" },
        { id: 2, namaBarang: "Dumpling Udang", stok: 5, satuan: "pcs", status: "Rendah" },
      ]);
    } else if (path[0] === "dashboard" && path[1] === "aktivitas-terbaru") {
      result = envelope(store.audit.slice(0, 8));
    } else if (path[0] === "orders") {
      result = envelope(store.transactions.slice(0, 20));
    } else if (path[0] === "users") {
      result = envelope([
        { id: 1, nama: "Bu Pemilik", email: "demo@soju.local", peran: "SUPER_ADMIN" },
        { id: 2, nama: "Admin Gudang", email: "gudang@soju.local", peran: "ADMIN" },
      ]);
    } else if (path[0] === "customer-orders") {
      result = envelope([]);
    } else if (path[0] === "reports") {
      if (path[1] === "neraca") {
        result = envelope({ aset: 12_850_000, kewajiban: 2_400_000, ekuitas: 10_450_000 });
      } else if (path[1] === "laba-rugi") {
        result = envelope({ pemasukan: 4_080_000, pengeluaran: 2_415_000, laba: 1_665_000 });
      } else if (path[1] === "perubahan-modal") {
        result = envelope({ modalAwal: 8_785_000, penambahanModal: 1_200_000, labaBersih: 1_665_000, modalAkhir: 11_650_000 });
      }
    } else if (path[0] === "auth" && path[1] === "change-password") {
      result = envelope({ message: "Password demo berhasil diperbarui" });
    } else {
      result = envelope([]);
    }
  }
  if (method !== "GET") saveStore(store);
  return result as T;
}
