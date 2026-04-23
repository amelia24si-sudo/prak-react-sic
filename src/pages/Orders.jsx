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
        <div id="dashboard-container" className="p-6">
            

            <div id="pageheader-container" className="flex items-center justify-between p-4">
                <div id="pageheader-left" className="flex flex-col">
                    <span id="page-title" className="text-3xl font-semibold">
                        Order Management
                    </span>

                    <div id="breadcrumb-links" className="flex items-center mt-2 space-x-2 font-medium">
                        <span id="breadcrumb-home" className="text-gray-500">Melacak dan mengelola pesanan masuk.</span>
                        
                    </div>
                </div>
            </div>

            {/* Statistik Ringkas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center p-4 space-x-5 bg-white rounded-lg shadow-md flex-wrap">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Total Orders</p>
                            <p className="text-2xl font-bold">{totalOrders}</p>
                        </div>
                        <FaShoppingCart className="text-blue-500 size-6" />
                    </div>
                </div>

                <div className="flex items-center p-4 space-x-5 bg-white rounded-lg shadow-md flex-wrap">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Completed</p>
                            <p className="text-2xl font-bold">{completedOrders}</p>
                        </div>
                        <FaTruck className="text-green-500 size-6" />
                    </div>
                </div>

                <div className="flex items-center p-4 space-x-5 bg-white rounded-lg shadow-md flex-wrap">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Pending</p>
                            <p className="text-2xl font-bold">{pendingOrders}</p>
                        </div>
                        <FaDollarSign className="text-yellow-500 size-6" />
                    </div>
                </div>

                <div className="flex items-center p-4 space-x-5 bg-white rounded-lg shadow-md flex-wrap">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Cancelled</p>
                            <p className="text-2xl font-bold">{cancelledOrders}</p>
                        </div>
                        <FaBan className="text-red-500 size-6" />
                    </div>
                </div>
            </div>

            {/* Tabel Orders */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Price</th>
                            <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordersData.map((order) => (
                            <tr key={order["Order ID"]} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="px-5 py-4 text-sm font-bold text-blue-600">
                                    #{order["Order ID"]}
                                </td>
                                <td className="px-5 py-4 text-sm text-gray-800">
                                    {order["Customer Name"]}
                                </td>
                                <td className="px-5 py-4 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <FaCalendarAlt className="mr-2 opacity-50" />
                                        {order["Order Date"]}
                                    </div>
                                </td>
                                <td className="px-5 py-4 text-sm font-semibold">
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
    );
}