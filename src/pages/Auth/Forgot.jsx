import { useState } from "react";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useAuth } from "../../context/useAuth.jsx";

export default function Forgot() {
    const { resetPassword } = useAuth();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setMessage("");

        const { error } = await resetPassword(email);

        if (error) {
            setError(error.message || "Gagal mengirim tautan reset password.");
            setLoading(false);
            return;
        }

        setMessage("Tautan reset password telah dikirim ke email Anda.");
        setEmail("");
        setLoading(false);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2 text-center">
                Forgot Your Password?
            </h2>
            
            <p className="text-sm text-gray-500 mb-6 text-center">
                Enter your email address and we'll send you a link to reset your
                password.
            </p>

            {error && (
                <div className="flex items-center p-5 mb-5 text-sm font-light text-gray-600 bg-red-200 rounded">
                    <BsFillExclamationDiamondFill className="text-lg text-red-600 me-2" />
                    {error}
                </div>
            )}

            {message && (
                <div className="p-5 mb-5 text-sm text-green-800 bg-green-100 rounded">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(evt) => setEmail(evt.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="you@example.com"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <span className="flex items-center justify-center"><ImSpinner2 className="animate-spin mr-2" />Sending...</span> : "Send Reset Link"}
                </button>
            </form>
        </div>
    )
}
