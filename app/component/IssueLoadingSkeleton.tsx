import { Skeleton } from "@/app/component";
import { Box } from "@radix-ui/themes";

const IssueLoadingSkeleton = () => {
  return (
    <Box className="max-w-3xl">
      <Skeleton height={"2rem"} className="mb-3" />
      <Skeleton height={"20rem"} />
    </Box>
  );
};

export default IssueLoadingSkeleton;
