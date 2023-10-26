"use client";

import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Button } from "@radix-ui/themes";
import { AiFillApple } from "react-icons/ai";
import { signIn } from "next-auth/react";

export function GoogleSignInButon({ callbackUrl }: { callbackUrl: string }) {
  const handleSubmit = async () => {
    await signIn("google", { callbackUrl });
  };

  return (
    <Button
      onClick={handleSubmit}
      variant="outline"
      radius="full"
      size={"3"}
      className="w-full inline-flex items-center border rounded-full !cursor-pointer"
    >
      <FcGoogle className="w-6 h-6 ml-5" />
      <span className="text-base m-auto">Continue with Google</span>
    </Button>
  );
}
export function FacebookSignInButon({ callbackUrl }: { callbackUrl: string }) {
  return (
    <Button
      variant="outline"
      radius="full"
      size={"3"}
      className="w-full inline-flex items-center border rounded-full !cursor-pointer"
    >
      <FaFacebookF className="w-6 h-6 ml-5 !text-indigo-600" />
      <span className="text-base m-auto">Continue with Facebook</span>
    </Button>
  );
}
export function AppleSignInButon({ callbackUrl }: { callbackUrl: string }) {
  return (
    <Button
      variant="outline"
      radius="full"
      size={"3"}
      className="w-full inline-flex items-center border rounded-full !cursor-pointer"
    >
      <AiFillApple className="w-6 h-6 ml-5 !text-black" />
      <span className="text-base m-auto">Continue with Apple</span>
    </Button>
  );
}
