// 1. TAMBAHKAN SEMUA IMPORT INI
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(false);

        axios
            .post("https://dummyjson.com/user/login", {
                username: dataForm.email, // API DummyJSON menggunakan key 'username'
                password: dataForm.password,
            })
            .then((response) => {
                if (response.status !== 200) {
                    setError(response.data.message);
                    return;
                }
                navigate("/");
            })
            .catch((err) => {
                if (err.response) {
                    setError(err.response.data.message || "An error occurred");
                } else {
                    setError(err.message || "An unknown error occurred");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const errorInfo = error ? (
        <div className="flex items-center p-5 mb-5 text-sm font-light text-gray-600 bg-red-200 rounded">
            <BsFillExclamationDiamondFill className="text-lg text-red-600 me-2" />
            {error}
        </div>
    ) : null;

    const loadingInfo = loading ? (
        <div className="flex items-center p-5 mb-5 text-sm bg-gray-200 rounded">
            <ImSpinner2 className="animate-spin me-2" />
            Mohon Tunggu...
        </div>
    ) : null;

    return (
        <div>
            <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">
                Welcome Back 👋
            </h2>

            {errorInfo}
            {loadingInfo}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        Username / Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 placeholder-gray-400"
                        placeholder="Email"
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 placeholder-gray-400"
                        placeholder="********"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 font-semibold text-white transition duration-300 bg-hijau rounded-lg ">
                    Login
                </button>
            </form>
        </div>
    );
}