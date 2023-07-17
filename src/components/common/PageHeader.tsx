import { ReactNode } from "react";

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { BreadCrumbProps } from "@/types/Breadcrumb";

import { Button } from "../ui/Button";
import BreadCrumb from "./BreadCrumb";

interface PageHeaderProps {
  pageTitle: ReactNode;
  items?: BreadCrumbProps["items"];
  children?: ReactNode;
  className?: string;
  isBack?: boolean;
}

const PageHeader = ({
  pageTitle,
  children,
  className,
  items,
  isBack,
}: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
      {isBack && (
        <div className="flex justify-start mb-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="items-center justify-center flex-none w-10 h-10 p-2 rounded-full"
          >
            <ArrowLeft size={18} />
          </Button>
        </div>
      )}

      <div className={cn("flex items-center justify-between gap-2", className)}>
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-medium">{pageTitle}</h1>
          {items && <BreadCrumb items={items} />}
        </div>

        {children}
      </div>
    </>
  );
};

export default PageHeader;
