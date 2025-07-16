import { useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import { FaStar } from "react-icons/fa";

const GotMarriedForm = () => {
  const axiosSecure = useAxios();

  const [formData, setFormData] = useState({
    selfBiodataId: "",
    partnerBiodataId: "",
    coupleImage: "",
    successStory: "",
    marriedDate: "", // নতুন Date field
    rating: 0, // নতুন Star rating field (0-5)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Star ক্লিক হ্যান্ডলার
  const handleStarClick = (starValue) => {
    setFormData((prev) => ({ ...prev, rating: starValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.marriedDate) {
      Swal.fire("Error", "Please select your marriage date", "error");
      return;
    }
    if (formData.rating === 0) {
      Swal.fire("Error", "Please provide a star rating", "error");
      return;
    }
    try {
      const res = await axiosSecure.post("/api/success-stories", formData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Your story has been submitted!", "success");
        setFormData({
          selfBiodataId: "",
          partnerBiodataId: "",
          coupleImage: "",
          successStory: "",
          marriedDate: "",
          rating: 0,
        });
      }
    } catch (err) {
      console.error("Error submitting success story", err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10 bg-white shadow-xl rounded-2xl border border-rose-200">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-rose-600 drop-shadow-md">
        Got Married? 🎉 Share Your Story
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Your Biodata ID */}
        <div>
          <label className="block mb-2 font-semibold text-rose-700">
            Your Biodata ID
          </label>
          <input
            type="number"
            name="selfBiodataId"
            value={formData.selfBiodataId}
            onChange={handleChange}
            className="w-full border border-rose-300 rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Partner Biodata ID */}
        <div>
          <label className="block mb-2 font-semibold text-rose-700">
            Partner's Biodata ID
          </label>
          <input
            type="number"
            name="partnerBiodataId"
            value={formData.partnerBiodataId}
            onChange={handleChange}
            className="w-full border border-rose-300 rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Couple Image URL */}
        <div>
          <label className="block mb-2 font-semibold text-rose-700">
            Couple Image URL
          </label>
          <input
            type="url"
            name="coupleImage"
            value={formData.coupleImage}
            onChange={handleChange}
            className="w-full border border-rose-300 rounded-lg px-4 py-2"
            placeholder="Paste the image URL"
            required
          />
        </div>

        {/* Married Date */}
        <div>
          <label className="block mb-2 font-semibold text-rose-700">
            Married Date
          </label>
          <input
            type="date"
            name="marriedDate"
            value={formData.marriedDate}
            onChange={handleChange}
            className="w-full border border-rose-300 rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Star Rating */}
        <div>
          <label className="block mb-2 font-semibold text-rose-700">
            Rate Your Experience
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={28}
                className={`cursor-pointer transition-colors ${
                  star <= formData.rating ? "text-amber-400" : "text-gray-300"
                }`}
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>
        </div>

        {/* Success Story Textarea */}
        <div>
          <label className="block mb-2 font-semibold text-rose-700">
            Your Story
          </label>
          <textarea
            name="successStory"
            rows="5"
            value={formData.successStory}
            onChange={handleChange}
            className="w-full border border-rose-300 rounded-lg px-4 py-3 resize-y"
            placeholder="Share your feelings & experience using the website..."
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-rose-600 to-amber-500 text-white font-semibold py-3 rounded-xl shadow-lg transition-transform active:scale-95"
        >
          Submit Story
        </button>
      </form>
    </div>
  );
};

export default GotMarriedForm;
