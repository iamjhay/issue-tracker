import RegisterForm from "../_component/RegisterForm";

const page = () => {
  return (
    <div className="flex items-center justify-center pt-20">
      <div className="max-w-sm p-4 w-full shadow-sm border border-slate-300 rounded-md">
        <RegisterForm />
      </div>
    </div>
  );
};

export default page;
