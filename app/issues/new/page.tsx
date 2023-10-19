import React from "react";

import dynamic from "next/dynamic";
import IssueLoadingSkeleton from "./loading";

const IssueForm = dynamic(() => import("../_component/IssueForm"), {
  ssr: false,
  loading: () => <IssueLoadingSkeleton />,
});

const NewIssuePage = () => {
  return (
    <>
      <IssueForm />
    </>
  );
};

export default NewIssuePage;
