import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import EmptyData from "@/components/common/EmptyData";
import { SkeletonTableList } from "@/components/skeleton";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { ExpensesResult } from "@/lib/schemas/expenses";
import { cn, formatDate } from "@/lib/utils";

interface ExpensesTableProps {
  data: ExpensesResult[];
  className?: string;
  onDelete: (id: number) => void;
  isLoading: boolean;
  isSuccess: boolean;
}

const ExpensesTable = ({
  data,
  className,
  onDelete,
  isLoading,
  isSuccess,
}: ExpensesTableProps) => {
  const navigate = useNavigate();

  // Calculate the grand total from the expense data
  const grandTotal =
    data && data.reduce((total, curr) => total + curr.total, 0);

  return (
    <>
      {isLoading && <SkeletonTableList />}

      {isSuccess && data.length >= 1 && (
        <>
          <div className="flex items-center justify-end mb-4">
            <span className="font-medium">Grand Total: ${grandTotal}</span>
          </div>
          <div className={cn("border rounded-md border-border", className)}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Total Amt.</TableHead>
                  <TableHead>&nbsp;</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data &&
                  data.map((value: ExpensesResult) => (
                    <TableRow key={value.id}>
                      <TableCell className="font-medium">
                        {formatDate(new Date(value.date))}
                      </TableCell>
                      <TableCell className="font-medium">
                        {value.name}
                      </TableCell>
                      <TableCell className="font-medium">
                        {value.category}
                      </TableCell>
                      <TableCell>{value.quantity}</TableCell>
                      <TableCell>${value.amount}</TableCell>
                      <TableCell>${value.total}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="flex items-center justify-center p-0 rounded-full w-7 h-7"
                            onClick={() => onDelete(value.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="flex items-center justify-center p-0 rounded-full w-7 h-7"
                            onClick={() => navigate(`/${value.id}/edit`)}
                          >
                            <Pencil size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {data && data.length < 1 && <EmptyData />}
    </>
  );
};

export default ExpensesTable;
