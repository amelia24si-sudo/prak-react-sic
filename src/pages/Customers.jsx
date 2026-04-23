import { FaUserTag, FaEnvelope, FaPhone, FaCrown } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import customersData from "../assets/customers.json"; // Memanggil data customer

export default function Customers() {
    // Menghitung ringkasan sederhana (Contoh: Jumlah Gold member)
    const goldMembers = customersData.filter(c => c.Loyalty === "Gold").length;

    return (
        <div id="dashboard-container" className="p-6">
            

            <div id="pageheader-container" className="flex items-center justify-between p-4">
                <div id="pageheader-left" className="flex flex-col">
                    <span id="page-title" className="text-3xl font-semibold">
                        Customer Directory
                    </span>

                    <div id="breadcrumb-links" className="flex items-center mt-2 space-x-2 font-medium">
                        <span id="breadcrumb-home" className="text-gray-500">Mengelola {customersData.length} basis data pelanggan</span>
                        
                    </div>
                </div>
            </div>

            {/* Statistik Singkat */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center p-4 space-x-5 bg-white rounded-lg shadow-md flex-wrap">
                    <FaUserTag className="text-blue-600 mr-3 size-6" />
                    <div>
                        <p className="text-sm text-gray-500">Total Customers</p>
                        <p className="text-xl font-bold">{customersData.length}</p>
                    </div>
                </div>
                <div className="flex items-center p-4 space-x-5 bg-white rounded-lg shadow-md flex-wrap">
                    <FaCrown className="text-yellow-600 mr-3 size-6" />
                    <div>
                        <p className="text-sm text-gray-500">Gold Members</p>
                        <p className="text-xl font-bold">{goldMembers}</p>
                    </div>
                </div>
            </div>

            {/* Tabel Data Customer */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loyalty</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {customersData.map((customer) => (
                            <tr key={customer["Customer ID"]} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {customer["Customer ID"]}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                                    {customer["Customer Name"]}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    <div className="flex flex-col">
                                        <span className="flex items-center"><FaEnvelope className="mr-1 text-xs" /> {customer.Email}</span>
                                        <span className="flex items-center"><FaPhone className="mr-1 text-xs" /> {customer.Phone}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${customer.Loyalty === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                                            customer.Loyalty === 'Silver' ? 'bg-gray-200 text-gray-800' :
                                                'bg-orange-100 text-orange-800'}`}>
                                        {customer.Loyalty}
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