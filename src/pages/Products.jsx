import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Container from "../components/Container";
import { productsAPI } from "../services/supabaseService.js";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const { data, error } = await productsAPI.fetchProducts();
      if (error) {
        setError(error.message || "Gagal memuat produk.");
        setProducts([]);
      } else {
        setError("");
        setProducts(data || []);
      }
      setLoading(false);
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container id="products-container">
      <PageHeader title="Products" breadcrumb1="Dashboard" breadcrumb2="Tambah Produk" to="/products-admin" />

      <div className="mt-1 mb-4">
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[435px]">
          <table className="min-w-full leading-normal text-left">
            <thead className="sticky top-0 z-10">
              <tr className="bg-emerald-600 text-white">
                <th className="px-6 py-4 text-sm font-semibold uppercase">#</th>
                <th className="px-6 py-4 text-sm font-semibold uppercase">Name</th>
                <th className="px-6 py-4 text-sm font-semibold uppercase text-left">Category</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="px-6 py-10 text-center text-gray-500">
                    Memuat produk...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="3" className="px-6 py-10 text-center text-red-600">
                    {error}
                  </td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600">{index + 1}.</td>
                    <td className="px-6 py-4">
                      <Link to={`/products/${item.id}`} className="text-emerald-500 font-medium hover:underline">
                        {item.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 text-left">{item.description || item.category || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-10 text-center text-gray-500">
                    Produk tidak ditemukan...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}
