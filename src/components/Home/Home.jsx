import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../Common/Navbar";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const cloudsRef = useRef([]);
  const imagesRef = useRef([]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    cloudsRef.current.forEach((cloud, index) => {
      gsap.fromTo(
        cloud,
        { x: -200 },
        {
          x: 200,
          duration: 10 + index * 2,
          ease: "linear",
          repeat: -1,
          yoyo: true,
        }
      );
    });

    gsap.fromTo(
      imagesRef.current[0],
      { x: 300, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imagesRef.current[0],
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      imagesRef.current[1],
      { x: -300, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imagesRef.current[1],
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      imagesRef.current[2],
      { y: 300, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imagesRef.current[2],
          start: "top 80%",
        },
      }
    );

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-blue-100 relative">
      <Navbar />

      <div className="relative overflow-hidden h-screen flex flex-col items-center justify-center p-4 sm:p-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-800 mb-4 sm:mb-8 text-center">
          Welcome to Agrauto!
        </h1>
        <p className="text-lg sm:text-2xl text-gray-700 mb-6 sm:mb-12 px-2 sm:px-6 text-center">
          Revolutionizing agriculture with innovation and technology.
        </p>

        <div className="relative w-full h-full flex justify-center items-center">
          <img
            ref={(el) => (imagesRef.current[0] = el)}
            src="https://www.transparentpng.com/thumb/tree/texture-hackberry-tree-png-1.png"
            alt="texture hackberry tree"
            className="absolute right-0 h-full w-auto object-cover"
          />

          <img
            ref={(el) => (imagesRef.current[1] = el)}
            src="https://www.transparentpng.com/thumb/tree/tree-textures-png-15.png"
            alt="tree images"
            className="absolute left-0 h-full w-auto object-cover"
          />

          <img
            ref={(el) => (imagesRef.current[2] = el)}
            src="https://www.transparentpng.com/thumb/tree/tree-cutouts-architecture-png-31.png"
            alt="leafless tree"
            className="absolute bottom-0 h-full w-auto object-cover"
          />
        </div>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              ref={(el) => (cloudsRef.current[i] = el)}
              className={`absolute w-32 sm:w-48 opacity-70 ${
                i % 2 === 0 ? "top-10" : "top-20"
              }`}
              style={{ left: `${i * 30}%` }}
            >
              <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="40" fill="#fff" />
                <circle cx="100" cy="50" r="50" fill="#fff" />
                <circle cx="150" cy="50" r="40" fill="#fff" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
