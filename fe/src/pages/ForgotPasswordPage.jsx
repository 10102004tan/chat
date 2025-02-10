import { Mail } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const { forgotPassword } = useAuthStore();
    const handleSubmit = async(e) => {
        e.preventDefault();
        forgotPassword({ email }).then(() => {
            setEmail("");
            setIsSuccess(true);
        });
    };
    
    return (
        <div className="flex flex-col justify-center h-[100vh] items-center p-6 sm:p-12">
            {
                isSuccess ? (
                    <div className="flex flex-col items-center">
                        <Mail size={64} className="text-blue-500"/>
                        <h1 className="text-2xl font-bold text-white my-4">Password reset link sent to email</h1>
                        <Link to="/login" className="text-blue-500">Back to login</Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 w-[400px]">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Email</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-base-content/40" />
                            </div>
                            <input
                                type="email"
                                className={`input input-bordered w-full pl-10`}
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
    
                    <button type="submit" className="btn btn-primary w-full">
                        Reset Password
                    </button>
                </form>
                )
            }
        </div>
    );
};

export default ForgotPasswordPage;