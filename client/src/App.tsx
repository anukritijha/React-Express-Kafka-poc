import "react-app-polyfill/ie11";
import "@patternfly/react-core/dist/styles/base.css";
import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import { AppLayout, SwitchWith404, LazyRoute } from "use-patternfly";
import "./App.css";

const navItems = [
  {
    title: "Consumer Groups",
    to: "/consumergroups",
    exact: true,
  },
  {
    title: "Topics",
    to: "/topics",
  },
  {
    title: "Brokers",
    to: "/brokers",
  }
];

export const App = () => {
  const history = useHistory();
  const logoProps = React.useMemo(
    () => ({
      onClick: () => history.push("/"),
    }),
    [history]
  );

  const getConsumerGroupsPage = () => import("./pages/ConsumerGroupsPage");
  const getLoginPage=()=>import("./pages/LoginPage")

  return (
    <AppLayout
      // logo={Logo}
      logoProps={logoProps}
      navVariant={"vertical"}
      navItems={navItems}
      navGroupsStyle={"expandable"}
    >
      <SwitchWith404>
        <LazyRoute path="/consumergroups" exact={true} getComponent={getConsumerGroupsPage} />
        <Redirect path={"/topics"} to={"/consumergroups"} exact={true} />
        <Redirect path={"/brokers"} to={"/consumergroups"} exact={true} />
        <LazyRoute path="/" exact={true} getComponent={getLoginPage} />
      </SwitchWith404>
    </AppLayout>
  );
};
