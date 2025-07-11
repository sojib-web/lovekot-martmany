import { useParams } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import CheckoutForm from "./CheckoutForm";
// import { useAuth } from "../../hooks/useAuth";
// import CheckoutForm from "../../components/Checkout/CheckoutForm";

const CheckoutPage = () => {
  const { biodataId } = useParams();
  const { user } = useAuth();

  return (
    <div className="max-w-xl mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Contact Info Checkout
      </h2>
      <CheckoutForm biodataId={biodataId} userEmail={user?.email} />
    </div>
  );
};

export default CheckoutPage;
