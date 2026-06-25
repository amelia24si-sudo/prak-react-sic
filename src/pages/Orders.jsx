import { useEffect, useState } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaCalendarAlt } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import { ordersAPI } from "../services/supabaseService.js";
import Container from "../components/Container";
import Card from "../components/Card";
import Table from "../components/Table";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadOrders = async () => {
            setLoading(true);
            const { data, error } = await ordersAPI.fetchOrders();
            if (error) {
                setError(error.message || "Gagal memuat pesanan.");
                setOrders([]);
            } else {
                setError("");
                setOrders(data || []);
            }
            setLoading(false);
        };

        loadOrders();
    }, []);

    const [form, setForm] = useState({ status: 'Pending', total_amount: '' });

    const getOrderStatus = (order) => {
        return order.status || order.Status || 'Unknown';
    };

    const totalOrders = orders.length;
    const completedOrders = orders.filter((o) => getOrderStatus(o) === 'Completed').length;
    const pendingOrders = orders.filter((o) => getOrderStatus(o) === 'Pending').length;
    const cancelledOrders = orders.filter((o) => getOrderStatus(o) === 'Cancelled').length;

    const normalizeOrderValue = (order, key) => {
        if (key === 'id') return order.id ?? order['Order ID'] ?? '-';
        if (key === 'created_at') return order.created_at ?? order['Created At'] ?? '-';
        if (key === 'total_amount') return order.total_amount ?? order['Total Amount'] ?? 0;
        if (key === 'status') return getOrderStatus(order);
        return '';
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreateOrder = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        const { data, error } = await ordersAPI.createOrder({
            status: form.status,
            total_amount: Number(form.total_amount) || 0,
        });
        if (error) {
            setError(error.message || 'Gagal menambahkan pesanan.');
            setLoading(false);
            return;
        }

        setOrders([data, ...orders]);
        setForm({ status: 'Pending', total_amount: '' });
        setLoading(false);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-blue-100 text-blue-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    const headers = ["Order ID", "Created At", "Total Amount", "Status"]

    return (
        <Container id="orders-container">
            <PageHeader title="Order Management" breadcrumb1={`Mengelola ${totalOrders} pesanan`} breadcrumb2="Add New Order" />

            {/* Statistik Ringkas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="flex items-center p-4 space-x-5 bg-white rounded-lg shadow-md flex-wrap">
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Total Orders</p>
                            <p className="text-2xl font-bold">{totalOrders}</p>
                        </div>
                        <div className="p-3 rounded-full bg-blue-600">
                            <FaShoppingCart className="size-6 text-white" />
                        </div>
                    </div>
                </Card>

                <Card className="flex items-center p-4 space-x-5 bg-white rounded-lg shadow-md flex-wrap">
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Completed</p>
                            <p className="text-2xl font-bold">{completedOrders}</p>
                        </div>
                        <div className="p-3 rounded-full bg-green-600">
                            <FaTruck className="size-6 text-white" />
                        </div>
                    </div>
                </Card>

                <Card className="flex items-center p-4 space-x-5 bg-white rounded-lg shadow-md flex-wrap">
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Pending</p>
                            <p className="text-2xl font-bold">{pendingOrders}</p>
                        </div>
                        <div className="p-3 rounded-full bg-yellow-500">
                            <FaDollarSign className="size-6 text-white" />
                        </div>
                    </div>
                </Card>

                <Card className="flex items-center p-4 space-x-5 bg-white rounded-lg shadow-md flex-wrap">
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Cancelled</p>
                            <p className="text-2xl font-bold">{cancelledOrders}</p>
                        </div>
                        <div className="p-3 rounded-full bg-red-600">
                            <FaBan className="size-6 text-white" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Tabel Orders dengan Scroll Independen */}
            <div className="overflow-x-auto bg-white rounded-lg shadow mb-6">
                <div className="overflow-x-auto overflow-y-auto max-h-[390px]">
                    <Table headers={headers}>
                        {orders.map((order) => (
                            <tr key={normalizeOrderValue(order, 'id')} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="px-5 py-4 text-sm font-bold text-blue-600">#{normalizeOrderValue(order, 'id')}</td>
                                <td className="px-5 py-4 text-sm text-gray-800 font-medium">{normalizeOrderValue(order, 'created_at')}</td>
                                <td className="px-5 py-4 text-sm font-semibold text-gray-900">Rp {Number(normalizeOrderValue(order, 'total_amount') ?? 0).toLocaleString('id-ID')}</td>
                                <td className="px-5 py-4 text-sm">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(normalizeOrderValue(order, 'status'))}`}>
                                        {normalizeOrderValue(order, 'status')}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </Table>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-4">Tambah Pesanan Baru</h3>
                {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
                <form onSubmit={handleCreateOrder} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                        <input
                            type="number"
                            name="total_amount"
                            value={form.total_amount}
                            onChange={handleFormChange}
                            className="w-full rounded-xl border border-gray-200 p-3"
                            min="0"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status Pesanan</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleFormChange}
                            className="w-full rounded-xl border border-gray-200 p-3"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-emerald-600 text-white rounded-xl py-3 hover:bg-emerald-700"
                    >
                        Tambah Pesanan
                    </button>
                </form>
            </div>
        </Container>
    );
}