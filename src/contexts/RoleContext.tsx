import React, { createContext, useContext, useState, ReactNode } from "react";

export type BankRole = "issuing" | "negotiating" | null;

interface RoleContextType {
  role: BankRole;
  setRole: (role: BankRole) => void;
  roleName: string;
}

const RoleContext = createContext<RoleContextType>({
  role: null,
  setRole: () => {},
  roleName: "",
});

export const useRole = () => useContext(RoleContext);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<BankRole>(null);

  const roleName = role === "issuing" ? "Issuing Bank" : role === "negotiating" ? "Negotiating Bank" : "";

  return (
    <RoleContext.Provider value={{ role, setRole, roleName }}>
      {children}
    </RoleContext.Provider>
  );
};
