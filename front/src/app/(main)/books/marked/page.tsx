"use client";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useBooks } from "@/hooks/useBooks";
import { useUserBooks } from "@/hooks/useUserBooks";
import SpinerLoading from "@/components/layouts/SpinerLoading";
import RefetchButton from "@/components/ui/RefetchButton";
import BookCard from "@/components/layouts/BookCard";
import { useRouter } from "next/navigation";

const FavoritesPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const {
    booksQuery: {
      data: allBooks,
      isLoading: isBooksLoading,
      isError: isBooksError,
      error: booksError,
      refetch,
    },
		updateBook,
		deleteBook
  } = useBooks();

  const {
    data: userBooks,
    isLoading: isUserBooksLoading,
    isError: isUserBooksError,
    error: userBooksError,
  } = useUserBooks(user?.id!);

  const isLoading = isBooksLoading || isUserBooksLoading;
  const isError = isBooksError || isUserBooksError;
  const error = booksError || userBooksError;

  // Get IDs of marked books
  const markedBookIds =
    userBooks?.filter((book) => book.is_book_marked).map((book) => book.book) ||
    [];

  // Filter books that are marked
  const markedBooks =
    allBooks?.filter((book) => markedBookIds.includes(book.id)) || [];

  return (
    <div className="flex flex-col w-full rounded-3xl h-full">
      <div className="c justify-between pl-5 pr-3 py-0-5 pb-1">
        <h1 className="text-2xl text-center font-bold">Избранные книги</h1>
      </div>

      <div className="flex flex-col gap-1 ml-2 pr-0-5 h-full overflow-y-scroll thin-scrollbar rounded-3xl">
        {isLoading ? (
          <SpinerLoading />
        ) : isError ? (
          <RefetchButton refetch={refetch} error={error} />
        ) : markedBooks?.length ? (
          markedBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onRead={(id) => router.push(`/books/${id}`)}
							onDelete={deleteBook}
							onUpdate={updateBook}
							role="user"
            />
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            {user
              ? "Нет избранных книг"
              : "Авторизуйтесь для просмотра избранного"}
          </p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
