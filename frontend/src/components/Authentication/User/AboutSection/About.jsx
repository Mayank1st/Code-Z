import React from "react";
import Heading from "./AboutHeading";
import Hero from "./Hero";
import BrandStats from "./BrandStats";
import Accordion from "./AboutAccordion";

function About() {
  return (
    <>
      {/* Heading */}
      <div>
        <Heading />
      </div>
      <div>
        <Hero />
      </div>
      <div>
        <BrandStats />
      </div>
      <div>
        <Accordion />
      </div>
    </>
  );
}

export default About;
