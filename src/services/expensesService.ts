import { ExpensesResult } from "@/lib/schemas/expenses";
import { supabase } from "@/supabaseClient";

export const getAllExpenses = async () => {
  try {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data as ExpensesResult[];
  } catch (error) {
    console.log(error);
  }
};

export const getExpensesById = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as ExpensesResult;
  } catch (error) {
    console.log(error);
  }
};
