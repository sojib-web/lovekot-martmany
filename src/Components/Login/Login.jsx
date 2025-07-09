// @ts-nocheck
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import loginBg from "../../assets/banner/login-bg.png";
import loginCouple from "../../assets/banner/login-couple.png";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // 🔹 Firebase error code → custom message
  const getFirebaseErrorMessage = (code) => {
    switch (code) {
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Try again.";
      case "auth/invalid-email":
        return "Invalid email format.";
      case "auth/popup-closed-by-user":
        return "Google sign-in popup was closed.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const onSubmit = async (data) => {
    setError("");
    try {
      const result = await login(data.email, data.password);
      console.log("Login Success:", result.user);
      navigate("/");
    } catch (err) {
      console.error("Login Error:", err.code);
      setError(getFirebaseErrorMessage(err.code));
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const result = await googleLogin();
      console.log("Google Login:", result.user);
      navigate("/");
    } catch (err) {
      console.error("Google Login Error:", err.code);
      setError(getFirebaseErrorMessage(err.code));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffdf6] px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Left Side */}
        <div className="bg-[#fff1b8] flex flex-col items-center justify-center p-10 text-center">
          <h2 className="text-4xl text-gray-600 mb-2 font-light">
            Welcome Back
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-[#522e1f] leading-tight mb-6">
            Find your <br /> life partner <br />
            <span className="text-xl font-normal">with LoveKnot</span>
          </h1>
          <img src={loginCouple} alt="Couple" className="w-48 mx-auto mb-4" />
          <img
            src={loginBg}
            alt="Pattern"
            className="w-full mt-4 hidden md:block"
          />
        </div>

        {/* Right Side (Form) */}
        <div className="p-10 md:p-16 flex flex-col justify-center">
          <p className="text-xs font-medium text-gray-500 uppercase">
            Start for Free
          </p>
          <h2 className="text-3xl font-semibold text-[#333] mb-3">
            Sign In to{" "}
            <Link to="/" className="text-3xl font-bold text-rose-600">
              LoveKnot
            </Link>
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Not a member?{" "}
            <NavLink to="/signup" className="text-blue-600 hover:underline">
              Sign up now
            </NavLink>
          </p>

          {error && (
            <p className="mb-4 text-red-600 font-semibold text-sm">{error}</p>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="hover:underline text-blue-500">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 rounded-lg transition duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Please wait..." : "Google Sign-in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
