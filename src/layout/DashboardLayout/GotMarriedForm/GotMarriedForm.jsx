// src/layout/DashboardLayout/GotMarriedForm/GotMarriedForm.jsx
import { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { FaStar } from "react-icons/fa";

// Shadcn UI Components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Sonner Toast
import { toast, Toaster } from "sonner";

const GotMarriedForm = () => {
  const axiosSecure = useAxios();

  const [formData, setFormData] = useState({
    selfBiodataId: "",
    partnerBiodataId: "",
    coupleImage: "",
    successStory: "",
    marriedDate: "",
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStarClick = (starValue) => {
    setFormData((prev) => ({ ...prev, rating: starValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.marriedDate) {
      toast.error("Please select your marriage date");
      return;
    }

    if (formData.rating === 0) {
      toast.error("Please provide a star rating");
      return;
    }

    try {
      const res = await axiosSecure.post("/api/success-stories", formData);
      if (res.data.insertedId) {
        toast.success("Your story has been submitted!");
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
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-amber-50 py-12 px-4">
      {/* Sonner Toaster */}
      <Toaster position="top-right" richColors />

      <Card className="w-full max-w-xl shadow-2xl rounded-3xl border border-rose-200 bg-white/70 backdrop-blur-md transition-all hover:shadow-rose-300">
        <CardHeader className="text-center space-y-3 py-6">
          <CardTitle className="text-3xl font-extrabold text-rose-600">
            Got Married? 🎉 Share Your Story
          </CardTitle>
          <Separator className="w-24 mx-auto bg-gradient-to-r from-rose-500 to-amber-400 h-[3px] rounded-full" />
        </CardHeader>

        <CardContent className="px-6 py-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Your Biodata ID */}
            <div>
              <Label htmlFor="selfBiodataId">Your Biodata ID</Label>
              <Input
                type="number"
                id="selfBiodataId"
                name="selfBiodataId"
                value={formData.selfBiodataId}
                onChange={handleChange}
                placeholder="Enter your biodata ID"
                required
              />
            </div>

            {/* Partner Biodata ID */}
            <div>
              <Label htmlFor="partnerBiodataId">Partner's Biodata ID</Label>
              <Input
                type="number"
                id="partnerBiodataId"
                name="partnerBiodataId"
                value={formData.partnerBiodataId}
                onChange={handleChange}
                placeholder="Enter partner's biodata ID"
                required
              />
            </div>

            {/* Couple Image */}
            <div>
              <Label htmlFor="coupleImage">Couple Image URL</Label>
              <Input
                type="url"
                id="coupleImage"
                name="coupleImage"
                value={formData.coupleImage}
                onChange={handleChange}
                placeholder="Paste the image URL"
                required
              />
            </div>

            {/* Married Date */}
            <div>
              <Label htmlFor="marriedDate">Married Date</Label>
              <Input
                type="date"
                id="marriedDate"
                name="marriedDate"
                value={formData.marriedDate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Star Rating */}
            <div>
              <Label>Rate Your Experience</Label>
              <div className="flex space-x-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={28}
                    className={`cursor-pointer transition-transform hover:scale-125 ${
                      star <= formData.rating
                        ? "text-amber-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleStarClick(star)}
                  />
                ))}
              </div>
            </div>

            {/* Success Story */}
            <div>
              <Label htmlFor="successStory">Your Story</Label>
              <Textarea
                id="successStory"
                name="successStory"
                rows={5}
                value={formData.successStory}
                onChange={handleChange}
                placeholder="Share your feelings & experience using the website..."
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-600 to-amber-500 text-white font-semibold py-3 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Submit Story
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GotMarriedForm;
