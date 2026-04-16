import { FaPlus } from "react-icons/fa";

export default function PageHeader() {
    return (
        <div id="pageheader-container" className="flex items-center justify-between p-4">
            <div id="pageheader-left" className="flex flex-col">
                <span id="page-title" className="text-3xl font-semibold">
                    Dashboard
                </span>
                
                <div id="breadcrumb-links" className="flex items-center mt-2 space-x-2 font-medium">
                    <span id="breadcrumb-home" className="text-gray-500">Dashboard</span>
                    <span id="breadcrumb-separator" className="text-gray-500">/</span>
                    <span id="breadcrumb-current" className="text-gray-500">Order List</span>
                </div>
            </div>

            <div id="action-button">
               <button id="add-button" className="flex items-center px-4 py-2 text-white transition rounded-lg bg-hijau hover:bg-green-600 hover:shadow-md">
                    <FaPlus className="mr-2" /> Add New Order
                </button>
            </div>
        </div>
    );
}