import React, { useEffect, useRef } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Common/Navbar";
import {
  FaCloudSun,
  FaCamera,
  FaSeedling,
  FaUpload,
  FaHistory,
  FaLeaf,
} from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DashboardHome = () => {
  const { user } = useUser();
  const cardRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    // GSAP animations for each card
    cardRefs.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 70%",
          },
        }
      );
    });
  }, []);

  const sections = [
    { title: "Upload Image", icon: <FaUpload />, path: "/upload-image" },
    { title: "Current Weather", icon: <FaCloudSun />, path: "/weather" },
    { title: "Plant Growth", icon: <FaSeedling />, path: "/mqttdashboard" },
  ];

  const handleSectionClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-blue-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-700">
            Welcome, {user?.firstName}!
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mt-2">
            {user?.emailAddresses[0]?.emailAddress}
          </p>
          <div className="mt-4 flex justify-center space-x-8">
            <div className="text-green-600 font-semibold">
              <p>Crop Name: Tomato</p>
              <p>Plant Cycle: 90 Days</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              onClick={() => handleSectionClick(section.path)} // Handle click event
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <div className="text-5xl text-green-700 mb-4">{section.icon}</div>
              <h2 className="text-xl font-semibold text-gray-800">
                {section.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
