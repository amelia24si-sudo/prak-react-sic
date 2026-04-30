import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import ordersData from "../assets/orders.json";
import customersData from "../assets/customers.json";

export default function Dashboard() {
    // --- LOGIC STATISTIK ---
    const totalOrders = ordersData.length;
    const completedOrders = ordersData.filter(o => o.Status === "Completed").length;
    const cancelledOrders = ordersData.filter(o => o.Status === "Cancelled").length;
    const totalRevenue = ordersData.reduce((acc, order) => acc + (order["Total Price"] || 0), 0);
    const totalCustomers = customersData.length;

    // Helper Styling
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-blue-100 text-blue-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getLoyaltyStyle = (loyalty) => {
        switch (loyalty) {
            case 'Gold': return 'bg-yellow-100 text-yellow-800';
            case 'Silver': return 'bg-gray-100 text-gray-800';
            case 'Bronze': return 'bg-orange-100 text-orange-800';
            default: return 'bg-blue-100 text-blue-800';
        }
    };

    return (
        <div id="dashboard-container">
            <PageHeader title="Dashboard Overview" breadcrumb1="Dashboard/Summary" breadcrumb2="Add New Order" />

            {/* --- KARTU STATISTIK --- */}
            <div id="dashboard-grid" className="grid gap-4 mb-8 sm:grid-cols-2 md:grid-cols-4">
                <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
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

                <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Delivered</p>
                            <p className="text-2xl font-bold">{completedOrders}</p>
                        </div>
                        <div className="p-3 rounded-full bg-green-600">
                            <FaTruck className="size-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
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

                <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Total Revenue</p>
                            <p className="text-xl font-bold">Rp {totalRevenue.toLocaleString('id-ID')}</p>
                        </div>
                        <div className="p-3 rounded-full bg-yellow-500">
                            <FaDollarSign className="size-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- BAGIAN TABEL DATA --- */}
            <div className="grid grid-cols-0 lg:grid-cols-2 gap-8">
                
                {/* Tabel Ringkasan Pesanan */}
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <div className="p-2 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-bold text-gray-700">Recent Orders</h3>
                    </div>
                    <div className="overflow-y-auto max-h-[370px]">
                        <table className="min-w-full leading-normal text-left">
                            <thead className="sticky top-0 bg-white z-10 shadow-sm">
                                <tr>
                                    <th className="px-5 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                                    <th className="px-5 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                                    <th className="px-5 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersData.map((order) => (
                                    <tr key={order["Order ID"]} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-4 text-sm font-bold text-blue-600">{order["Order ID"]}</td>
                                        <td className="px-5 py-4 text-sm text-gray-800 font-medium">{order["Customer Name"]}</td>
                                        <td className="px-5 py-4 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${getStatusStyle(order.Status)}`}>
                                                {order.Status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tabel Ringkasan Pelanggan */}
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <div className="p-2 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-bold text-gray-700">Customer Directory</h3>
                    </div>
                    <div className="overflow-y-auto max-h-[370px]">
                        <table className="min-w-full leading-normal text-left">
                            <thead className="sticky top-0 bg-white z-10 shadow-sm">
                                <tr>
                                    <th className="px-5 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                                    <th className="px-5 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Loyalty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customersData.map((customer) => (
                                    <tr key={customer["Customer ID"]} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-4 text-sm">
                                            <div className="flex items-center">
                                                <FaUserCircle className="mr-2 text-gray-400 text-lg" />
                                                <span className="font-semibold text-gray-800">{customer["Customer Name"]}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${getLoyaltyStyle(customer.Loyalty)}`}>
                                                {customer.Loyalty}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}