import { useState, useCallback, ChangeEvent } from "react";

interface UseFormReturn<T> {
  values: T;
  handleChange: (field: keyof T) => (e: ChangeEvent<HTMLInputElement>) => void;
  setValue: (field: keyof T, value: any) => void;
  resetForm: () => void;
}

export const useForm = <T extends Record<string, any>>(
  initialValues: T
): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = useCallback(
    (field: keyof T) => (e: ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    },
    []
  );

  const setValue = useCallback((field: keyof T, value: any) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  return {
    values,
    handleChange,
    setValue,
    resetForm,
  };
};
