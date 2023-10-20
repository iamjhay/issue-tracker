"use client";
import { AlertDialog, Button } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delete account</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Are you absolutely sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
            Are you sure you want to delete this Issue. This action cannot be
            undone.
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px] mt-8">
            <AlertDialog.Cancel>
              <Button variant="soft">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                color="red"
                onClick={async () => {
                  try {
                    // To simulate an error
                    // throw new Error();
                    await axios.delete("/api/issues/" + issueId);
                    router.push("/issues");
                    router.refresh();
                  } catch (error: any) {
                    setError(error);
                  }
                }}
              >
                Yes, delete account
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium text-red-400">
            Oops... Something went wrong!
          </AlertDialog.Title>
          <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal text-red-500">
            This issue could not be deleted. Try again later
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px] mt-4">
            <Button
              color="gray"
              variant="soft"
              my={"1"}
              onClick={() => setError(false)}
            >
              Ok
            </Button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
