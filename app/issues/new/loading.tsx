import { Skeleton } from "@/app/component";
import { Box } from "@radix-ui/themes";

const LoadingNewIssuePage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height={"2rem"} className="mb-3" />
      <Skeleton height={"20rem"} />
    </Box>
  );
};

export default LoadingNewIssuePage;
