import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/User";
import { queryClient } from "../../api/queryClient";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginForm = () => {
  const CreateLoginScheme = z.object({
    email: z
      .string()
      .email("E-mail должен содержать символ '@'")
      .min(5, "E-mail должен содержать не менее 5 символов"),
    password: z.string().min(8, "Пароль должен содержать не менее 8 символов"),
  });

  type CreateLogin = z.infer<typeof CreateLoginScheme>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLogin>({
    resolver: zodResolver(CreateLoginScheme),
  });

  const loginMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      login(data.email, data.password),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
    },
  });

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit(({ email, password }) => {
        loginMutation.mutate({ email, password });
      })}
    >
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input type="email" {...register("email")} />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input type="password" {...register("password")} />
      </FormField>

      {loginMutation.error && (
        <span
          style={{
            color: "red",
            opacity: 0.7,
            textAlign: "center",
          }}
        >
          {loginMutation.error.message}
        </span>
      )}
      <Button type="submit" isLoading={loginMutation.isPending}>
        Войти
      </Button>
    </form>
  );
};
