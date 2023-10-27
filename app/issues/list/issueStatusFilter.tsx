"use client";
import React from "react";
import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { useRouter } from "next/navigation";
import { SearchParamsProps } from "./page";

const IssueStatusFilter = ({ searchParams }: SearchParamsProps) => {
  const router = useRouter();
  const statuses: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];
  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status !== " " ? { ...searchParams, status } : "";
        const searchParam = new URLSearchParams(query);
        const queryString = searchParam.toString();
        if (query === "") {
          router.push("/issues/list/");
        } else {
          router.push("/issues/list?" + queryString);
        }
      }}
    >
      <Select.Trigger placeholder="Filter by Status..." />
      <Select.Content>
        <Select.Group>
          {statuses.map((status) => (
            <Select.Item
              key={status.label}
              value={status.value || undefined || " "}
            >
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
