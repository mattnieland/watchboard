// React
import { createContext } from "react";

export const AppContext = createContext({} as AppContextDetails);

export interface AppContextDetails {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}
