import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../app/store.js";
import type { ReactElement } from "react";

export default function AdminRoute({ children }: { children: ReactElement }) {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
