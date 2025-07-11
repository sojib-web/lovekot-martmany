// @ts-nocheck
/* eslint-disable no-unused-vars */
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
        { amount: 5 } // amount in dollars
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
        Swal.fire("Payment Failed", result.error.message, "error");
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        // Send contact request
        const res = await axiosSecure.post("/contact-requests", {
          userEmail,
          biodataId, // string
          transactionId: result.paymentIntent.id,
        });

        if (res.data.insertedId || res.data.acknowledged) {
          Swal.fire("Success!", "Contact request submitted.", "success");
        } else {
          Swal.fire("Error", "Could not submit request.", "error");
        }
      }
    } catch (err) {
      setError("Payment failed. Try again.");
      Swal.fire("Error", "Payment or request failed.", "error");
    }

    setProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-[#f9196f] p-8 rounded-3xl shadow-lg text-white"
    >
      <h2 className="text-3xl font-extrabold mb-6 text-center">
        Request Contact Info
      </h2>

      <label className="block mb-4">
        <span className="block mb-2 font-semibold">Biodata ID</span>
        <input
          readOnly
          value={biodataId}
          className="w-full rounded-lg px-4 py-3 bg-white text-[#f9196f] font-semibold"
        />
      </label>

      <label className="block mb-6">
        <span className="block mb-2 font-semibold">Your Email</span>
        <input
          readOnly
          value={userEmail}
          className="w-full rounded-lg px-4 py-3 bg-white text-[#f9196f] font-semibold"
        />
      </label>

      <label className="block mb-6">
        <span className="block mb-2 font-semibold">Card Details</span>
        <div className="p-4 bg-white rounded-lg">
          <CardElement />
        </div>
      </label>

      {error && <p className="text-yellow-300 mb-4 text-center">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full py-3 rounded-xl font-semibold bg-white text-[#f9196f]"
      >
        {processing ? "Processing..." : "Pay $5"}
      </button>
    </form>
  );
};

export default CheckoutForm;
