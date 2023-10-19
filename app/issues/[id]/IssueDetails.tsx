import { IssueStatusBadge } from "@/app/component";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import Markdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue?.title}</Heading>
      <Flex gap={"4"} my={"4"}>
        <IssueStatusBadge status={issue?.status} />
        <p>{issue?.createdAt.toDateString()}</p>
      </Flex>
      <Card className="prose" mt={"4"}>
        <Markdown>{issue?.description}</Markdown>
      </Card>
    </>
  );
};

export default IssueDetails;
