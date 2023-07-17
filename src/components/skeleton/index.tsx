import { Skeleton } from "../ui/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";

export const SkeletonTableList = () => {
  const rowlengths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const colLengths = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="border rounded-md border-border">
      <Table>
        <TableHeader>
          <TableRow>
            {colLengths.map((index) => (
              <TableHead key={index}>
                <Skeleton className="h-4 bg-slate-200" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rowlengths.map((index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 bg-slate-200" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 bg-slate-200" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 bg-slate-200" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 bg-slate-200" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 bg-slate-200" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 bg-slate-200" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 bg-slate-200" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
