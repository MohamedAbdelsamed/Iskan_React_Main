import React, { createContext, useState, useContext } from "react";

// Create the context
export const DataContext = createContext();

// Create a custom hook for using the context (optional)
export const useData = () => useContext(DataContext);

// Create a provider component
export const DataProvider = ({ children }) => {
  const [message, setMessage] = useState("");

  return (
    <DataContext.Provider value={{ message, setMessage }}>
      {children}
    </DataContext.Provider>
  );
};