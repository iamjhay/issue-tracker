import React from "react";
import IssueForm from "../../_component/IssueForm";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const Issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  return (
    <div>
      <IssueForm issue={Issue} />
    </div>
  );
};

export default EditIssuePage;
