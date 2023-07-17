import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn("container 2xl:container my-6", className)}>
      {children}
    </div>
  );
};

export default Container;
