import React from "react";

interface HeadingProps {
  title: string;
  description?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {description && (
        <p className="leading-7 text-slate-400">{description}</p>
      )}
    </div>
  );
};

export default Heading;
