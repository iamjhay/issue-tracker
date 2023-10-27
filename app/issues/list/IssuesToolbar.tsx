import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./issueStatusFilter";

const IssuesToolbar = () => {
  return (
    <Flex justify={"between"} className="mb-5">
      <IssueStatusFilter />
      <Button variant="soft">
        <Link href="/issues/new">New Issues</Link>
      </Button>
    </Flex>
  );
};

export default IssuesToolbar;
