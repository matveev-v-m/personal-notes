import { FC } from "react";
import { User } from "../../api/User";
import { LogoutButton } from "../LogoutButton";
import { NoteForm } from "../NoteForm";
import { UserView } from "../UserView";
import { NotesListView } from "../NotesListView";
import "./AccountPage.css";
import { useNoteList } from "../../api/Note";
import { Loader } from "../Loader";

interface UserVieProps {
  user: User;
}

export const AccountPage: FC<UserVieProps> = ({ user }) => {
  const noteListQuery = useNoteList();

  switch (noteListQuery.status) {
    case "pending":
      return <Loader />;
    case "success":
      return (
        <>
          <UserView user={user} />
          <div className="Note-wrap">
            <NoteForm />
            <NotesListView noteList={noteListQuery.data?.list} user={user} />
          </div>
          <LogoutButton />
        </>
      );
    case "error":
      return (
        <div>
          <span>Произошла ошибка</span>
          <button onClick={() => noteListQuery.refetch()}>
            Повторить запрос
          </button>
        </div>
      );
  }
};
