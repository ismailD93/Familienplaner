"use client";
import { FC, ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";

interface Props {
  children: ReactNode;
}
const AutWrapper: FC<Props> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AutWrapper;
