import React from "react";
import { useFetch } from "react-async";
import { useHistory, useLocation } from "react-router-dom";
import { useA11yRouteChange, useDocumentTitle } from "use-patternfly";
import { Topics } from "components/Topics";
import { proxyUrl } from "config";

export interface ITopicsResponse {
  topic: String[];
  partitions: number[];
}

export default function TopicsPage() {
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
        search: searchParams.toString()
      });
    },
    [searchParams, history]
  );

  const { data, isPending } = useFetch<ITopicsResponse>(
    proxyUrl + "/api/topics",
    {
      headers: { Accept: "application/json" }
    }
  );

  const { topic = [], partitions = [] } = data || {};
  const rows = topic.map((topic, index) => ({
    topic: topic,
    partitions: partitions[index]
  }));

  return (
    <>
      <Topics
        page={page}
        perPage={topic.length || 10}
        rows={rows}
        total={topic.length}
        onPageChange={handlePageChange}
        onPerPageChange={() => alert("Work in Progress")}
        loading={isPending}
      />
    </>
  );
}
