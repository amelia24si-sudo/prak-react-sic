import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import ordersData from "../assets/orders.json";

export default function Dashboard() {
    return (
        <div id="dashboard-container">
            <PageHeader />

            <div id="dashboard-grid" className="grid gap-4 p-5 sm:grid-cols-2 md:grid-cols-4">

                {/* Orders Card */}
                <div id="dashboard-orders" className="flex items-center p-4 space-x-5 bg-white rounded-lg shadow-md flex-wrap">
                    <div id="orders-icon" className="p-4 rounded-full bg-hijau">
                        <FaShoppingCart className="size-7 text-white" />
                    </div>
                    <div id="orders-info" className="flex flex-col">
                        <span id="orders-count" className="text-2xl font-bold flex-wrap">75</span>
                        <span id="orders-text" className="text-gray-400 flex-wrap">Total Orders</span>
                    </div>
                </div>

                {/* Delivered Card */}
                <div id="dashboard-delivered" className="flex items-center p-4 space-x-5 bg-white rounded-lg shadow-md flex-wrap">
                    <div id="delivered-icon" className="p-4 rounded-full bg-biru">
                        <FaTruck className="size-7 text-white" />
                    </div>
                    <div id="delivered-info" className="flex flex-col">
                        <span id="delivered-count" className="text-2xl font-bold flex-wrap">175</span>
                        <span id="delivered-text" className="text-gray-400 flex-wrap">Total Delivered</span>
                    </div>
                </div>

                {/* Canceled Card */}
                <div id="dashboard-canceled" className="flex items-center p-4 space-x-5 bg-white rounded-lg shadow-md flex-wrap">
                    <div id="canceled-icon" className="p-4 rounded-full bg-merah">
                        <FaBan className="size-7 text-white" />
                    </div>
                    <div id="canceled-info" className="flex flex-col">
                        <span id="canceled-count" className="text-2xl font-bold flex-wrap">40</span>
                        <span id="canceled-text" className="text-gray-400 flex-wrap">Total Canceled</span>
                    </div>
                </div>

                {/* Revenue Card */}
                <div id="dashboard-revenue" className="flex items-center p-4 space-x-5 bg-white rounded-lg shadow-md flex-wrap">
                    <div id="revenue-icon" className="p-4 rounded-full bg-kuning">
                        <FaDollarSign className="size-7 text-white" />
                    </div>
                    <div id="revenue-info" className="flex flex-col">
                        <span id="revenue-amount" className="text-2xl font-bold flex-wrap">Rp.128</span>
                        <span id="revenue-text" className="text-gray-400">Total Revenue</span>
                    </div>
                </div>

            </div>
        </div>
    );
}