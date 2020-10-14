import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";
import { LazyRoute } from "use-patternfly";
import { useHistory } from "react-router-dom";

export function PrivateRoute({ component: Component, ...rest }: any) {
  const history = useHistory();
  const { authTokens, setAuthTokens } = useAuth();

  // console.log(authTokens);
  console.log(document.cookie);

  useEffect(() => {
    if (!authTokens) {
      fetch("http://localhost:5000/auth/check", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          console.log("RES", res);
          return res.json();
        })
        .then(
          result => {
            console.log(result.user);
            if (!authTokens) {
              setAuthTokens(result.user);
            }
            if (result.user) {
              history.push("/");
            }
          },
          error => {
            console.error(true);
          }
        );
    }
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
