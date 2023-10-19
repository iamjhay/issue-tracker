import { Skeleton } from "@/app/component";
import { Box, Card, Flex } from "@radix-ui/themes";

const LoadingDetailsPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap={"2"} my={"2"}>
        <Skeleton width={"5rem"} height={"1.3rem"} />
        <Skeleton width={"10rem"} height={"1.3rem"} />
      </Flex>
      <Card mt={"4"}>
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingDetailsPage;
