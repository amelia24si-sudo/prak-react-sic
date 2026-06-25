import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Container from "../components/Container";
import { productsAPI } from "../services/supabaseService.js";

export default function ProductsAdmin() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [form, setForm] = useState({ name: "", description: "", price: "", stock: "" });

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            const { data, error } = await productsAPI.fetchProducts();
            if (error) {
                setError(error.message || "Gagal memuat produk.");
            } else {
                setProducts(data || []);
            }
            setLoading(false);
        };
        loadProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const payload = {
            name: form.name,
            description: form.description,
            price: Number(form.price),
            stock: Number(form.stock),
        };

        const { data, error } = await productsAPI.createProduct(payload);
        if (error) {
            setError(error.message || "Gagal menambahkan produk.");
        } else {
            setProducts([data, ...products]);
            setForm({ name: "", description: "", price: "", stock: "" });
        }

        setLoading(false);
    };

    return (
        <Container id="products-admin-container">
            <PageHeader title="Product Management" breadcrumb1="Products" breadcrumb2="CRUD Product" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-1 bg-white rounded-2xl shadow p-6">
                    <h3 className="text-xl font-semibold mb-4">Tambah Produk Baru</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                            <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full rounded-xl border border-gray-200 p-3" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                            <textarea name="description" value={form.description} onChange={handleChange} className="w-full rounded-xl border border-gray-200 p-3" rows="4" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Harga</label>
                                <input type="number" name="price" value={form.price} onChange={handleChange} className="w-full rounded-xl border border-gray-200 p-3" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
                                <input type="number" name="stock" value={form.stock} onChange={handleChange} className="w-full rounded-xl border border-gray-200 p-3" required />
                            </div>
                        </div>
                        <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white rounded-xl py-3 hover:bg-emerald-700 disabled:opacity-50">
                            {loading ? 'Menyimpan...' : 'Tambah Produk'}
                        </button>
                    </form>
                    {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
                </div>

                <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6 overflow-x-auto">
                    <h3 className="text-xl font-semibold mb-4">Daftar Produk</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {products.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Rp {Number(item.price).toLocaleString('id-ID')}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.stock}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Container>
    );
}
