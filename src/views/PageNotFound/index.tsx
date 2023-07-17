import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-black text-[220px] leading-none text-slate-300">
          4<span className="text-foreground animate-pulse">0</span>4
        </h1>
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <p className="mb-4 font-medium text-slate-600">
          Make sure the address is correct and the page hasn't moved.
        </p>
        <Button size="lg" onClick={() => navigate("/")}>
          <ArrowLeft size={18} className="mr-2" />
          Go to Homepge
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
