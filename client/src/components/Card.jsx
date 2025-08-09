import React from "react";

const TestimonialCard = ({ content, name, role, img }) => {
  return (
    <div className="bg-white w-[86%] sm:w-[300px] rounded-xl shadow-md p-6">
      {/* Rating */}
      <div className="flex items-center text-purple-600 mb-4 gap-0.5">
        <img src="/star.png" className="h-[17px]" />
        <img src="/star.png" className="h-[17px]" />
        <img src="/star.png" className="h-[17px]" />
        <img src="/star.png" className="h-[17px]" />
        <img src="/star.png" className="h-[17px]" />
      </div>

      {/* Quote */}
      <p className="text-gray-700 text-sm mb-6">{content}</p>

      {/* Divider */}
      <hr className="mb-4" />

      {/* Author Info */}
      <div className="flex items-center gap-4">
        <img
          src={`coll/${img}.jpg`}
          alt="John Doe"
          className="w-12 h-12 rounded-full z-50"
        />
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
