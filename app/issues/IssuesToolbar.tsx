import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssuesToolbar = () => {
  return (
    <div className="mb-5">
      <Button variant="soft">
        <Link href="/issues/new">New Issues</Link>
      </Button>
    </div>
  );
};

export default IssuesToolbar;