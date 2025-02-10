import { Eye, EyeOff, Home, Lock } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
        token: "",
        email: "",
    });

    // get token and email from query params
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const email = urlParams.get("email");

    const { resetPassword, isResetPassword } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        resetPassword({
            password: formData.password,
            token,
            email,
        });
    };

    if (!token || !email) {
        return (
            <div className="flex flex-col justify-center h-[100vh] items-center p-6 sm:p-12">
                <h1 className="text-2xl font-bold mb-4">Invalid Token</h1>
                <Link to="/forgot-password" className="btn btn-primary">
                    Go to Forgot Password
                </Link>
            </div>
        );
    }

    if (!isResetPassword) {
        return <div className="flex flex-col justify-center h-[100vh] items-center p-6 sm:p-12">
            <div className="flex flex-col items-center">
                <Home size={64} className="text-blue-500" />
                <h1 className="text-2xl font-bold text-white my-4">Reset password success</h1>
                <Link to="/login" className="text-blue-500">Back to login</Link>
            </div>
        </div>
    }

    return (
        <div className="flex flex-col justify-center h-[100vh] items-center p-6 sm:p-12">
            <form onSubmit={handleSubmit} className="space-y-6 w-[400px]">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">New Password</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-base-content/40" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            className={`input input-bordered w-full pl-10`}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5 text-base-content/40" />
                            ) : (
                                <Eye className="h-5 w-5 text-base-content/40" />
                            )}
                        </button>
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Confirm Password</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-base-content/40" />
                        </div>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className={`input input-bordered w-full pl-10`}
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="h-5 w-5 text-base-content/40" />
                            ) : (
                                <Eye className="h-5 w-5 text-base-content/40" />
                            )}
                        </button>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-full">
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordPage;