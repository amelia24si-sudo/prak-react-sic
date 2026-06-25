import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useAuth } from "../../context/useAuth.jsx";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
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
        setError("");

        const { error } = await login(dataForm.email, dataForm.password);

        if (error) {
            setError(error.message || "Login gagal. Periksa kembali email dan kata sandi.");
            setLoading(false);
            return;
        }

        navigate("/");
        setLoading(false);
    };

    const isUnconfirmedError = error?.toLowerCase().includes("belum dikonfirmasi") || error?.toLowerCase().includes("email not confirmed");

    const errorInfo = error ? (
        <div className="flex flex-col p-5 mb-5 text-sm font-light text-gray-600 bg-red-200 rounded">
            <div className="flex items-center gap-2">
                <BsFillExclamationDiamondFill className="text-lg text-red-600" />
                <span>{error}</span>
            </div>
            {isUnconfirmedError && (
                <div className="mt-3 text-xs text-gray-700">
                    Pastikan Anda sudah mengklik tautan verifikasi dari email. Jika belum menerima email, cek folder spam atau tunggu beberapa menit.
                </div>
            )}
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
                        type="email"
                        id="email"
                        name="email"
                        value={dataForm.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 placeholder-gray-400"
                        placeholder="Email"
                        required
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
                        value={dataForm.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 placeholder-gray-400"
                        placeholder="********"
                        required
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