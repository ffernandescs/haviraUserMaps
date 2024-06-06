import React from "react";

interface ComponentButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant?: "outline" | "contained";
}

const ComponentButton: React.FC<ComponentButtonProps> = ({
  title,
  variant = "contained",
  ...props
}) => {
  let className = "";
  if (variant === "contained") {
    className += " font-bold py-2 px-4  text-white  bg-blue-500 hover:bg-blue-700 rounded-md";
  } else if (variant === "outline") {
    className +=
      "font-bold py-2 px-4 bg-white text-blue-500 border border-blue-500 hover:border-blue-700 hover:bg-gray-100 rounded-md";
  }

  return (
    <button className={className} {...props}>
      {title}
    </button>
  );
};

export default ComponentButton;
