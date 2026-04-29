import React, { createContext, useState } from "react";

export const Stylecontext = createContext();

export const StyleProvider = ({ children }) => {
  const [selections, setSelections] = useState({});

  const updateSelection = (type, value) => {
    setSelections((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <Stylecontext.Provider value={{ selections, updateSelection }}>
      {children}
    </Stylecontext.Provider>
  );
};