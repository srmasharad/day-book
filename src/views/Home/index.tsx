import { useState } from "react";

import { Loader, Plus, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Container, PageHeader } from "@/components/common";
import ErrorAlert from "@/components/common/ErrorAlrert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/AlertDialog";
import { Button } from "@/components/ui/Button";
import { ExpensesResult } from "@/lib/schemas/expenses";
import { getAllExpenses } from "@/services/expensesService";
import { supabase } from "@/supabaseClient";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import ExpensesTable from "./ExpensesTable";

const Home = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [rowId, setRowId] = useState<number | null>();

  // Get the list of all expenses from supabase
  const {
    data: expensesData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: () => getAllExpenses(),
  });

  // Delete the expenses list from the table
  const onDeleteExpenses = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", rowId);

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Deleted successfully.");
      setIsDeleting(false);
      setRowId(null);
      setDeleteModal(false);
      await queryClient.invalidateQueries(["expenses"]);
    } catch (error) {
      toast.error("Oops! Something went wrong");
      setIsDeleting(false);
    }
  };

  /**
   * Function for handling the delete action for a single item
   * @param id - The unique identifier of the item to be deleted (number)
   */
  const handleSingleDelete = (id: number) => {
    setDeleteModal(true); // Set the delete modal state to true to show the confirmation modal/dialog
    setRowId(id); // Set the row ID to the specified ID to identify the item to be deleted
  };

  // Function for handling the closing of the delete modal
  const handleCloseModal = () => {
    if (!isDeleting) {
      setDeleteModal(false); // Set the delete modal state to false to close the modal
      setRowId(null); // Reset the row ID to null
    }
  };

  if (isError) {
    return <ErrorAlert />;
  }

  return (
    <>
      <Container>
        <PageHeader className="mb-8" pageTitle="Expenses List">
          <Button className="h-auto" onClick={() => navigate("create")}>
            <Plus className="w-5 h-5 mr-2" /> Add New
          </Button>
        </PageHeader>

        <ExpensesTable
          data={expensesData as ExpensesResult[]}
          onDelete={handleSingleDelete}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </Container>

      <AlertDialog open={deleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              item and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={isDeleting ? undefined : handleCloseModal}
              disabled={isDeleting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={onDeleteExpenses} disabled={isDeleting}>
              {isDeleting ? (
                <Loader size={16} className="mr-2 animate-spin" />
              ) : (
                <Trash2 size={16} className="mr-2" />
              )}
              Yes! Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Home;
