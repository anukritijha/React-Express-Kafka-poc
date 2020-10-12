import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";
import { LazyRoute, IDynamicImportProps } from "use-patternfly";
import { useHistory } from "react-router-dom";

export function PrivateRoute({ component: Component, ...rest }: any) {
  const history = useHistory();
  const { authTokens } = useAuth();

  useEffect(() => {
    fetch("http://localhost:8080/auth/check", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          if (result.user) {
            history.push("/");
          }
        },
        error => {
          console.error(true);
        }
      );
  }, []);

  return (
    <>
      {authTokens ? (
        <LazyRoute getComponent={Component} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { referer: window.location.pathname }
          }}
        />
      )}
    </>
  );
}
