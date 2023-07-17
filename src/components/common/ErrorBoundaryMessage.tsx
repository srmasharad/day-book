import { ReactNode } from "react";

interface ErrorBoundaryMessageProps {
  statusCode: string;
  title: ReactNode;
  children: ReactNode;
}

const ErrorBoundaryMessage = ({
  statusCode,
  title,
  children,
}: ErrorBoundaryMessageProps) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-black text-[220px] leading-none text-slate-300">
          {statusCode.slice(0, 1)}
          <span className="text-foreground animate-pulse">
            {statusCode.slice(1, 2)}
          </span>
          {statusCode.slice(2, 3)}
        </h1>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mb-4 font-medium text-slate-600">{children}</p>
      </div>
    </div>
  );
};

export default ErrorBoundaryMessage;
