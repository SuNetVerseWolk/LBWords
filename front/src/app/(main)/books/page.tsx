"use client";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { useBooks } from "@/hooks/useBooks";
import { useRole } from "@/hooks/useAuth";
import Roles from "@/enums/roles";
import BookCard from "@/components/layouts/BookCard";
import RefetchButton from "@/components/ui/RefetchButton";
import SpinerLoading from "@/components/layouts/SpinerLoading";

const BooksPage = () => {
  const router = useRouter();
  const {
    booksQuery: {
      data: books,
      isLoading,
      isError,
      error,
      refetch,
    },
		updateBook,
		deleteBook,
    createBook,
    isMutating,
  } = useBooks();
  
  const { data: role, isLoading: isRoleLoading } = useRole();
  const [newBookTitle, setNewBookTitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateBook = async () => {
    if (!newBookTitle.trim()) return;

    createBook.mutate({ 
      title: newBookTitle
    });
    
    setNewBookTitle("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (isLoading || isRoleLoading) {
    return <SpinerLoading />;
  }

  if (isError) {
    return <RefetchButton refetch={refetch} error={error} />;
  }

  return (
    <div className="flex flex-col w-full rounded-3xl h-full">
      <div className="c justify-between pl-5 pr-3 py-0-5 pb-1">
        <h1 className="text-2xl text-center font-bold">Книги</h1>
        {role === Roles.admin && (
          <div className="flex gap-2 items-center">
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

      <div className="flex flex-col gap-1 ml-2 pr-2 md:pr-0-5 h-full overflow-y-scroll thin-scrollbar rounded-3xl">
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

export default BooksPage;