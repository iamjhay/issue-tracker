"use client";

import React, { useEffect, useState } from "react";
import { Select } from "@radix-ui/themes";
import { Issue, User } from "@prisma/client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/app/component";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (error) return null;

  if (isLoading) return <Skeleton />;

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || ""}
      onValueChange={(userId) => {
        if (userId === "null") {
          axios.patch("/api/issues/" + issue.id, {
            assignedToUserId: null,
          });
        } else {
          axios.patch("/api/issues/" + issue.id, {
            assignedToUserId: userId,
          });
        }
      }}
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
  );
};

export default AssigneeSelect;
