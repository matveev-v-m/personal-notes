import { z } from "zod";
import { validateResponse } from "./validateResponse";
// import React from "react";
import { useQuery } from "@tanstack/react-query";

export const NoteSchema = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  userId: z.string(),
  createdAt: z.number(),
});

export type Note = z.infer<typeof NoteSchema>;

export const NoteListSchema = z.array(NoteSchema);

export type NoteList = z.infer<typeof NoteListSchema>;

export const FetchNoteListResponseScheme = z.object({
  list: NoteListSchema,
  pageCount: z.number(),
});

export type FetchNoteListResponse = z.infer<typeof FetchNoteListResponseScheme>;

export const fetchNoteList = () => {
  return fetch("/api/notes")
    .then((response) => response.json())
    .then((data) => FetchNoteListResponseScheme.parse(data));
};

export const useNoteList = () => {
  const noteListQuery = useQuery({
    queryFn: () => fetchNoteList(),
    queryKey: ["notes"],
  });

  return noteListQuery;
};

export const createNote = (title: string, text: string): Promise<void> => {
  return fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, text }),
  })
    .then(validateResponse)
    .then(() => undefined);
};
