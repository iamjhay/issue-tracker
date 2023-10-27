import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./issueStatusFilter";
import { SearchParamsProps } from "./page";

const IssuesToolbar = ({ searchParams }: SearchParamsProps) => {
  return (
    <Flex justify={"between"} className="mb-5">
      <IssueStatusFilter searchParams={searchParams} />
      <Button variant="soft">
        <Link href="/issues/new">New Issues</Link>
      </Button>
    </Flex>
  );
};

export default IssuesToolbar;
