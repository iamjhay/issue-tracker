import { IssueStatusBadge, Link } from "@/app/component";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssuesToolbar from "./IssuesToolbar";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div className="w-full">
      <IssuesToolbar />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              CreatedAt
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {issues.length === 0 && (
        <span className="text-center w-full flex items-center justify-center py-2 mt-4">
          There are no issues avalable!
        </span>
      )}
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
