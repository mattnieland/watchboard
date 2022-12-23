/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { LoadingOverlay } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";

const PageAuthLogin: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  const queryParameters = new URLSearchParams(window.location.search);
  const code = queryParameters.get("code") || null;

  useEffect(() => {
    if (code !== null) {
    } else {
      loginWithRedirect();
    }
  }, []);

  return <>
    {code !== null && <LoadingOverlay visible />}        
  </>;
};

export default PageAuthLogin;
