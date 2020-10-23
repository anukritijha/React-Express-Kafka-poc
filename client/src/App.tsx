import "react-app-polyfill/ie11";
import "@patternfly/react-core/dist/styles/base.css";
import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { AppLayout, SwitchWith404, LazyRoute } from "use-patternfly";
import { Avatar } from "@patternfly/react-core";
import "./App.css";
import { AppNavHeader } from "./components";
import avatarImg from "./assests/images/img_avatar.svg";
import { AuthContext, useAuth } from "./context";
import { PrivateRoute } from "./components";
import { NavToolBar } from "components/NavToolbar";

const getConsumerGroupsPage = () => import("./pages/ConsumerGroupsPage");
const getLoginPage = () => import("./pages/LoginPage");

const navItems = [
  {
    title: "Consumer Groups",
    to: "/",
    exact: true
  },
  {
    title: "Topics",
    to: "/topics"
  },
  {
    title: "Brokers",
    to: "/brokers"
  }
];

export const App = () => {
  const history = useHistory();
  const logoProps = React.useMemo(
    () => ({
      onClick: () => history.push("/")
    }),
    [history]
  );

  const [authTokens, setAuthTokens] = useState();
  //const brandImgLogo = <Brand src={brandImg} alt={"Managed Kafka"} />;
  const avatar = authTokens && (
    <Avatar src={avatarImg} className="app-avatar" alt="avatar" />
  );
  const HeaderTools = () => (
    <div className="pf-c-page__header-tools">
      <AppNavHeader
        // logo={brandImgLogo}
        logoProps={logoProps}
        avatar={avatar}
        toolbar={<NavToolBar />}
      />
    </div>
  );

  const setTokens = (data: any) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <AppLayout
        //logo={Logo}
        logoProps={logoProps}
        navVariant={"vertical"}
        navItems={navItems}
        navGroupsStyle={"expandable"}
        headerTools={<HeaderTools />}
      >
        <SwitchWith404>
          <PrivateRoute
            path="/"
            exact={true}
            component={getConsumerGroupsPage}
          />
          <Redirect path={"/topics"} to={"/consumergroups"} exact={true} />
          <Redirect path={"/brokers"} to={"/consumergroups"} exact={true} />
          <LazyRoute path="/login" exact={true} getComponent={getLoginPage} />
        </SwitchWith404>
      </AppLayout>
    </AuthContext.Provider>
  );
};
