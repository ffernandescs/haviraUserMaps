import React, { createContext, useContext } from "react";
import { useToast as useChakraToast, ToastId } from "@chakra-ui/react";

type ToastSeverity = "success" | "info" | "warning" | "error";
type ToastContextType = {
  showToastMessage: (
    severity: ToastSeverity,
    summary: string,
    detail: string
  ) => ToastId | undefined;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser utilizado dentro de um ToastProvider");
  }
  return context;
};

type ToastProviderProps = {
  children: React.ReactNode;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const chakraToast = useChakraToast();
  const showToastMessage: ToastContextType["showToastMessage"] = (
    severity = "success",
    summary,
    detail
  ) => {
    return chakraToast({
      status: severity,
      title: summary,
      description: detail,
      duration: 3000,
      position: "top",
    });
  };

  const value = {
    showToastMessage,
  };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};
