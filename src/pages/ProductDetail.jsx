import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import { productsAPI } from "../services/supabaseService.js";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const { data, error } = await productsAPI.fetchProductById(id);
      if (error) {
        setError(error.message || "Gagal memuat detail produk.");
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    if (id) loadProduct();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = confirm("Yakin ingin menghapus produk ini?");
    if (!confirmed) return;

    const { error } = await productsAPI.deleteProduct(id);
    if (error) {
      setError(error.message || "Gagal menghapus produk.");
      return;
    }

    navigate("/products");
  };

  if (loading) {
    return (
      <Container className="p-6">
        <div className="p-6 text-center">Memuat detail produk...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="p-6">
        <div className="p-6 text-red-600 text-center">{error}</div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="p-6">
        <div className="p-6 text-center">Produk tidak ditemukan.</div>
      </Container>
    );
  }

  return (
    <Container className="p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl mx-auto">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">{product.name}</h2>
              <p className="text-gray-600">{product.description || "Tidak ada deskripsi."}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/products"
                className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Kembali
              </Link>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
              >
                Hapus Produk
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">Kategori</p>
              <p className="mt-2 text-lg font-semibold">{product.category || "-"}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">Harga</p>
              <p className="mt-2 text-lg font-semibold">Rp {product.price ?? "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
