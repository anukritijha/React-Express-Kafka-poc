import React from "react";
import { PageSection, Pagination } from "@patternfly/react-core";
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
  topic: any;
  partitions: any;
}

export interface ITopicProps {
  rows: ITopic[];
  perPage: number;
  page: number;
  total: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onPerPageChange: (page: number) => void;
}

export const Topics: React.FunctionComponent<ITopicProps> = ({
  rows,
  page,
  perPage,
  total,
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

  const tableRows = rows && rows.map(toTableCells);

  const actions = [{ title: "Edit" }, { title: "Delete" }];
  return (
    <PageSection>
      <div className="pf-c-toolbar">
        <Pagination {...paginationProps} variant={"top"} />
      </div>
      <Table
        variant={TableVariant.compact}
        cells={tableColumns}
        rows={tableRows}
        actions={actions}
        aria-label="consumerGroup list"
      >
        <TableHeader
          id="consumerGroup-list-table-header"
          aria-label="Table header for consumerGroups list"
        />
        <TableBody />
      </Table>
      <div className="pf-c-toolbar">
        <Pagination {...paginationProps} variant={"bottom"} />
      </div>
    </PageSection>
  );
};
