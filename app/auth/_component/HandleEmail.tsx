"use server";

import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import React from "react";

const HandleEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user as User;
};

export default HandleEmail;
