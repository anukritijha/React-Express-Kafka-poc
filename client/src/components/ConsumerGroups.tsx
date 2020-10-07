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

export interface IConsumerGroup {
  brokerId: string;
  partition: number;
  topic: string;
  groupId: string;
}

export interface IConsumerGroupProps {
  rows: IConsumerGroup[];
  perPage: number;
  page: number;
  total: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onPerPageChange: (page: number) => void;
}

export const ConsumerGroups: React.FunctionComponent<IConsumerGroupProps> = ({
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
    { title: "Broker ID", transforms: [sortable] },
    { title: "Partitions", transforms: [sortable] },
    { title: "Topic", transforms: [sortable] },
    { title: "Group Id", transforms: [sortable] }
  ];

  const toTableCells = (consumerGroup: IConsumerGroup) => {
    const { brokerId, partition, topic, groupId } = consumerGroup || {};

    const tableRow: IRowData = {
      cells: [brokerId, partition, topic, groupId],
      originalData: consumerGroup
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
