"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

const variantStyles = {
  primary: ["bg-blue-500", "text-white", "hover:bg-blue-600"], // Primary button styles
  secondary: ["bg-gray-200", "text-gray-800", "hover:bg-gray-300"], // Secondary button styles
};

interface ButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
  variant?: keyof typeof variantStyles; // You can define other variants if needed
  disabled?: boolean;
}

export default function Button({
  text,
  onClick = () => {},
  href = "",
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    variantStyles[variant].forEach((val) => {
      button.current?.classList.add(val);
    });
  }, []);

  // Combine base styles with the variant-specific styles
  if (href.length > 0)
    return (
      <Link href={href}>
        <a>{text}</a>
      </Link>
    );
  return (
    <button
      ref={button}
      onClick={onClick}
      className="px-4 py-2 rounded cursor-pointer"
      disabled={disabled}
    >
      {text}
    </button>
  );
}
