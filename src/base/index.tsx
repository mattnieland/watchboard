import "./index.css";
// Global - App Context
import { AppContext } from "context";
// Mantine
import { NavigationProgress } from "@mantine/nprogress";
// Auth0
// import { Auth0Provider, CacheLocation } from "@auth0/auth0-react";
import AppRoutes from "routes";
// import { IntlProvider } from "react-intl";
// import {
//   messagesInEnglish,
//   messagesInFrench,
//   messagesInGerman,
//   messagesInItalian,
//   messagesInPolish,
//   messagesInSpanish,
// } from "./translations";
import { useState } from "react";

const AppBase: React.FC = () => {
  const [language, setLanguage] = useState<string>("en");
  const contextValue = {
    language,
    setLanguage,
  };

  // const providerConfig = {
  //   domain: process.env.REACT_APP_AUTH0_DOMAIN || "",
  //   clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || "",
  //   cacheLocation: "localstorage" as CacheLocation,
  //   redirectUri: window.location.origin,
  // };

  // const languages = {
  //   en: messagesInEnglish,
  //   fr: messagesInFrench,
  //   gr: messagesInGerman,
  //   it: messagesInItalian,
  //   po: messagesInPolish,
  //   sp: messagesInSpanish,
  // };

  // const getLanguage = () => {
  //   switch (language) {
  //     case "en":
  //       return languages.en;
  //     case "fr":
  //       return languages.fr;
  //     case "gr":
  //       return languages.gr;
  //     case "it":
  //       return languages.it;
  //     case "po":
  //       return languages.po;
  //     case "sp":
  //       return languages.sp;
  //     default:
  //       return languages.en;
  //   }
  // };

  return (
    <>
      {/* <IntlProvider
        messages={getLanguage()}
        locale={language}
        defaultLocale="en"
      > */}
      {/* <Auth0Provider {...providerConfig}> */}
      <AppContext.Provider value={contextValue}>
        <NavigationProgress />
        <AppRoutes />
      </AppContext.Provider>
      {/* </Auth0Provider> */}
      {/* </IntlProvider> */}
    </>
  );
};

export default AppBase;
