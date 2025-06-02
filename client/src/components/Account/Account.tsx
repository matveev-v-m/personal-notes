import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../../api/User";
import { AuthForm } from "../AuthForm";
import { Loader } from "../Loader";
import { AccountPage } from "../AccountPage/AccountPage";

export const Account = () => {
  const meQuery = useQuery({
    queryFn: () => fetchMe(),
    queryKey: ["users", "me"],
    retry: false,
  });

  switch (meQuery.status) {
    case "pending":
      return <Loader />;

    case "error":
      return <AuthForm />;

    case "success":
      return <AccountPage user={meQuery.data} />;
  }
};
