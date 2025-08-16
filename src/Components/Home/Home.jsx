import React from "react";
import Banner from "./Banner/Banner";
import TeamSection from "./TeamCard/TeamCard";
import TeamGrid from "./TeamCard/TeamCard";
import HowItWorks from "./HowItWorks/HowItWorks";
import SuccessCounter from "./SuccessCounter/SuccessCounter";
import CtaSection from "./CtaSection/CtaSection";
import SuccessStories from "./fetchSuccessStories/SuccessStories";
import BlogSection from "./BlogSection/BlogSection";
import PricingSection from "./PricingSection/PricingSection";
import CallToAction from "./CallToAction/CallToAction";

const Home = () => {
  return (
    <div>
      <Banner />
      {/* <CtaSection /> */}
      <TeamGrid />
      <HowItWorks />
      <SuccessCounter />
      <SuccessStories />
      <BlogSection />
      {/* <CallToAction /> */}
      <PricingSection />
    </div>
  );
};

export default Home;
