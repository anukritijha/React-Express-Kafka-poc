import React from "react";
import { useDocumentTitle, useA11yRouteChange } from "use-patternfly";
import { Login } from "components/Login";

export default function LoginPage() {
  useDocumentTitle("Kafka Dashboard");
  useA11yRouteChange();

  return (
    <>
      <Login />
    </>
  );
}
