import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { Button } from "../Button";
import "./LogoutButton.css";

export const LogoutButton = () => {
  const logout = (): Promise<Response> => {
    return fetch("/api/logout", {
      method: "POST",
    });
  };

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
    },
  });

  return (
    <div onClick={() => logoutMutation.mutate()} className="logout-button">
      <Button kind="secondary" isLoading={logoutMutation.isPending}>
        Выйти
      </Button>
    </div>
  );
};
