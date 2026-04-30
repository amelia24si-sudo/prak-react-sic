import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaCalendarAlt } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import ordersData from "../assets/orders.json";

export default function Orders() {
    // Menghitung statistik berdasarkan data JSON
    const totalOrders = ordersData.length;
    const completedOrders = ordersData.filter(o => o.Status === "Completed").length;
    const pendingOrders = ordersData.filter(o => o.Status === "Pending").length;
    const cancelledOrders = ordersData.filter(o => o.Status === "Cancelled").length;

    // Helper fungsi untuk warna status
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-blue-100 text-blue-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div id="dashboard-container">
            <PageHeader title="Order Management" breadcrumb1={`Mengelola ${ordersData.length} pesanan`} breadcrumb2="Add New Order" />

            {/* Statistik Ringkas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center p-4 space-x-5 bg-white rounded-lg shadow-md flex-wrap">
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Total Orders</p>
                            <p className="text-2xl font-bold">{totalOrders}</p>
                        </div>
                        <div className="p-3 rounded-full bg-blue-600">
                            <FaShoppingCart className="size-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center p-4 space-x-5 bg-white rounded-lg shadow-md flex-wrap">
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Completed</p>
                            <p className="text-2xl font-bold">{completedOrders}</p>
                        </div>
                        <div className="p-3 rounded-full bg-green-600">
                            <FaTruck className="size-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center p-4 space-x-5 bg-white rounded-lg shadow-md flex-wrap">
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Pending</p>
                            <p className="text-2xl font-bold">{pendingOrders}</p>
                        </div>
                        <div className="p-3 rounded-full bg-yellow-500">
                            <FaDollarSign className="size-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center p-4 space-x-5 bg-white rounded-lg shadow-md flex-wrap">
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Cancelled</p>
                            <p className="text-2xl font-bold">{cancelledOrders}</p>
                        </div>
                        <div className="p-3 rounded-full bg-red-600">
                            <FaBan className="size-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabel Orders dengan Scroll Independen */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="overflow-x-auto overflow-y-auto max-h-[390px]">
                    <table className="min-w-full leading-normal">
                        <thead className="sticky top-0 z-10"> 
                            <tr className="bg-gray-50 border-b border-gray-200">
                                {/* bg-gray-50 wajib ada agar row yang di-scroll tidak 'tembus' pandang ke belakang header */}
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">Order ID</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">Customer</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">Date</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">Total Price</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersData.map((order) => (
                                <tr key={order["Order ID"]} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="px-5 py-4 text-sm font-bold text-blue-600">#{order["Order ID"]}</td>
                                    <td className="px-5 py-4 text-sm text-gray-800 font-medium">{order["Customer Name"]}</td>
                                    <td className="px-5 py-4 text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <FaCalendarAlt className="mr-2 opacity-50" />
                                            {order["Order Date"]}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                                        Rp {order["Total Price"].toLocaleString('id-ID')}
                                    </td>
                                    <td className="px-5 py-4 text-sm">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(order.Status)}`}>
                                            {order.Status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}