import { Route, Routes } from "react-router-dom";

import Home from "@/views/Home";
import AddExpenses from "@/views/Home/AddExpenses";
import PageNotFound from "@/views/PageNotFound";

const BaseRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path=":expId/edit" element={<AddExpenses />} />
      <Route path="create" element={<AddExpenses />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default BaseRouter;
