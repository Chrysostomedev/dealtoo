"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Pays = {
  code: string;
  nom: string;
  flagColors: string[];
};

export const PAYS_LIST: Pays[] = [
  { code: "CI", nom: "Côte d'Ivoire", flagColors: ["#F77F00", "#FFFFFF", "#009E60"] },
  { code: "SN", nom: "Sénégal", flagColors: ["#00853F", "#FDEF42", "#E31B23"] },
  { code: "CM", nom: "Cameroun", flagColors: ["#007A5E", "#CE1126", "#FCD116"] },
  { code: "ML", nom: "Mali", flagColors: ["#14B53A", "#FCD116", "#CE1126"] },
  { code: "BF", nom: "Burkina Faso", flagColors: ["#EF2B2D", "#009E49", "#FCD116"] },
];

interface CountryContextType {
  paysSelectionne: Pays;
  setPaysSelectionne: (pays: Pays) => void;
}

const CountryContext = createContext<CountryContextType>({
  paysSelectionne: PAYS_LIST[0],
  setPaysSelectionne: () => {},
});

export const useCountry = () => useContext(CountryContext);

export function CountryProvider({ children }: { children: ReactNode }) {
  const [paysSelectionne, setPaysSelectionneState] = useState<Pays>(PAYS_LIST[0]);

  // Optionnel : Sauvegarder dans le localStorage
  useEffect(() => {
    const saved = localStorage.getItem("dealtoo_country");
    if (saved) {
      const parsed = JSON.parse(saved);
      const found = PAYS_LIST.find((p) => p.code === parsed.code);
      if (found) setPaysSelectionneState(found);
    }
  }, []);

  const setPaysSelectionne = (pays: Pays) => {
    setPaysSelectionneState(pays);
    localStorage.setItem("dealtoo_country", JSON.stringify(pays));
  };

  return (
    <CountryContext.Provider value={{ paysSelectionne, setPaysSelectionne }}>
      {children}
    </CountryContext.Provider>
  );
}
