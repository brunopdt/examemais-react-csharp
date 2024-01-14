import { useCallback, useState } from "react";
import { loginService } from "../service/login";
import { ZodError, ZodIssueBase } from "zod";
import Swal from "sweetalert2";
import { loginSchema } from "../validation/login";

export interface ILoginFormValues {
  email: string;
  password: string;
  stayConnected: boolean;
}

export interface ILoginFormErrors {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { callLoginApi } = loginService();
  const [loginFormErrors, setLoginFormErrors] = useState<ILoginFormErrors>({
    email: "",
    password: "",
  });
  const [loginFormValues, setLoginFormValues] = useState<ILoginFormValues>({
    email: "",
    password: "",
    stayConnected: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoginFormChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value, checked } = event.target;
      setLoginFormValues({
        ...loginFormValues,
        [name]: name === "stayConnected" ? checked : value,
      });

      setLoginFormErrors({
        ...loginFormErrors,
        [name]: "",
      });
    },
    [loginFormValues]
  );

  const handleLoginFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      setIsLoading(true);

      await loginSchema.parse(loginFormValues)
      const response = await callLoginApi(loginFormValues);

      if (!response) {
        throw new Error('Não foi possível cadastrar sua conta')
      }

    } catch (error) {
      if (error instanceof ZodError) {
        const errors = JSON.parse(error.message);
        const updatedErrors = { ...loginFormErrors };

        errors.forEach((error: ZodIssueBase) => {
          const key = error.path[0] as keyof typeof loginFormErrors;
          updatedErrors[key] = error.message || "";
        });

        setLoginFormErrors(updatedErrors);
      }

      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Não foi possível cadastrar sua conta",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setIsLoading(false);
    }
    //colocar o navigate, e salvar informações no redux/local storage/cookies
  };

  const handleShowPasswordButtonClick = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return {
    loginFormValues,
    handleLoginFormChange,
    handleLoginFormSubmit,
    showPassword,
    handleShowPasswordButtonClick,
    isLoading,
    loginFormErrors
  };
};
