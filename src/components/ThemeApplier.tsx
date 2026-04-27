import { useEffect } from "react";
import { useRole } from "@/contexts/RoleContext";

/**
 * Applies a `data-theme` attribute on <html> based on the active role.
 * - issuing    → light "Bullion" red theme
 * - negotiating → dark "Bullion" green theme
 * - none       → neutral default
 *
 * All colour tokens in index.css cascade off this attribute, so every
 * component automatically re-skins when the role changes.
 */
export const ThemeApplier = () => {
  const { role } = useRole();

  useEffect(() => {
    const root = document.documentElement;
    if (role === "issuing") root.setAttribute("data-theme", "issuing");
    else if (role === "negotiating") root.setAttribute("data-theme", "negotiating");
    else root.removeAttribute("data-theme");
  }, [role]);

  return null;
};
