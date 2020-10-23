/*
 * Copyright 2020, EnMasse authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */

import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  Button,
  ButtonVariant
} from "@patternfly/react-core";
import { useAuth } from "../context/auth";
import { useHistory } from "react-router";

const NavToolBar: React.FC = () => {
  const { authTokens, setAuthTokens } = useAuth();
  const history = useHistory();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState<boolean>(false);

  const onUserDropdownSelect = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };
  const onLogout = async () => {
    setAuthTokens && setAuthTokens(undefined);
  };
  const userDropdownItems = [
    <DropdownItem
      id="nav-toolbar-logout-dropdownitem"
      key={"logout"}
      href="http://localhost:5000/auth/logout"
      onClick={onLogout}
    >
      Logout
    </DropdownItem>
  ];
  return (
    <React.Fragment>
      {authTokens ? (
        <Dropdown
          id="nav-toolbar-user-dropdown"
          key="user-dropdown"
          isPlain
          position="right"
          onSelect={onUserDropdownSelect}
          isOpen={isUserDropdownOpen}
          toggle={
            <DropdownToggle onToggle={setIsUserDropdownOpen}>
              {/* <User /> */}
            </DropdownToggle>
          }
          dropdownItems={userDropdownItems}
        />
      ) : (
        <Button
          variant={ButtonVariant.secondary}
          onClick={() => {
            history.push("/login");
          }}
        >
          Login
        </Button>
      )}
    </React.Fragment>
  );
};

export { NavToolBar };
