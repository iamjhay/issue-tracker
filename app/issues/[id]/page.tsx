import { IssueStatusBadge } from "@/app/component";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  // query db to fetch issues by id!
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  // display 404 page if issue is not found!
  if (!issue) notFound();

  //   await delay(2000);
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"4"}>
      <Box>
        <Heading>{issue?.title}</Heading>
        <Flex gap={"4"} my={"4"}>
          <IssueStatusBadge status={issue?.status} />
          <p>{issue?.createdAt.toDateString()}</p>
        </Flex>
        <Card className="prose" mt={"4"}>
          <Markdown>{issue?.description}</Markdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
