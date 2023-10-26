"use client";

import React, { useEffect, useState } from "react";
import { Select } from "@radix-ui/themes";
import { SelectItem } from "@radix-ui/themes";
import { User } from "@prisma/client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/app/component";

const AssigneeSelect = () => {
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
    <Select.Root>
      <Select.Trigger placeholder="Assign…" />
      <Select.Content>
        <Select.Group>
          <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
            Suggestions
          </Select.Label>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name}
            </SelectItem>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
