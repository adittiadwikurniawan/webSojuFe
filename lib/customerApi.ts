import { isDemoPreviewSession } from "./demo-preview";

const API_ROOT = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api/v1").replace(/\/api\/v1\/?$/, "");
const CUSTOMER_API = `${API_ROOT}/api/customer`;
const TOKEN_KEY = "customer_auth_token";

export type CustomerProfile = {
  id: number;
  nama: string;
  email: string;
  noTelepon: string;
  alamat: string;
  dibuatPada?: string;
  emailTerverifikasiPada?: string | null;
};
export type CustomerCartItem = { productId: number; nama?: string; varian: string; jumlah: number; catatan: string; harga?: number; satuan?: string; gambar?: string | null };

export const customerToken = {
  get: () => typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY),
  set: (token: string) => { if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, token); },
  clear: () => { if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY); },
};

async function request<T>(path: string, options: RequestInit = {}, requiresAuth = true): Promise<T> {
  if (isDemoPreviewSession()) {
    const method = (options.method || "GET").toUpperCase();
    const body = typeof options.body === "string" ? JSON.parse(options.body) : {};
    if (path === "/profil" || path === "/auth/daftar" || path === "/auth/masuk") {
      if (path === "/profil" && method === "PATCH") {
        const raw = localStorage.getItem("soju_customer_profile");
        const current = raw ? JSON.parse(raw) : { id: 1, nama: "Budi Santoso", email: "budi@demo.local", noTelepon: "0812-3456-7890", alamat: "Jl. Demo No. 10, Bandung" };
        const profile = { ...current, ...body };
        localStorage.setItem("soju_customer_profile", JSON.stringify(profile));
        return { success: true, data: profile } as T;
      }
      const raw = localStorage.getItem("soju_customer_profile");
      const profile = raw ? JSON.parse(raw) : { id: 1, nama: "Budi Santoso", email: "budi@demo.local", noTelepon: "0812-3456-7890", alamat: "Jl. Demo No. 10, Bandung" };
      localStorage.setItem("soju_customer_profile", JSON.stringify(profile));
      return { success: true, data: path === "/profil" ? profile : { token: "soju-customer-preview", customer: profile } } as T;
    }
    if (path === "/keranjang" && method === "PUT") {
      const localRaw = localStorage.getItem("soju_customer_cart");
      let localItems: any[] = [];
      try {
        localItems = JSON.parse(localRaw || "[]");
      } catch {
        localItems = [];
      }
      const payload = (body.items || []).map((item: any) => {
        const local = localItems.find((entry: any) => Number(entry.productId) === Number(item.productId) && entry.varian === item.varian);
        return { ...item, nama: local?.nama || "Menu SOJU", harga: local?.harga || 0, satuan: local?.satuan || "", gambar: local?.gambar || null };
      });
      localStorage.setItem("soju_customer_cart", JSON.stringify(payload));
      return { success: true, data: { jumlahItem: (body.items || []).length } } as T;
    }
    if (path === "/keranjang") {
      const cart = JSON.parse(localStorage.getItem("soju_customer_cart") || "[]");
      return { success: true, data: cart } as T;
    }
    if (path === "/checkout" && method === "POST") {
      const cart = JSON.parse(localStorage.getItem("soju_customer_cart") || "[]");
      const raw = localStorage.getItem("soju_customer_profile");
      const profile = raw ? JSON.parse(raw) : { id: 1, nama: "Budi Santoso", email: "budi@demo.local", noTelepon: "0812-3456-7890", alamat: "Jl. Demo No. 10, Bandung" };
      const orders = JSON.parse(localStorage.getItem("soju_customer_orders") || "[]");
      const order = { id: Date.now(), kode: `ORD-${String(Date.now()).slice(-6)}`, dibuatPada: new Date().toISOString(), status: "MENUNGGU_KONFIRMASI", alamat: body.alamat || profile.alamat, total: cart.reduce((sum: number, item: any) => sum + Number(item.harga || 0) * Number(item.jumlah || 0), 0), item: cart.map((item: any, index: number) => ({ id: index + 1, namaProduk: item.nama || "Produk SOJU", varian: item.varian || "", jumlah: item.jumlah, subtotal: Number(item.harga || 0) * Number(item.jumlah || 0) })) };
      localStorage.setItem("soju_customer_orders", JSON.stringify([order, ...orders]));
      localStorage.setItem("soju_customer_cart", "[]");
      return { success: true, data: order, message: "Pesanan demo berhasil dibuat" } as T;
    }
    if (path === "/auth/lupa-password" && method === "POST") {
      return { success: true, data: null, message: "Jika email terdaftar dan aktif, tautan reset password telah dikirim ke email Anda." } as T;
    }
    if (path === "/auth/reset-password" && method === "POST") {
      return { success: true, data: null, message: "Password berhasil diatur ulang. Silakan masuk dengan password baru Anda." } as T;
    }
    if (path === "/auth/verifikasi-email" && method === "POST") {
      const raw = localStorage.getItem("soju_customer_profile");
      const current = raw ? JSON.parse(raw) : { id: 1, nama: "Budi Santoso", email: "budi@demo.local", noTelepon: "0812-3456-7890", alamat: "Jl. Demo No. 10, Bandung" };
      const verified = { ...current, emailTerverifikasiPada: new Date().toISOString() };
      localStorage.setItem("soju_customer_profile", JSON.stringify(verified));
      return { success: true, data: verified, message: "Email berhasil diverifikasi." } as T;
    }
    if (path === "/auth/kirim-ulang-verifikasi" && method === "POST") {
      return { success: true, data: null, message: "Jika email terdaftar dan belum terverifikasi, tautan verifikasi baru telah dikirim ke email Anda." } as T;
    }
    if (path === "/ubah-password" && method === "POST") {
      return { success: true, data: null, message: "Password berhasil diperbarui." } as T;
    }
    if (path === "/pesanan") {
      const orders = JSON.parse(localStorage.getItem("soju_customer_orders") || "[]");
      return { success: true, data: orders } as T;
    }
    if (/^\/pesanan\/[^/]+$/.test(path)) {
      const id = Number(path.split("/").pop());
      const orders = JSON.parse(localStorage.getItem("soju_customer_orders") || "[]");
      return { success: true, data: orders.find((order: any) => Number(order.id) === id) || null } as T;
    }
  }
  const token = customerToken.get();
  const headers: Record<string, string> = { "Content-Type": "application/json", ...(options.headers as Record<string, string> | undefined) };
  if (requiresAuth && token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${CUSTOMER_API}${path}`, { ...options, headers });
  const body = await response.json().catch(() => ({ message: "Terjadi kesalahan" }));
  if (!response.ok) {
    if (response.status === 401 && requiresAuth) customerToken.clear();
    throw new Error(body.message || "Permintaan customer gagal");
  }
  return body as T;
}

export const customerApi = {
  isAuthenticated: () => isDemoPreviewSession() || Boolean(customerToken.get()),
  register: async (data: { nama: string; email: string; noTelepon: string; alamat: string; password: string }) => {
    const result = await request<{ success: boolean; data: { token: string; customer: CustomerProfile } }>("/auth/daftar", { method: "POST", body: JSON.stringify(data) }, false);
    customerToken.set(result.data.token);
    return result;
  },
  login: async (email: string, password: string) => {
    const result = await request<{ success: boolean; data: { token: string; customer: CustomerProfile } }>("/auth/masuk", { method: "POST", body: JSON.stringify({ email, password }) }, false);
    customerToken.set(result.data.token);
    return result;
  },
  logout: () => customerToken.clear(),
  forgotPassword: (email: string) =>
    request<{ success: boolean; data: null; message?: string }>(
      "/auth/lupa-password",
      { method: "POST", body: JSON.stringify({ email }) },
      false
    ),
  resetPassword: (token: string, passwordBaru: string) =>
    request<{ success: boolean; data: null; message?: string }>(
      "/auth/reset-password",
      { method: "POST", body: JSON.stringify({ token, passwordBaru }) },
      false
    ),
  verifyEmail: (token: string) =>
    request<{ success: boolean; data: CustomerProfile; message?: string }>(
      "/auth/verifikasi-email",
      { method: "POST", body: JSON.stringify({ token }) },
      false
    ),
  resendVerification: (email: string) =>
    request<{ success: boolean; data: null; message?: string }>(
      "/auth/kirim-ulang-verifikasi",
      { method: "POST", body: JSON.stringify({ email }) },
      false
    ),
  changePassword: (passwordLama: string, passwordBaru: string) =>
    request<{ success: boolean; data: null; message?: string }>(
      "/ubah-password",
      { method: "POST", body: JSON.stringify({ passwordLama, passwordBaru }) },
      true
    ),
  getProfile: () => request<{ success: boolean; data: CustomerProfile }>("/profil"),
  updateProfile: (data: Partial<Pick<CustomerProfile, "nama" | "email" | "noTelepon" | "alamat">>) =>
    request<{ success: boolean; data: CustomerProfile }>("/profil", { method: "PATCH", body: JSON.stringify(data) }),
  getCart: () => request<{ success: boolean; data: CustomerCartItem[] }>("/keranjang"),
  updateCart: (items: Array<Pick<CustomerCartItem, "productId" | "varian" | "jumlah" | "catatan">>) =>
    request<{ success: boolean; data: { jumlahItem: number } }>("/keranjang", { method: "PUT", body: JSON.stringify({ items }) }),
  checkout: (alamat?: string) => request<{ success: boolean; data: any; message: string }>("/checkout", { method: "POST", body: JSON.stringify({ alamat }) }),
  getOrders: () => request<{ success: boolean; data: any[] }>("/pesanan"),
  getOrder: (id: number) => request<{ success: boolean; data: any }>(`/pesanan/${id}`),
};
