import React from "react";
import { useForm, Resolver } from "react-hook-form";

import "./styles.css";

type FormValues = {
  step1: string;
  step2: string;
  step3: string;
};

type ResolverContext = { step: number; submitter: string };

const resolver: Resolver<FormValues> = async (data, context) => {
  console.log("Data", data);
  const ctx: ResolverContext = (context as any).current;
  console.log("Context", ctx);

  if (ctx.step === 2) {
    if (!data.step2) {
      const result = {
        values: {},
        errors: { step2: { type: "required", message: "Step 2 is required" } },
      };

      return result;
    }
  }

  return { values: data, errors: {} };
};

export default function App() {
  const [step, setStep] = React.useState(1);
  const context = React.useRef({ step, submitter: "" });
  const { register, handleSubmit } = useForm<FormValues>({
    resolver,
    context,
  });

  const onSubmit = (e: React.FormEvent) => {
    const submitter = context.current.submitter;
    const doHandleSubmit = handleSubmit(
      // onValid callback
      (data) => {
        const newStep = submitter === "prev" ? step - 1 : step + 1;

        if (newStep > 3) {
          alert(JSON.stringify(data));
        } else {
          setStep(newStep);
          context.current.step = newStep;
        }
      },

      // onInvalid callback
      () => {}
    );
    doHandleSubmit(e);
  };

  return (
    <div className="App">
      <h1>React Hook Form - Resolver</h1>
      <form onSubmit={onSubmit}>
        <input
          style={{ display: step === 1 ? "block" : "none" }}
          placeholder="Step 1"
          name="step1"
          ref={register()}
        />

        <input
          style={{ display: step === 2 ? "block" : "none" }}
          placeholder="Step 2"
          name="step2"
          ref={register()}
        />

        <input
          style={{ display: step === 3 ? "block" : "none" }}
          placeholder="Step 3"
          name="step3"
          ref={register()}
        />
        <button
          onClick={() => (context.current.submitter = "prev")}
          disabled={step === 1}
          type="submit"
        >
          Prev
        </button>
        <button
          onClick={(e) => (context.current.submitter = "next")}
          type="submit"
        >
          {step === 3 ? "Submit" : "Next"}
        </button>
      </form>
    </div>
  );
}
