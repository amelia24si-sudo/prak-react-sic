import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useAuth } from "../../context/useAuth.jsx";

export default function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [dataForm, setDataForm] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        if (dataForm.password !== dataForm.confirmPassword) {
            setError("Kata sandi dan konfirmasi tidak cocok.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        const { data, error } = await register(dataForm.email, dataForm.password, dataForm.fullname);

        if (error) {
            setError(error.message || "Pendaftaran gagal. Coba lagi.");
            setLoading(false);
            return;
        }

        if (data?.user?.email) {
            setSuccess("Pendaftaran berhasil. Silakan cek email untuk verifikasi sebelum login.");
        } else {
            setSuccess("Pendaftaran berhasil. Silakan cek email untuk verifikasi.");
        }

        setLoading(false);
        setDataForm({ fullname: "", email: "", password: "", confirmPassword: "" });
        setTimeout(() => navigate("/login"), 2000);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Create Your Account ✨
            </h2>

            {error && (
                <div className="flex items-center p-5 mb-5 text-sm font-light text-gray-600 bg-red-200 rounded">
                    <BsFillExclamationDiamondFill className="text-lg text-red-600 me-2" />
                    {error}
                </div>
            )}

            {success && (
                <div className="flex items-center p-5 mb-5 text-sm font-light text-gray-600 bg-green-200 rounded">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={dataForm.fullname}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="John Doe"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={dataForm.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="you@example.com"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={dataForm.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="********"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={dataForm.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="********"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Mendaftar..." : "Register"}
                </button>
            </form>
        </div>
    )
}
