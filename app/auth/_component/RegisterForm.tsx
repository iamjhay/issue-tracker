"use client";
import { ErrorMessage } from "@/app/component";
import { userRegisterSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import * as Label from "@radix-ui/react-label";
import { Box, Button, TextField } from "@radix-ui/themes";
import { Dispatch, SetStateAction, useState } from "react";
import {
  FieldErrors,
  UseFormGetFieldState,
  UseFormRegister,
  UseFormSetError,
  UseFormTrigger,
  UseFormWatch,
  useForm,
} from "react-hook-form";
import { BiUserCircle } from "react-icons/bi";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { FinalOnboardingSlide } from "@/app/component/anim";
import prisma from "@/prisma/client";
import HandleEmail from "./HandleEmail";
import { User } from "@prisma/client";

type userRegisterSchemaType = z.infer<typeof userRegisterSchema>;

export default function MultiStepForm() {
  const {
    register,
    trigger,
    getFieldState,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<userRegisterSchemaType>({
    resolver: zodResolver(userRegisterSchema),
  });
  const [currentStep, setCurrentStep] = useState(0);

  // Prev Button
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = handleSubmit(async (data) => {
    // Handle form submission, e.g., API call
    console.log(data);
  });

  return (
    <div>
      <header className="flex items-center justify-between mb-4 w-full">
        <div className="flex items-center gap-4">
          <span className="bg-fuchsia-50 p-2 rounded-full border border-fuchsia-200">
            <BiUserCircle className="w-6 h-6 text-fuchsia-900/90" />
          </span>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Sign Up
          </h1>
        </div>
        {currentStep > 0 && (
          <span
            onClick={handlePrev}
            className="cursor-pointer h-7 w-7 grid place-items-center rounded-full bg-gray-100"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
          </span>
        )}
      </header>

      <p className="font-light text-sm">
        Become a member - you&apos;ll enjoy exclusive deals, offers, invites and
        awards
      </p>
      <form className="space-y-6 overflow-hidden" onSubmit={onSubmit}>
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <StepOne
              register={register}
              errors={errors}
              trigger={trigger}
              getFieldState={getFieldState}
              setCurrentStep={setCurrentStep}
              watch={watch}
              setError={setError}
            />
          )}
          {currentStep === 1 && (
            <StepTwo
              register={register}
              errors={errors}
              trigger={trigger}
              getFieldState={getFieldState}
              setCurrentStep={setCurrentStep}
            />
          )}
          {currentStep === 2 && (
            <StepThree
              register={register}
              errors={errors}
              trigger={trigger}
              getFieldState={getFieldState}
              setCurrentStep={setCurrentStep}
            />
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}

interface StepProps {
  register: UseFormRegister<userRegisterSchemaType>;
  errors: FieldErrors<userRegisterSchemaType>;
  trigger: UseFormTrigger<userRegisterSchemaType>;
  getFieldState: UseFormGetFieldState<userRegisterSchemaType>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

const StepOne = ({
  register,
  errors,
  trigger,
  getFieldState,
  setCurrentStep,
  watch,
  setError,
}: StepProps & {
  watch: UseFormWatch<userRegisterSchemaType>;
  setError: UseFormSetError<userRegisterSchemaType>;
}) => {
  // Next Button
  const handleNext = async () => {
    trigger(["email"]);
    const emailState = getFieldState("email");

    if (!emailState.isDirty || emailState.invalid) {
      return;
    } else {
      const emailInputValue = watch("email");
      const user: Promise<User> = HandleEmail(emailInputValue);
      if (await user) {
        setError("email", {
          type: "custom",
          message: "This address is already linked to an existing account!",
        });
        return;
      }
    }
    setCurrentStep(1);
  };

  return (
    <motion.div
      variants={FinalOnboardingSlide}
      initial="initial"
      animate="enter"
      transition={{
        delayChildren: 10,
        staggerChildren: 0.5,
      }}
      exit="exit"
      className="space-y-4 mt-5"
    >
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
      <button
        type="button"
        className="w-full p-2 rounded-full text-white bg-fuchsia-600 hover:bg-fuchsia-700 !cursor-pointer"
        onClick={handleNext}
      >
        Next
      </button>
    </motion.div>
  );
};

const StepTwo = ({
  register,
  errors,
  trigger,
  getFieldState,
  setCurrentStep,
}: StepProps) => {
  // Next Button
  const handleNext = () => {
    trigger(["name"]);
    const nameState = getFieldState("name");
    if (!nameState.isDirty || nameState.invalid) return;
    setCurrentStep(2);
  };
  return (
    <motion.div
      variants={FinalOnboardingSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="mt-5"
    >
      <Box>
        <Label.Root
          className="text-[13px] font-medium leading-[35px]"
          htmlFor="name"
        >
          Name
        </Label.Root>
        <TextField.Root className="rounded-xl">
          <TextField.Input
            id="name"
            placeholder="Your Name"
            radius="full"
            className="placeholder:text-sm !text-sm"
            size={"3"}
            {...register("name")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
      </Box>
      <button
        type="button"
        className="mt-5 w-full p-2 rounded-full text-white bg-fuchsia-600 hover:bg-fuchsia-700 !cursor-pointer"
        onClick={handleNext}
      >
        Next
      </button>
    </motion.div>
  );
};

const StepThree = ({
  register,
  errors,
  trigger,
  getFieldState,
  setCurrentStep,
}: StepProps) => {
  // Next Button
  const handleNext = () => {
    trigger(["password"]);
    const passwordState = getFieldState("password");
    const confirmPasswordState = getFieldState("confirmPassword");
    if (!passwordState.isDirty || passwordState.invalid) return;
    if (!confirmPasswordState.isDirty || confirmPasswordState.invalid) return;
  };
  return (
    <motion.div
      variants={FinalOnboardingSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="mt-5"
    >
      <Box>
        <Label.Root
          className="text-[13px] font-medium leading-[35px]"
          htmlFor="password"
        >
          Password
        </Label.Root>
        <TextField.Root className="rounded-xl">
          <TextField.Input
            id="password"
            placeholder="Your Password"
            radius="full"
            className="placeholder:text-sm !text-sm"
            size={"3"}
            {...register("password")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
      </Box>
      <Box>
        <Label.Root
          className="text-[13px] font-medium leading-[35px]"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </Label.Root>
        <TextField.Root className="rounded-xl">
          <TextField.Input
            id="confirmPassword"
            placeholder="Confirm your Password"
            radius="full"
            className="placeholder:text-sm !text-sm"
            size={"3"}
            {...register("confirmPassword")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
      </Box>
      <Box className="mt-5">
        <Button
          onClick={handleNext}
          size={"3"}
          className="w-full p-2 rounded-full text-white bg-fuchsia-600 hover:bg-fuchsia-700 !cursor-pointer"
        >
          Submit
        </Button>
      </Box>
    </motion.div>
  );
};
