"use client"
import React, { useState } from "react";
import "./home.css";
import CTA from "../CTA/page";
import CTA2 from "../CTA2/page";
import Languages from "../languages/page";
import FooterPage from "../footer/page";
import NavBar from "../navbar/page";
import { FaArrowUp, FaUpload } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import CompanyLogosSection from "../companies/CompanyLogosSection";
import ForYourTeam from "../team/page";
import Link from "next/link";


const Page = () => {
    const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="heropage">
    {/* <div className="overlay"></div> */}
    <NavBar/>
      <div className="hero-div">
        <h2>Talk to Your Code. Fix It Together.</h2>
        <h3>for Modern Teams</h3>
        <p>
        AI-powered bug detection and repository Q&A — built to help you write cleaner code, 
        understand projects faster, and keep your team in sync
        </p>

        {/* <div className="btns">
          <button className="chatBtn">Git Chat</button>
          <button>Bug finder</button>
        </div> */}
       <div className="inputDiv">
  <div className="inputtext">
    <div style={{ position: "relative", width: "100%" }}>
      <input
        className="homeinput"
        type="text"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (!e.target.value) setIsFocused(false);
        }}
      />

      {!isFocused && (
        <div className="placeholderAnim">
          <TypeAnimation
            sequence={[
              "What dependencies could break if I edit orderService.js?",
              2000,
              "Who last modified checkout.py",
              2000
            ]}
            speed={50}
            deletionSpeed={60}
            wrapper="span"
            repeat={Infinity}
          />
        </div>
      )}
    </div>

    <div className="sendBtn">
      <button>
       <Link href="/login">
                <FaArrowUp />
</Link>
      </button>
    </div>
  </div>
</div>

      </div>
      <CompanyLogosSection/>
      <CTA2/>
      <CTA/>
      <ForYourTeam/>
      <Languages/>
      <FooterPage/>
    </div>
  );
};

export default Page;
