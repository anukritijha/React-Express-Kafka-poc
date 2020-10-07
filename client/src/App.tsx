import "react-app-polyfill/ie11";
import "@patternfly/react-core/dist/styles/base.css";
import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import { AppLayout, SwitchWith404, LazyRoute } from "use-patternfly";
import "./App.css";

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

  const getConsumerGroupsPage = () => import("./pages/ConsumerGroupsPage");
  const getTopicsListPage = () => import("./pages/TopicsListPage");

  return (
    <AppLayout
      // logo={Logo}
      logoProps={logoProps}
      navVariant={"vertical"}
      navItems={navItems}
      navGroupsStyle={"expandable"}
    >
      <SwitchWith404>
        <LazyRoute path="/" exact={true} getComponent={getConsumerGroupsPage} />
        <LazyRoute
          path="/topics"
          exact={true}
          getComponent={getTopicsListPage}
        />
      </SwitchWith404>
    </AppLayout>
  );
};
