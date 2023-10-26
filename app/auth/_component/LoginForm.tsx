"use client";

import { ErrorMessage } from "@/app/component";
import { userLoginSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Label from "@radix-ui/react-label";
import { Box, Button, Callout, Separator, TextField } from "@radix-ui/themes";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";

import { z } from "zod";
import {
  AppleSignInButon,
  FacebookSignInButon,
  GoogleSignInButon,
} from "./AuthButtons";

type userLoginSchemaType = z.infer<typeof userLoginSchema>;

const LoginForm = () => {
  const [error, setError] = useState("");
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLoginSchemaType>({
    resolver: zodResolver(userLoginSchema),
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.refresh();
      router.push("/");
    }
  }, [status, router]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const signInResponse = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl,
      });

      if (signInResponse?.ok !== true) {
        setError("Invalid Credential. Try again later!");
      } else {
        router.push(callbackUrl);
      }
    } catch (error) {
      console.log(error);
      setError("An Unexpected error occured");
    }
  });
  return (
    <div className="max-w-sm p-4 w-full shadow-sm border border-slate-300 rounded-md">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <AiOutlineInfoCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <header className="flex items-center gap-4 mb-4">
        <span className="bg-fuchsia-50 p-2 rounded-full border border-fuchsia-200">
          <BiUserCircle className="w-6 h-6 text-fuchsia-900/90" />
        </span>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Log in
        </h1>
      </header>

      <p className="font-light text-sm">
        Become a memeber - you&apos;ll enjoy exclusive deals, offers, invites
        and awards
      </p>

      <Separator className="bg-violet6 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]" />
      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="space-y-3">
          <Box>
            <Label.Root
              className="text-[13px] font-medium leading-[35px]"
              htmlFor="email"
            >
              Email
            </Label.Root>
            <TextField.Root className="rounded-xl">
              <TextField.Input
                id="email"
                placeholder="Your Email"
                radius="full"
                className="placeholder:text-sm !text-sm"
                size={"3"}
                {...register("email")}
              />
            </TextField.Root>
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </Box>
          <Box>
            <Label.Root
              className="text-[13px] font-medium leading-[35px]"
              htmlFor="password"
            >
              Password
            </Label.Root>
            <TextField.Root>
              <TextField.Input
                id="password"
                radius="full"
                size={"3"}
                className="placeholder:text-sm !text-sm"
                placeholder="Your password"
                {...register("password")}
              />
            </TextField.Root>
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </Box>
        </div>
        <div className="flex justify-end">
          <Link
            className="text-xs font-medium hover:underline text-fuchsia-400"
            href="/forgot-password"
          >
            Forgot your password?
          </Link>
        </div>
        <Button
          className="w-full hover:bg-fuchsia-700 !cursor-pointer"
          radius="full"
          size={"3"}
        >
          Log in
        </Button>
      </form>
      <Separator className="bg-violet6 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]" />
      {/* social login */}
      <div className="space-y-4">
        <GoogleSignInButon callbackUrl={callbackUrl} />
        <FacebookSignInButon callbackUrl={callbackUrl} />
        <AppleSignInButon callbackUrl={callbackUrl} />
      </div>
    </div>
  );
};

export default LoginForm;
