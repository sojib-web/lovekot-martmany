import React from "react";
import Banner from "./Banner/Banner";
import TeamSection from "./TeamCard/TeamCard";
import TeamGrid from "./TeamCard/TeamCard";
import HowItWorks from "./HowItWorks/HowItWorks";
import SuccessCounter from "./SuccessCounter/SuccessCounter";
import CtaSection from "./CtaSection/CtaSection";
import SuccessStories from "./fetchSuccessStories/SuccessStories";

const Home = () => {
  return (
    <div>
      <Banner />
      {/* <CtaSection /> */}
      <TeamGrid />
      <HowItWorks />
      <SuccessCounter />
      <SuccessStories />
    </div>
  );
};

export default Home;
