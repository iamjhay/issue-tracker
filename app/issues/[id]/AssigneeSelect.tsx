"use client";

import React, { useEffect, useState } from "react";
import { Select } from "@radix-ui/themes";
import { SelectItem } from "@radix-ui/themes";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { User } from "@prisma/client";
import axios from "axios";

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      // Fetch users here and update the state with the result.
      const { data } = await axios.get<User[]>("/api/users");
      setUsers(data);
    };

    fetchUser();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign…" />
      <Select.Content>
        <Select.Group>
          <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
            Suggestions
          </Select.Label>
          {users.map((user) => (
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
