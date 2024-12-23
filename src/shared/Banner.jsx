import { Link } from "react-router-dom";
import room1 from "../assets/roomSliderSm.jpg";
import room2 from "../assets/roomSlider2Sm.jpg";
import { motion } from "motion/react";
import { easeOut } from "motion";
const Banner = () => {
  return (
    <div>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <div className="relative w-full">
            <img src={room1} className="w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/40"></div>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <motion.h1
              animate={{ scale: 1.2 }}
              transition={{
                duration: 2,
                delay: 1,
                ease: easeOut,
                repeat: Infinity,
              }}
              className="lg:text-4xl text-xl font-bold text-white"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{
                  color: ["#001514", "#FBFFFE", "#A3320B"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Welcome
              </motion.span>{" "}
              to insta stay
            </motion.h1>
            <p className="text-white text-xs md:text-sm mb-4">
              Find and book your perfect stay with ease and convenience.
            </p>
            <Link to={"/rooms"} className="btn btn-neutral">
              Book a room Now!
            </Link>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src={room2} className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <motion.h1
              animate={{ scale: 1.2 }}
              transition={{
                duration: 2,
                delay: 1,
                ease: easeOut,
                repeat: Infinity,
              }}
              className="lg:text-4xl text-xl font-bold text-white"
            >
              <motion.span
                animate={{ color: ["#001514", "#33ffe3", "#ff6133"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Explore
              </motion.span>{" "}
              insta stay
            </motion.h1>
            <p className="text-white text-xs md:text-sm mb-4">
              Find and book your perfect stay with ease and convenience.
            </p>
            <Link to={"/rooms"} className="btn btn-neutral">
              Book a room Now!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
