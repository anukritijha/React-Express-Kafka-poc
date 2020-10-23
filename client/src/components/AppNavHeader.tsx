import React from "react";
import styles from "@patternfly/react-styles/css/components/Page/page";
import { css } from "@patternfly/react-styles";
import { PageHeaderProps, PageContextConsumer } from "@patternfly/react-core";

interface IAppNavHeaderProps extends PageHeaderProps {
  toolbar?: React.ReactNode;
  avatar?: React.ReactNode;
}
export class AppNavHeader extends React.Component<IAppNavHeaderProps> {
  render() {
    const {
      logo = null as React.ReactNode,
      logoProps = (null as unknown) as object,
      logoComponent = "a",
      toolbar = null as React.ReactNode,
      avatar = null as React.ReactNode,
      topNav = null as React.ReactNode,
      ...props
    } = this.props;

    const LogoComponent = logoComponent as any;

    return (
      <PageContextConsumer>
        {PageHeaderProps => {
          return (
            <header
              role="banner"
              className={`${css(styles.pageHeader)} `}
              {...props}
            >
              {logo && (
                <div className={css(styles.pageHeaderBrand)}>
                  <LogoComponent
                    className={css(styles.pageHeaderBrandLink)}
                    {...logoProps}
                  >
                    {logo}
                  </LogoComponent>
                </div>
              )}
              {topNav && (
                <div className={css(styles.pageHeaderNav)}>{topNav}</div>
              )}
              {(toolbar || avatar) && (
                <div className={css(styles.pageHeaderTools)}>
                  {toolbar}
                  {avatar}
                </div>
              )}
            </header>
          );
        }}
      </PageContextConsumer>
    );
  }
}
