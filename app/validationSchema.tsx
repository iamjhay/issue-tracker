import { z } from "zod";

export const IssueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required."),
});

export const PatchIssueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "assigned to UserId is required")
    .max(255)
    .optional()
    .nullable(),
});

export const userLoginSchema = z.object({
  email: z
    .string()
    .min(1, "Your email is required!")
    .email({ message: "Please enter a valid email address." }),
  password: z.string().min(3, "Your password is required!"),
});

export const userRegisterSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Your name is required!" })
      .min(3, { message: "Name must be greater that 3 characters" }),
    email: z
      .string()
      .min(1, { message: "Your email is required!" })
      .email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(3, { message: "Your password is required!" })
      .min(8, { message: "Password must have more than 8 characters!" }),
    confirmPassword: z.string().min(1, "please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });
