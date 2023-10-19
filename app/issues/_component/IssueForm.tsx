"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
// import SimpleMDE from "react-simplemde-editor";
import { ErrorMessage, Spinner } from "@/app/component";
import { createIssueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { z } from "zod";
import { Issue } from "@prisma/client";

type IssueFormProps = z.infer<typeof createIssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue | null }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormProps>({
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      setError("An Unexpected error occured");
    }
  });

  // for lazy loading a component, we disable SSR
  const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
  });

  return (
    <div className="max-w-3xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <AiOutlineInfoCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={submitting}>
          Submit New Issues {submitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
