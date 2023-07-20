import { createContext, useContext, useMemo, useState } from "react";

const TypeContext = createContext({});
export const TypeProvider = ({ children }) => {
  const [currentType, SetCurrentType] = useState("ESTJ");

  const typeMemo = useMemo(() => ({ currentType }), [currentType]);

  return (
    <TypeContext.Provider value={typeMemo}>{children}</TypeContext.Provider>
  );
};

export default function useType() {
  return useContext(TypeContext);
}
