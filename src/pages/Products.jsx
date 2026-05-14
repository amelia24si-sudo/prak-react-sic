import { useState } from "react"; // Tambahkan useState
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import productsData from "../assets/products.json";

export default function Products() {
    // 1. State untuk menyimpan kata kunci pencarian
    const [searchTerm, setSearchTerm] = useState("");

    // 2. Logika untuk memfilter data berdasarkan nama produk
    const filteredProducts = productsData.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <PageHeader title="Products" breadcrumb1="Dashboard" breadcrumb2="Product List" />

            {/* Input Search - Sesuai style gambar */}
            <div className="mt-1 mb-4">
                <input
                    type="text"
                    placeholder="Cari produk..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="overflow-x-auto overflow-y-auto max-h-[435px]">
                    <table className="min-w-full leading-normal text-left">
                        <thead className="sticky top-0 z-10">
                            {/* Warna hijau sesuai gambar (#10b981 / emerald-500) */}
                            <tr className="bg-emerald-600 text-white">
                                <th className="px-6 py-4 text-sm font-semibold uppercase">#</th>
                                <th className="px-6 py-4 text-sm font-semibold uppercase">Name</th>
                                <th className="px-6 py-4 text-sm font-semibold uppercase text-left">Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 3. Render dari hasil filter, bukan dari data mentah */}
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((item, index) => (
                                    <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {index + 1}.
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link to={`/products/${item.id}`} className="text-emerald-500 font-medium hover:underline">
                                                {item.title}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 text-left">
                                            {item.category}
                                        </td>
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
        </div>
    );
}