import { twMerge } from "tailwind-merge";

export default function Button({ children, className, type, ...props }: any) {
  const merged = twMerge(
    "mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none",
    className
  );
  return (
    <button {...props} className={merged} type={type}>
      {children}
    </button>
  );
}
