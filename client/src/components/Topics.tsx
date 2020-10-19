import React, { useState, useEffect } from "react";
import { PageSection, Pagination } from "@patternfly/react-core";
import CreateTopics from "./CreateTopics";
import {
  Table,
  TableVariant,
  TableHeader,
  TableBody,
  IRowData,
  sortable
} from "@patternfly/react-table";
import "@patternfly/react-styles/css/components/Toolbar/toolbar.css";
export interface ITopic {
  topic: String;
  partitions: number;
}

export interface ITopicProps {
  rows: ITopic[];
  perPage: number;
  page: number;
  total: number;
  loading: boolean;
  error: any;
  setError: (value: any) => any;
  onPageChange: (page: number) => void;
  onPerPageChange: (page: number) => void;
}

export const Topics: React.FunctionComponent<ITopicProps> = ({
  rows,
  page,
  perPage,
  total,
  error,
  setError,
  loading,
  onPageChange,
  onPerPageChange
}) => {
  const paginationProps = {
    itemCount: total,
    page: page,
    perPage: perPage,
    onSetPage: (_: any, page: number) => onPageChange(page),
    onPerPageSelect: (_: any, page: number) => onPerPageChange(page)
  };

  const tableColumns = [
    { title: "Topic", transforms: [sortable] },
    { title: "Partitions", transforms: [sortable] }
  ];

  const toTableCells = (singleTopic: ITopic) => {
    const { topic, partitions } = singleTopic || {};
    const tableRow: IRowData = {
      cells: [topic, partitions],
      originalData: singleTopic
    };
    return tableRow;
  };
  console.log(error);

  const tableRows = rows && rows.map(toTableCells);

  const actions = [{ title: "Edit" }, { title: "Delete" }];
  return (
    <PageSection>
      <div className="pf-c-toolbar">
        <Pagination {...paginationProps} variant={"top"} />
      </div>
      <CreateTopics error={error} setError={setError} />
      <Table
        variant={TableVariant.compact}
        cells={tableColumns}
        rows={tableRows}
        actions={actions}
        aria-label="Topics list"
      >
        <TableHeader
          id="topics-list-table-header"
          aria-label="Table header for topics list"
        />
        <TableBody />
      </Table>
      <div className="pf-c-toolbar">
        <Pagination {...paginationProps} variant={"bottom"} />
      </div>
    </PageSection>
  );
};
