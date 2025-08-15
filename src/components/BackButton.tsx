import React from "react";
import { useGoBack } from "../utils/goBackRoute";

interface BackButtonProps {
  label?: string;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ label = "Back", className }) => {
  const goBack = useGoBack();

  const handleClick = () => {
    goBack(); 
  };

  return (
    <button onClick={handleClick} className={className}>
      {label}
    </button>
  );
};
