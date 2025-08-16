import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import CallToAction from "../CallToAction/CallToAction";

const plans = [
  {
    id: 1,
    name: "Free",
    description: "Explore LoveKnot and connect with a few profiles.",
    price: "$0",
    duration: "/mo",
    features: [
      { text: "5 Premium Profiles view per month", available: false },
      { text: "View basic user profiles", available: true },
      { text: "Access limited contact details", available: false },
      { text: "Send interest", available: false },
      { text: "Start chat", available: false },
    ],
    highlight: false,
  },
  {
    id: 2,
    name: "Gold",
    description: "Unlock more connections and premium features.",
    price: "$349",
    duration: "/mo",
    features: [
      { text: "20 Premium Profiles view per month", available: true },
      { text: "View all user profiles", available: true },
      { text: "Access contact details", available: true },
      { text: "Send interest", available: true },
      { text: "Start chat", available: true },
    ],
    highlight: true,
  },
  {
    id: 3,
    name: "Platinum",
    description: "Get unlimited access and top priority support.",
    price: "$549",
    duration: "/mo",
    features: [
      { text: "Unlimited Premium Profiles view", available: true },
      { text: "View all user profiles", available: true },
      { text: "Access full contact details", available: true },
      { text: "Send unlimited interests", available: true },
      { text: "Start unlimited chats", available: true },
    ],
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section className="bg-gradient-to-r from-pink-800 to-pink-500 text-white py-16">
      <div className="text-center max-w-3xl mx-auto px-6">
        <p className="uppercase text-sm tracking-wide">Membership Plans</p>
        <h2 className="text-3xl md:text-4xl font-bold mt-2">
          Find Your Perfect Match <br /> Choose the Right Plan
        </h2>
        <p className="mt-3 text-gray-200">
          Join thousands of happy couples who found their soulmate on LoveKnot.
        </p>
        <span className="inline-block bg-red-600 text-xs px-3 py-1 mt-3 rounded-full font-semibold">
          No credit card required for Free Plan
        </span>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 px-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white text-gray-800 rounded-2xl shadow-lg p-6 flex flex-col justify-between ${
              plan.highlight ? "border-4 border-yellow-400" : ""
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-200 text-yellow-900 px-3 py-1 text-xs font-semibold rounded-full">
                Most Popular
              </span>
            )}

            <div>
              <h3 className="text-xl font-bold text-center text-gray-700">
                {plan.name}
              </h3>
              <p className="text-sm text-center text-gray-500 mt-1">
                {plan.description}
              </p>
              <button
                className={`mt-4 w-full py-2 rounded-md font-semibold ${
                  plan.highlight
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-pink-100 text-gray-800 hover:bg-pink-200"
                }`}
              >
                Get Started
              </button>

              <p className="text-center mt-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-gray-500">{plan.duration}</span>
              </p>
            </div>

            {/* Features */}
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  {feature.available ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircleIcon className="w-5 h-5 text-red-500" />
                  )}
                  <span
                    className={`${
                      feature.available ? "text-gray-700" : "text-gray-400"
                    }`}
                  >
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-pink-800 to-pink-500 text-white mt-12">
        <CallToAction />
      </div>
    </section>
  );
}
