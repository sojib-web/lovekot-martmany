// @ts-nocheck
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, useNavigate } from "react-router";
import loginBg from "../../assets/banner/login-bg.png";
import loginCouple from "../../assets/banner/login-couple.png";
import { AuthContext } from "../../context/AuthContext";
import useAxios from "../../hooks/useAxios";

const SignupSection = () => {
  const { createUser, googleLogin, updateUserProfile, setUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const axiosInstance = useAxios();

  const getFirebaseErrorMessage = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already registered. Please log in.";
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/weak-password":
        return "Password must be at least 6 characters.";
      case "auth/network-request-failed":
        return "Network error. Check your connection.";
      case "auth/popup-closed-by-user":
        return "Google Sign-in was closed before completing.";
      default:
        return "Something went wrong. Try again.";
    }
  };

  const onSubmit = async (data) => {
    setError("");
    console.log("🚀 Submitted Signup Data:", data);
    try {
      const res = await createUser(data.email, data.password);
      console.log("✅ Firebase User Created:", res.user);

      if (res.user) {
        await updateUserProfile(res.user, {
          displayName: data.name,
          photoURL: data.photoURL || null,
        });

        const userPayload = {
          email: data.email,
          name: data.name,
          role: "normal",
          photoURL: data.photoURL || "",
          createdAt: new Date().toISOString(),
        };

        console.log("📦 Sending user to MongoDB:", userPayload);

        // Insert user in your backend DB
        await axiosInstance.post("/users", userPayload);

        // Manually set user with role so your app has it immediately
        setUser({ ...res.user, role: "normal" });
      }

      reset();
      navigate("/");
    } catch (err) {
      console.error("❌ Signup Error:", err);
      setError(getFirebaseErrorMessage(err.code) || err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      const result = await googleLogin();
      const googleUser = result.user;
      console.log("✅ Google Login User:", googleUser);

      const userPayload = {
        email: googleUser.email,
        name: googleUser.displayName,
        role: "normal",
        photoURL: googleUser.photoURL || "",
        createdAt: new Date().toISOString(),
      };

      console.log("📦 Sending Google user to MongoDB:", userPayload);

      await axiosInstance.post("/users", userPayload);

      setUser({ ...googleUser, role: "normal" }); // Set user with role

      navigate("/");
    } catch (err) {
      console.error("❌ Google Sign-in Error:", err);
      setError(getFirebaseErrorMessage(err.code));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffdf6] px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Left Side */}
        <div className="bg-[#fff1b8] flex flex-col items-center justify-center text-center p-10">
          <h2 className="text-4xl text-gray-600 mb-2 font-light">Now</h2>
          <h1 className="text-4xl md:text-5xl font-bold text-[#522e1f] leading-tight mb-6">
            Find your <br /> life partner <br />
            <span className="text-xl font-normal">Easy and fast.</span>
          </h1>
          <img src={loginCouple} alt="Couple" className="w-48 mx-auto mb-4" />
          <img
            src={loginBg}
            alt="Pattern"
            className="w-full mt-4 hidden md:block"
          />
        </div>

        {/* Right Side */}
        <div className="p-10 md:p-16 flex flex-col justify-center">
          <p className="text-xs font-medium text-gray-500 uppercase">
            Start for free
          </p>
          <h2 className="text-3xl font-semibold text-[#333] mb-3">
            Sign up to{" "}
            <Link to="/" className="text-3xl font-bold text-rose-600">
              LoveKnot
            </Link>
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Already a member?{" "}
            <NavLink to="/login" className="text-blue-600 hover:underline">
              Login
            </NavLink>
          </p>

          {error && (
            <div className="mb-4 text-red-600 font-semibold text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Enter your full name"
                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                type="email"
                placeholder="Enter your email"
                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="photoURL"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Photo URL
              </label>
              <input
                id="photoURL"
                {...register("photoURL")}
                type="url"
                placeholder="Enter photo URL"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Must be at least 6 characters",
                  },
                })}
                type="password"
                placeholder="Enter password"
                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 rounded-lg transition duration-300 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <button
            onClick={handleGoogleSignIn}
            className={`w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition duration-300 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Please wait..." : "Google Sign-in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupSection;
