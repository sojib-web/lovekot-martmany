// @ts-nocheck
/* eslint-disable no-unused-vars */
// components/CheckoutForm.jsx
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";

const CheckoutForm = ({ biodataId, userEmail }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxios();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError("");

    try {
      const { data: clientSecretData } = await axiosSecure.post(
        "/create-payment-intent",
        { amount: 5 * 100 }
      );

      const clientSecret = clientSecretData.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: result.error.message,
        });
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        await axiosSecure.post("/contact-requests", {
          biodataId,
          userEmail,
          transactionId: result.paymentIntent.id,
          status: "pending",
        });

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Contact request submitted successfully ✅",
          confirmButtonColor: "#d81e5b",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      setError("Payment or request failed. Try again.");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Payment or request failed. Please try again later.",
      });
    }

    setProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-[#f9196f] p-8 rounded-3xl shadow-lg text-white"
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <h2 className="text-3xl font-extrabold mb-6 text-center tracking-wide drop-shadow-md">
        Request Contact Info
      </h2>

      <label className="block mb-4">
        <span className="block mb-2 font-semibold">Biodata ID</span>
        <input
          readOnly
          value={biodataId}
          className="w-full rounded-lg px-4 py-3 bg-white text-[#f9196f] font-semibold border border-white focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="Biodata ID"
        />
      </label>

      <label className="block mb-6">
        <span className="block mb-2 font-semibold">Your Email</span>
        <input
          readOnly
          value={userEmail}
          className="w-full rounded-lg px-4 py-3 bg-white text-[#f9196f] font-semibold border border-white focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="Your Email"
        />
      </label>

      <label className="block mb-6">
        <span className="block mb-2 font-semibold">Card Details</span>
        <div className="p-4 bg-white rounded-lg border border-white focus-within:ring-2 focus-within:ring-white">
          <CardElement
            options={{
              style: {
                base: {
                  color: "#f9196f",
                  fontSize: "16px",
                  "::placeholder": {
                    color: "#d73768",
                  },
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                },
                invalid: {
                  color: "#f87171",
                },
              },
            }}
          />
        </div>
      </label>

      {error && (
        <p className="text-yellow-300 mb-4 text-center font-medium drop-shadow-md">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full py-3 rounded-xl font-semibold tracking-wide transition duration-300 ${
          processing
            ? "bg-white bg-opacity-50 cursor-not-allowed text-[#f9196f]"
            : "bg-white hover:bg-opacity-90 text-[#f9196f] cursor-pointer"
        }`}
      >
        {processing ? "Processing..." : "Pay $5"}
      </button>
    </form>
  );
};

export default CheckoutForm;
