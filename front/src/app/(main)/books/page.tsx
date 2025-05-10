"use client";
import SpinerLoading from "@/components/layouts/SpinerLoading";
import RefetchButton from "@/components/ui/RefetchButton";
import Roles from "@/enums/roles";
import { useRole } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useBooks } from "@/hooks/useBooks";
import BookCard from "@/components/layouts/BookCard";

const page = () => {
  const router = useRouter();
  const {
		useBooks: {
			data: books,
			isLoading,
			isError,
			error,
			refetch,
		},
    createBook,
    updateBook,
    deleteBook,
    isMutating
  } = useBooks();
  const { data: role, isLoading: isRoleLoading } = useRole();
  const [newBookTitle, setNewBookTitle] = useState("");

  const handleCreateBook = async () => {
    if (!newBookTitle.trim()) return;
    createBook.mutate({ title: newBookTitle });
    setNewBookTitle("");
  };

  if (isLoading || isRoleLoading) {
    return <SpinerLoading />;
  }

  if (isError) {
    return <RefetchButton refetch={refetch} error={error} />;
  }

  return (
    <div className="flex flex-col w-full rounded-3xl h-full">
      <div className="flex justify-between pl-5 pr-3 py-0-5">
        <h1 className="text-2xl text-center font-bold pb-1">Книги</h1>
        {role === Roles.admin && (
          <div className="flex gap-2">
            <input
              type="text"
              value={newBookTitle}
              onChange={(e) => setNewBookTitle(e.target.value)}
              placeholder="Название книги"
              className="border-2 p-0-5 rounded-lg"
            />
            <button
              onClick={handleCreateBook}
              disabled={!newBookTitle.trim() || isMutating}
              className="rounded-4xl p-0-5 active-black hover:bg-brown"
            >
              + книгу
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 ml-2 pr-0-5 h-full overflow-y-scroll thin-scrollbar rounded-3xl">
        {books?.length ? (
          books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              role={role!}
              onUpdate={updateBook}
              onDelete={deleteBook}
              onRead={(id) => router.push(`books/${id}`)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">Книги не найдены</p>
        )}
      </div>
    </div>
  );
};

export default page;
