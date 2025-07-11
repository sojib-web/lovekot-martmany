// @ts-nocheck
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

// Reusable Input Field Component
const InputField = ({
  register,
  name,
  placeholder,
  type = "text",
  readOnly = false,
  extraClass = "",
}) => (
  <input
    {...register(name)}
    placeholder={placeholder}
    type={type}
    readOnly={readOnly}
    className={`border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition 
      ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""} ${extraClass}`}
  />
);

// Reusable Select Field Component
const SelectField = ({
  register,
  name,
  options,
  disabledOptionText,
  defaultValue = "",
  extraClass = "",
}) => (
  <select
    {...register(name)}
    defaultValue={defaultValue}
    className={`border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition ${extraClass}`}
  >
    <option value="" disabled>
      {disabledOptionText}
    </option>
    {options.map(({ value, label }) => (
      <option key={value || label} value={value || label}>
        {label}
      </option>
    ))}
  </select>
);

// Option data arrays
const biodataTypes = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const heights = [
  { value: "4'6-4'11", label: "4'6\" - 4'11\"" },
  { value: "5'0-5'3", label: "5'0\" - 5'3\"" },
  { value: "5'4-5'7", label: "5'4\" - 5'7\"" },
  { value: "5'8-5'11", label: "5'8\" - 5'11\"" },
  { value: "6'0-6'4", label: "6'0\" - 6'4\"" },
  { value: "6'5+", label: "6'5\" and above" },
];

const weights = [
  { value: "45-49", label: "45kg - 49kg" },
  { value: "50-54", label: "50kg - 54kg" },
  { value: "55-59", label: "55kg - 59kg" },
  { value: "60-64", label: "60kg - 64kg" },
  { value: "65-69", label: "65kg - 69kg" },
  { value: "70-74", label: "70kg - 74kg" },
  { value: "75-79", label: "75kg - 79kg" },
  { value: "80+", label: "80kg and above" },
];

const occupations = [
  { label: "-- Select Occupation --", value: "" },
  { value: "Student", label: "Student" },
  { value: "Engineer", label: "Engineer" },
  { value: "Doctor", label: "Doctor" },
  { value: "Teacher", label: "Teacher" },
  { value: "Business", label: "Business" },
  { value: "Government Job", label: "Government Job" },
  { value: "Private Job", label: "Private Job" },
  { value: "Freelancer", label: "Freelancer" },
  { value: "Unemployed", label: "Unemployed" },
  { value: "Other", label: "Other" },
];

const races = [
  { value: "Fair", label: "Fair Complexion" },
  { value: "Light", label: "Light Complexion" },
  { value: "Medium", label: "Medium Complexion" },
  { value: "Olive", label: "Olive Complexion" },
  { value: "Brown", label: "Brown Complexion" },
  { value: "Dark", label: "Dark Complexion" },
  { value: "Other", label: "Other / Prefer not to say" },
];

const divisions = [
  "Dhaka",
  "Chattagram",
  "Rangpur",
  "Barisal",
  "Khulna",
  "Mymensingh",
  "Sylhet",
].map((div) => ({ value: div, label: div }));

const expectedHeights = [
  { value: "4'10", label: "4'10\" - Petite" },
  { value: "5'0", label: "5'0\" - Compact" },
  { value: "5'2", label: "5'2\" - Average" },
  { value: "5'4", label: "5'4\" - Moderate" },
  { value: "5'6", label: "5'6\" - Medium" },
  { value: "5'7", label: "5'7\" - Tall" },
  { value: "5'9", label: "5'9\" - Above Average" },
  { value: "5'11", label: "5'11\" - Tall" },
  { value: "6'0", label: "6'0\" - Very Tall" },
  { value: "6'2", label: "6'2\" - Extra Tall" },
  { value: "6'4", label: "6'4\" - Very Tall" },
];

const expectedWeights = [
  { value: "45-49", label: "45kg - 49kg" },
  { value: "50-54", label: "50kg - 54kg" },
  { value: "55-59", label: "55kg - 59kg" },
  { value: "60-64", label: "60kg - 64kg" },
  { value: "65-69", label: "65kg - 69kg" },
  { value: "70-74", label: "70kg - 74kg" },
  { value: "75-79", label: "75kg - 79kg" },
  { value: "80+", label: "80kg and above" },
];

const EditBiodataPage = () => {
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxios();
  const { user } = useContext(AuthContext);

  const onSubmit = async (data) => {
    data.contactEmail = user?.email;

    try {
      const res = await axiosSecure.post("/profile", data);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Biodata saved & published!", "success");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Something went wrong!", "error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-extrabold mb-8 text-pink-600 border-b-4 border-pink-400 pb-2">
        Edit / Publish Biodata
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        <SelectField
          register={register}
          name="biodataType"
          options={biodataTypes}
          disabledOptionText="Select Type"
        />

        <InputField register={register} name="name" placeholder="Name" />

        <InputField
          register={register}
          name="profileImage"
          placeholder="Image URL"
          type="url"
        />

        <InputField register={register} name="dateOfBirth" type="date" />

        <SelectField
          register={register}
          name="height"
          options={heights}
          disabledOptionText="Choose Height Range"
        />

        <SelectField
          register={register}
          name="weight"
          options={weights}
          disabledOptionText="What’s your weight range?"
        />

        <InputField
          register={register}
          name="age"
          type="number"
          placeholder="Age"
        />

        <SelectField
          register={register}
          name="occupation"
          options={occupations}
          disabledOptionText="Select Occupation"
        />

        <SelectField
          register={register}
          name="race"
          options={races}
          disabledOptionText="Choose Your Skin Tone"
        />

        <InputField
          register={register}
          name="fatherName"
          placeholder="Father's Name"
        />

        <InputField
          register={register}
          name="motherName"
          placeholder="Mother's Name"
        />

        <SelectField
          register={register}
          name="permanentDivision"
          options={divisions}
          disabledOptionText="Permanent Division"
        />

        <SelectField
          register={register}
          name="presentDivision"
          options={divisions}
          disabledOptionText="Present Division"
        />

        <InputField
          register={register}
          name="expectedPartnerAge"
          type="number"
          placeholder="Expected Partner Age"
        />

        <SelectField
          register={register}
          name="expectedPartnerHeight"
          options={expectedHeights}
          disabledOptionText="Select Expected Height"
        />

        <SelectField
          register={register}
          name="expectedPartnerWeight"
          options={expectedWeights}
          disabledOptionText="Expected Weight"
        />

        <InputField
          register={register}
          name="mobileNumber"
          placeholder="Mobile Number"
          type="tel"
        />

        {/* Contact Email (readonly) */}
        <InputField
          register={register}
          name="contactEmail"
          type="email"
          readOnly={true}
          placeholder={user?.email || "Your Email"}
        />

        {/* Social Links - Full width */}
        <InputField
          register={register}
          name="social.facebook"
          placeholder="Facebook URL"
          extraClass="col-span-1 sm:col-span-3 focus:ring-blue-600"
          type="url"
        />
        <InputField
          register={register}
          name="social.twitter"
          placeholder="Twitter URL"
          extraClass="col-span-1 sm:col-span-3 focus:ring-sky-400"
          type="url"
        />
        <InputField
          register={register}
          name="social.linkedin"
          placeholder="LinkedIn URL"
          extraClass="col-span-1 sm:col-span-3 focus:ring-blue-700"
          type="url"
        />
        <InputField
          register={register}
          name="social.instagram"
          placeholder="Instagram URL"
          extraClass="col-span-1 sm:col-span-3 focus:ring-pink-500"
          type="url"
        />

        {/* Submit Button */}
        <div className="md:col-span-3 text-center mt-6">
          <button
            type="submit"
            className="bg-pink-600 text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-pink-700 transition"
          >
            Save & Publish Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBiodataPage;
