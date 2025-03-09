import React from "react";

interface CardProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, children }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md bg-white p-8 h-full">
      {title && <h3 className="text-xl font-bold text-gray-900">{title}</h3>}
      {description && <p className="text-lg text-gray-600 mt-1">{description}</p>}
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default Card;
