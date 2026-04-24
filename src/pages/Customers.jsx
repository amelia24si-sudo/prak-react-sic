import { FaUserTag, FaEnvelope, FaPhone, FaCrown, FaUserCircle } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import customersData from "../assets/customers.json";

export default function Customers() {
    // Menghitung statistik sederhana
    const totalCustomers = customersData.length;
    const goldMembers = customersData.filter(c => c.Loyalty === "Gold").length;

    // Helper fungsi untuk warna Loyalty (disamakan logic getStatusStyle)
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
            <PageHeader title="Customer Directory" breadcrumb={`Mengelola ${totalCustomers} basis data pelanggan`} />

            {/* Statistik Ringkas (Style identik dengan Orders) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center p-4 space-x-5 bg-white rounded-lg shadow-md flex-wrap">
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Total Customers</p>
                            <p className="text-2xl font-bold">{totalCustomers}</p>
                        </div>
                        <div className="p-3 rounded-full bg-blue-600">
                            <FaUserTag className="size-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center p-4 space-x-5 bg-white rounded-lg shadow-md flex-wrap">
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Gold Members</p>
                            <p className="text-2xl font-bold">{goldMembers}</p>
                        </div>
                        <FaCrown className="text-yellow-500 size-6" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="overflow-x-auto overflow-y-auto max-h-[390px]">
                    <table className="min-w-full leading-normal">
                        <thead className="sticky top-0 z-10">
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">Customer ID</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">Full Name</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">Contact Info</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">Loyalty Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customersData.map((customer) => (
                                <tr key={customer["Customer ID"]} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="px-5 py-4 text-sm font-bold text-blue-600">
                                        #{customer["Customer ID"]}
                                    </td>
                                    <td className="px-5 py-4 text-sm text-gray-800">
                                        <div className="flex items-center font-semibold">
                                            <FaUserCircle className="mr-2 opacity-50 text-lg" />
                                            {customer["Customer Name"]}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-gray-600">
                                        <div className="flex flex-col space-y-1">
                                            <span className="flex items-center text-xs italic"><FaEnvelope className="mr-2 opacity-50" /> {customer.Email}</span>
                                            <span className="flex items-center text-xs"><FaPhone className="mr-2 opacity-50" /> {customer.Phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-sm">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getLoyaltyStyle(customer.Loyalty)}`}>
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
    );
}
