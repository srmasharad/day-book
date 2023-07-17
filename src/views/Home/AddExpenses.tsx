import { useCallback, useState } from "react";

import { Loader, MoveLeft } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import {
  Container,
  Datepicker,
  InputField,
  PageHeader,
  SelectField,
  TextareaField,
} from "@/components/common";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { useCustomDatePicker } from "@/hooks/useCustomDatePicker";
import { categoryOptions } from "@/lib/options";
import { formatDate } from "@/lib/utils";
import {
  expensesSchema,
  ExpensesSchemaType,
} from "@/lib/validation/addExpenses";
import { getExpensesById } from "@/services/expensesService";
import { supabase } from "@/supabaseClient";
import { BreadCrumbProps } from "@/types/Breadcrumb";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

const breadCrumbItems: BreadCrumbProps["items"] = [
  {
    path: "/create",
    name: "Create",
    isCurrent: true,
  },
];

const AddExpenses = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { expId } = useParams();
  const navigate = useNavigate();

  // Fetch expense data by ID
  const { data: expData } = useQuery({
    enabled: !!expId,
    queryKey: ["expenses", expId],
    queryFn: async () => await getExpensesById(Number(expId)),
  });

  // Initialize React Hook Form with specific configuration options
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<FieldValues, ExpensesSchemaType>({
    resolver: zodResolver(expensesSchema),
    defaultValues: {
      name: expId ? expData && expData.name : "",
      category: expId ? expData && expData.category : "",
      quantity: expId ? expData && expData.quantity : "",
      amount: expId ? expData && expData.amount : "",
      total: expId ? expData && expData.total : "",
      note: expId ? expData && expData.note : "",
      date: expId ? expData && new Date(expData.date) : new Date(),
    },
  });

  const category = watch("category") as string;
  const date = watch("date") as Date;

  /**
   * Custom callback function to set form field value using React Hook Form's setValue
   * @param id - The ID of the form field to set the value for (string)
   * @param value - The value to set for the form field (any)
   */
  const setCustomValue = useCallback(
    (id: string, value: any) => {
      setValue(id, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [setValue]
  );

  // `useCustomDatePicker` to initialize custom date picker functionality
  const { customDate, setCustomDate, onCustomDateChange } = useCustomDatePicker(
    "date",
    setCustomValue,
    expId
      ? expData && formatDate(new Date(expData.date))
      : formatDate(new Date())
  );

  // Function for creating expenses
  const createExpenses = async (data: FieldValues) => {
    setIsLoading(true);

    try {
      const { data: expData, error } = await supabase
        .from("expenses")
        .insert(data)
        .select();

      if (error) {
        throw error;
      }

      if (expData) {
        toast.success("Created successfully.");
        reset();
        setIsLoading(false);
        setCustomDate(formatDate(new Date()));
        navigate("/");
      }
    } catch (error) {
      toast.error("Oops! Something went wrong");
      setIsLoading(false);
    }
  };

  // Function for updating expenses
  const updateExpenses = async (data: FieldValues) => {
    setIsLoading(true);

    try {
      const { data: expData, error } = await supabase
        .from("expenses")
        .update(data)
        .eq("id", expId)
        .select();

      if (error) {
        throw error;
      }

      if (expData) {
        toast.success("Updated successfully.");
        reset();
        setIsLoading(false);
        setCustomDate(formatDate(new Date()));
        navigate("/");
      }
    } catch (error) {
      toast.error("Oops! Something went wrong");
      setIsLoading(false);
    }
  };

  // Form submission handler function
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    return expId ? await updateExpenses(data) : await createExpenses(data);
  };

  return (
    <>
      <Container className="pb-20">
        <PageHeader
          className="mb-4"
          pageTitle="Add Expenses"
          items={breadCrumbItems}
          isBack
        />
        <Separator className="mb-6" />

        <div className="grid items-start max-w-xl gap-6 mx-auto mb-6">
          <div className="flex flex-col gap-2 mb-2">
            <h2 className="text-base font-medium">
              Enter the details of your expenses below to track your spending
              and manage your budget efficiently.
            </h2>
          </div>

          <InputField
            type="text"
            id="name"
            label="Name"
            placeholder="Enter expenses name"
            register={register}
            errors={errors}
            required
          />

          <SelectField
            id="category"
            label="Category"
            value={category}
            defaultValue={expId ? expData && expData.category : undefined}
            onChange={(value) => setCustomValue("category", value)}
            options={categoryOptions}
            register={register}
            errors={errors}
            placeHolder="Choose Category"
            required
          />
          <InputField
            type="text"
            id="quantity"
            label="Quantity"
            placeholder="Enter quantity"
            register={register}
            errors={errors}
            required
          />

          <InputField
            type="text"
            id="amount"
            label="Amount"
            placeholder="Enter amount"
            register={register}
            errors={errors}
            required
          />

          <InputField
            type="text"
            id="total"
            label="Total"
            placeholder="Enter total"
            register={register}
            errors={errors}
            required
          />

          <Datepicker
            label="Date"
            onSetDate={(value) => setCustomValue("date", value)}
            date={date}
            id="date"
            register={register}
            errors={errors}
            customDate={customDate as string}
            setCustomDate={setCustomDate}
            onCustomDateChange={onCustomDateChange}
            required
          />

          <TextareaField
            id="note"
            label="Note"
            register={register}
            errors={errors}
            placeholder="Write your note here"
          />
          <div className="flex items-center justify-start">
            <Button
              className="min-w-[120px] mr-4"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              <MoveLeft
                size={20}
                strokeWidth={1.75}
                className="mr-2.5 text-muted-foreground"
              />{" "}
              Back
            </Button>
            <Button
              className="min-w-[120px]"
              disabled={isLoading}
              onClick={handleSubmit(onSubmit) as SubmitHandler<FieldValues>}
            >
              {isLoading && <Loader size={16} className="mr-2 animate-spin" />}
              Create
            </Button>
          </div>
        </div>
      </Container>

      {/* React Hook Form Devtool only rendered on development environment to debug the form fields */}
      <DevTool control={control} />
    </>
  );
};

export default AddExpenses;
