import { FC } from "react";
import { User } from "../../api/User";
import "./UserView.css";

interface UserVieProps {
  user: User;
}

export const UserView: FC<UserVieProps> = ({ user }) => {
  const username = user.username;

  return (
    <div className="user-view">
      <div className="user-view__logo">
        {username.slice(0, 1).toUpperCase()}
      </div>
      <span className="user-view__name">{username}</span>
    </div>
  );
};
