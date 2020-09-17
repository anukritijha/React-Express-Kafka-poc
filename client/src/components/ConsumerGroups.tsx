import React from "react";
import { PageSection, Pagination } from "@patternfly/react-core";
import {
  Table,
  TableVariant,
  TableHeader,
  TableBody,
  IRowData,
  sortable,
} from "@patternfly/react-table";
import "@patternfly/react-styles/css/components/Toolbar/toolbar.css";

export interface IConsumerGroup {
  memberId: string;
  clientId: string;
  clientHost: string;
  subscription: number;
  version: number;
  userData: string;
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
  onPerPageChange,
}) => {
  const paginationProps = {
    itemCount: total,
    page: page,
    perPage: perPage,
    onSetPage: (_: any, page: number) => onPageChange(page),
    onPerPageSelect: (_: any, page: number) => onPerPageChange(page),
  };

  const tableColumns = [
    { title: "Member ID", transforms: [sortable] },
    { title: "Client ID", transforms: [sortable] },
    { title: "Client Host", transforms: [sortable] },
    { title: "Subscription", transforms: [sortable] },
    { title: "Version", transforms: [sortable] },
    { title: "User Data", transforms: [sortable] },
    { title: "Group Id", transforms: [sortable] },
  ];

  const toTableCells = (consumerGroup: IConsumerGroup) => {
    const {
      memberId,
      clientId,
      clientHost,
      subscription,
      version,
      userData,
      groupId,
    } = consumerGroup || {};

    const tableRow: IRowData = {
      cells: [
        memberId,
        clientId,
        clientHost,
        subscription,
        version,
        userData,
        groupId,
      ],
      originalData: consumerGroup,
    };
    return tableRow;
  };

  const tableRows = rows && rows.map(toTableCells);
  return (
    <PageSection>
      <div className="pf-c-toolbar">
        <Pagination {...paginationProps} variant={"top"} />
      </div>
      <Table
        variant={TableVariant.compact}
        cells={tableColumns}
        rows={tableRows}
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
