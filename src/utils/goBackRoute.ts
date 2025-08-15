import { useNavigate } from "react-router-dom";

export const useGoToRoute = () => {
  const navigate = useNavigate();

  return (path: string) => navigate(path);
};

export const useGoBack = () => {
  const navigate = useNavigate();

  return () => navigate(-1); // Goes back one step in history
};