import React from "react";
import { useFetch } from "react-async";
import { useHistory, useLocation } from "react-router-dom";
import { useA11yRouteChange, useDocumentTitle } from "use-patternfly";
import { ConsumerGroups, IConsumerGroup } from "components/ConsumerGroups";
import { proxyUrl } from "config";

interface ICustomerGroupResponse {
  count: number;
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

  const { data, isPending } = useFetch<ICustomerGroupResponse>(
    proxyUrl + "/api/consumergroups",
    {
      headers: { Accept: "application/json" },
    }
  );

  const { results = [], count: total = 0 } = data || {};

  const rows = results.map((cgroup) => ({
    brokerId: cgroup.brokerId,
    partition: Object.values(cgroup.partition)[0].length,
    topic: cgroup.topic,
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
        onPerPageChange={() => alert("Work in Progress")}
        loading={isPending}
      />
    </>
  );
}
