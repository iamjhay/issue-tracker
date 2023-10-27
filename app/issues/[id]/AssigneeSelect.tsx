"use client";

import { Skeleton } from "@/app/component";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (error) return null;

  if (isLoading) return <Skeleton />;

  const assignIssueChange = (userId: string) => {
    if (userId === "null") {
      axios
        .patch("/api/issues/" + issue.id, {
          assignedToUserId: null,
        })
        .then(() => {
          toast.success("Assigned successfully!");
        })
        .catch(() => {
          toast.error("Changes could not be saved");
        });
    } else {
      axios
        .patch("/api/issues/" + issue.id, {
          assignedToUserId: userId,
        })
        .then(() => {
          toast.success("Assigned successfully!");
        })
        .catch(() => {
          toast.error("Changes could not be saved");
        });
    }
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={assignIssueChange}
      >
        <Select.Trigger placeholder="Assign…" />
        <Select.Content>
          <Select.Group>
            <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
              Suggestions
            </Select.Label>
            <Select.Item value="null">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeSelect;
