import React from "react";
import { useFetch } from "react-async";
import { useHistory, useLocation } from "react-router-dom";
import { useA11yRouteChange, useDocumentTitle } from "use-patternfly";
import { ConsumerGroups, IConsumerGroup } from "components/ConsumerGroups";
import { proxyUrl } from "config";

export interface ICustomerGroupRest {
  memberId: string;
  clientId: string;
  clientHost: string;
  subscription: string;
  version: number;
  userData: string;
  groupId: string;
}

interface ICustomerGroupResponse {
  count: number;
  next: string;
  previous?: string;
  results: IConsumerGroup[];
}

export default function CustomerGroupsPage() {
  useDocumentTitle("Kafka Dashboard");
  useA11yRouteChange();
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get("page") || "", 10) || 1;

  const handlePageChange = React.useCallback(
    (newPage: number) => {
      searchParams.set("page", newPage.toString());
      history.push({
        search: searchParams.toString(),
      });
    },
    [searchParams, history]
  );

  const { data, isPending } = useFetch<any>(proxyUrl + "/api/consumergroups", {
    headers: { Accept: "application/json" },
  });

  const { results = [], count: total = 0 } = data || {};
  console.log("results", data && Object.keys(data), data);

  const rows = results.map((cgroup: any) => ({
    memberId: cgroup.memberId,
    clientId: cgroup.clientId,
    clientHost: cgroup.clientHost,
    subscription: cgroup.subscription,
    version: cgroup.version,
    userData: cgroup.userData,
    groupId: cgroup.groupId,
  }));

  return (
    <>
      <ConsumerGroups
        page={page}
        perPage={rows.length || 10}
        rows={rows}
        total={total}
        onPageChange={handlePageChange}
        onPerPageChange={() => alert("Sorry, SWApi doesn't support this")}
        loading={isPending}
      />
    </>
  );
}
