import React from "react";

interface HeadingProps {
  title: string;
  description?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-xl md:text-2xl text-slate-800 dark:text-slate-300 font-semibold tracking-tight">{title}</h2>
      {description && (
        <p className="text-sm md:text-base md:leading-7 text-slate-400 ">{description}</p>
      )}
    </div>
  );
};

export default Heading;
