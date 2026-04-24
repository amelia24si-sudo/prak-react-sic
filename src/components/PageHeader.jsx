import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function PageHeader(props) {
    return (
        <div id="pageheader-container" className="flex items-center justify-between p-4">
            <div id="pageheader-left" className="flex flex-col">
                <span id="page-title" className="text-3xl font-semibold">
                    {props.title}
                </span>
                
                <div id="breadcrumb-links" className="flex items-center mt-2 space-x-2 font-medium">
                    <span id="breadcrumb-home" className="text-gray-500">{props.breadcrumb}</span>
                </div>
            </div>

            <div id="action-button">
                <Link 
                    to="/400" 
                    id="add-button" 
                    className="flex items-center px-4 py-2 text-white transition rounded-lg bg-hijau hover:bg-green-600 hover:shadow-md inline-block"
                >
                    <FaPlus className="mr-2 inline" /> Add New Order
                </Link>
            </div>
        </div>
    );
}