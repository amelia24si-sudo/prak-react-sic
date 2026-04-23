import { FaShoppingCart } from "react-icons/fa";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineNearbyError } from "react-icons/md";

export default function Sidebar() {
    // Fungsi untuk mengatur styling NavLink secara dinamis
    const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-4 space-x-2
        ${isActive ? 
            "text-hijau bg-green-200 flex cursor-pointer items-center rounded-xl p-4 font-medium " : 
            "text-gray-600 hover:bg-green-200 hover:text-green-600 hover:font-bold"
        }`;

    return (
        <div id="sidebar" className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg">
            {/* Logo */}
            <div id="sidebar-logo" className="flex flex-col">
                <span id="logo-title" className="font-poppins text-[48px] text-gray-900">
                    Sedap <b id="logo-dot" className="text-hijau">.</b>
                </span>
                <span id="logo-subtitle" className="font-semibold text-gray-400">
                    Modern Admin Dashboard
                </span>
            </div>

            {/* List Menu */}
            <div id="sidebar-menu" className="mt-10">
                <ul id="menu-list" className="space-y-3">
                    <li>
                        <NavLink
                            id="menu-1"
                            to="/"
                            className={menuClass}>
                            <MdDashboard className="mr-4 text-xl" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            id="menu-2"
                            to="/orders"
                            className={menuClass}>
                            <FaShoppingCart className="mr-4 text-xl" />
                            <span>Orders</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            id="menu-3"
                            to="/customers"
                            className={menuClass}>
                            <IoPeopleCircleOutline className="mr-4 text-xl" />
                            <span>Customers</span>
                        </NavLink>
                    </li>

                     <li>
                        <NavLink
                            id="menu-4"
                            to="/400"
                            className={menuClass}>
                            <MdOutlineNearbyError className="mr-4 text-xl" />
                            <span>400</span>
                        </NavLink>
                    </li>

                     <li>
                        <NavLink
                            id="menu-5"
                            to="/401"
                            className={menuClass}>
                            <MdOutlineNearbyError className="mr-4 text-xl" />
                            <span>401</span>
                        </NavLink>
                    </li>

                     <li>
                        <NavLink
                            id="menu-6"
                            to="/403"
                            className={menuClass}>
                            <MdOutlineNearbyError className="mr-4 text-xl" />
                            <span>403</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Footer */}
            <div id="sidebar-footer" className="mt-auto">
                <div id="footer-card" className="mb-10 flex items-center rounded-md bg-hijau px-4 py-3 shadow-lg">
                    <div id="footer-text" className="text-sm text-white">
                        <span>Please organize your menus through button below!</span>
                        <button id="add-menu-button" className="mt-3 flex w-full cursor-pointer items-center justify-center space-x-2 rounded-md bg-white p-2 transition hover:bg-gray-100">
                            <span className="flex items-center text-gray-600 font-semibold">Add Menus</span>
                        </button>
                    </div>
                    <img
                        id="footer-avatar"
                        src="./public/img/4b142319-c89d-46b6-9597-2e341f93f11a.jpg"
                        alt="Admin Avatar"
                        className="ml-3 w-16 rounded-full"
                    />
                </div>
                <span id="footer-brand" className="font-bold text-gray-400 block">Sedap Restaurant Admin Dashboard</span>
                <p id="footer-copyright" className="font-light text-gray-400 text-sm mt-1">&copy; 2026 All Right Reserved</p>
            </div>
        </div>
    );
}