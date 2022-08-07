import { useContext, useState, createContext } from "react";

// Varible del contexto
export const LoaderContext = createContext();

// Hook de react del contexto
export const useLoader = () => {
   const context = useContext(LoaderContext);

   if (!context) throw new Error("Use Loader in the context...");

   return context;
};

// Conexto provider que contiene a toda la APP
export const LoaderContextProvider = ({ children }) => {
   const [loading, setLoading] = useState(false);

   return (
      <LoaderContext.Provider value={{ loading, setLoading }}>
         {children}
      </LoaderContext.Provider>
   );
};
