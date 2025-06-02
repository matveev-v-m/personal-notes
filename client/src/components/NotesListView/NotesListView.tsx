import "./NotesListView.css";
import { NoteView } from "../NoteView";
import { NoteList } from "../../api/Note";
import { FC } from "react";
import { User } from "../../api/User";

interface NotesListViewProps {
  noteList: NoteList;
  user: User;
}

export const NotesListView: FC<NotesListViewProps> = ({ noteList, user }) => {
  console.log(noteList);
  return (
    noteList.filter((data) => data.userId === user.id).length > 0 && (
      <ul className="note-list-view">
        {noteList
          .filter((data) => data.userId === user.id)
          .map((item) => (
            <li key={item.id}>
              <NoteView note={item} />
            </li>
          ))}
      </ul>
    )
  );
};
