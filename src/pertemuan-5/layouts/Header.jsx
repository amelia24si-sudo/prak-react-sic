import { useState } from "react";
import { FaBell, FaSearch, FaHistory } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";
import ordersData from "../assets/orders.json";

export default function Header({ 
    userName = "Fikri Muhaffizh", 
    avatarUrl = "./public/img/41b7ab17-cd00-48c6-b47a-d2ea31c6871d.jpg",
    notificationCount = 50 
})   
{
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // State untuk input pencarian

    const filteredOrders = ordersData.filter(order => 
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div id="header-container" className="flex items-center justify-between p-4">
            {/* Search Bar */}
            <div id="search-bar" className="relative w-full max-w-lg">
                <input
                    id="search-input"
                    type="text"
                    className="w-full p-2 pr-10 transition bg-white border border-gray-100 rounded-md outline-none focus:border-blue-300"
                    placeholder="Search Here..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update state saat mengetik
                    onFocus={() => setIsSearchActive(true)}
                    onBlur={() => setTimeout(() => setIsSearchActive(false), 200)}
                />
                <FaSearch id="search-icon" className="absolute text-gray-300 transform -translate-y-1/2 right-4 top-1/2" />
                {isSearchActive && (
                    <div className="absolute left-0 w-full p-4 mt-2 bg-white border border-gray-100 rounded-md shadow-xl top-full">
                        <span className="text-xs font-bold text-gray-400 uppercase">
                            {searchQuery ? "Search Results" : "Recent Searches"}
                        </span>
                        <ul className="mt-2 space-y-2">
                            {/* Jika ada hasil pencarian */}
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map(order => (
                                    <li key={order.id} className="flex items-center text-sm text-gray-600 cursor-pointer hover:text-blue-500">
                                        <FaSearch className="mr-2 text-gray-400" /> 
                                        <b>{order.id}</b>{order.customer}
                                    </li>
                                ))
                            ) : (
                                /* Jika data tidak ditemukan */
                                <li className="text-sm text-gray-500">No results found for "{searchQuery}"</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>

            {/* Icon & Profile Section */}
            <div id="icons-container" className="flex items-center space-x-4">
                
                {/* Icons */}
                <div id="notification-icon" className="relative p-3 text-blue-500 transition bg-blue-100 cursor-pointer rounded-2xl hover:bg-blue-200"> 
                    <FaBell />
                    {notificationCount > 0 && (
                        <span id="notification-badge" className="absolute top-0 right-0 px-2 py-1 text-xs font-bold transform translate-x-1/2 -translate-y-1/2 bg-blue-300 rounded-full">
                            {notificationCount > 99 ? '99+' : notificationCount}
                        </span>
                    )}
                </div>
                
                <div id="chart-icon" className="p-3 transition bg-blue-100 cursor-pointer rounded-2xl hover:bg-blue-200">
                    <FcAreaChart />
                </div>
                
                <div id="settings-icon" className="p-3 text-red-500 transition bg-red-100 cursor-pointer rounded-2xl hover:bg-red-200">
                    <SlSettings />
                </div>

                {/* Profile Section */}
                <div id="profile-container" className="flex items-center pl-4 space-x-4 border-l border-gray-300">
                    <span id="profile-text" className="text-gray-700">
                        Hello, <b>{userName}</b>
                    </span>
                    <img
                        id="profile-avatar"
                        src={avatarUrl}
                        alt={`Avatar of ${userName}`}
                        className="w-10 h-10 border border-gray-200 rounded-full"
                    />
                </div>
            </div>
        </div>
    );
}