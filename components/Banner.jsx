"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const Banner = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Image
          src="/assets/images/idea.jpg"
          alt="Banner"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
      </div>
      <div
        className="relative z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,  
          transition: "transform 0.1s ease-out",
        }}
      >
        <div className="text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold">Ideas</h1>
          <p className="text-white text-sm md:text-lg">
            Where all our great things begin
          </p>
        </div>
      </div>

      {/* SLANTED EFFECT */}
      <div className="absolute z-20 w-full h-[300px] translate-y-[-150px] bg-white transform -skew-y-6"></div>
    </div>
  );
};

export default Banner;
