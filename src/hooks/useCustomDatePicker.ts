import { ChangeEvent, useCallback, useState } from "react";

import { isValid, parse } from "date-fns";

/**
 * `useCustomDatePicker` is a date picker component with custom functionality
 * @param name - The name of the date picker field (string)
 * @param setCustomValue - A function to set the custom value for the form field (function)
 * @param defaultValue  - The default value for the date picker (optional, string)
 * @returns
 * `customDate` - The current custom date value (string)
 * `setCustomDate` - A function to set the custom date value (function)
 * `onCustomDateChange`: A function to handle the change event of the custom date picker (function)
 */
export const useCustomDatePicker = (
  name: string,
  setCustomValue: (id: string, value: any) => void,
  defaultValue?: string
) => {
  const [customDate, setCustomDate] = useState(defaultValue);

  // Callback function for handling the change event of the custom date picker
  const onCustomDateChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCustomDate(event.currentTarget.value); // Update the custom date state with the entered value
      const isDate = parse(event.currentTarget.value, "PP", new Date()); // Parse the entered value as a date using date-fns
      if (isValid(isDate)) {
        setCustomValue(name, isDate); // Set the custom value using the provided name and parsed date
      } else {
        setCustomValue(name, undefined); // Set the custom value to undefined if the parsed date is invalid
      }
    },
    [setCustomValue, name] // Dependencies: setCustomValue and name
  );

  return { customDate, setCustomDate, onCustomDateChange };
};
