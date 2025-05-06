"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Book } from "@/types/dbTypes";
import Roles from "@/enums/roles";
import { UseMutationResult } from "@tanstack/react-query";

const BookCard = ({
  book,
  role,
  onUpdate,
  onDelete,
  onRead
}: {
  book: Book;
  role?: keyof typeof Roles;
  onUpdate: UseMutationResult<any, Error, {
    id: string;
    data: Partial<Book>;
}, unknown>;
  onDelete: UseMutationResult<void, Error, string, unknown>;
  onRead: (id: string) => void;
}) => {
  const [editableBook, setEditableBook] = useState<Partial<Book>>({
    title: book.title,
    description: book.description
  });

  const handleChange = (field: keyof Book, value: string) => {
    setEditableBook(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid grid-cols-3 gap-y-1 place-items-stretch bg-amber-50 p-1 rounded-3xl">
      <div className="c flex-col gap-0-5">
        <Image
          src={book.image!}
          alt="Book's image"
          width={500}
          height={500}
          className={`w-full bg-black rounded-tl-md ${role === Roles.admin ? "cp" : ""}`}
        />
        <button
          className="rounded-b-xl w-full p-0-5 pl-3 pr-1-5 lg:pl-1-5 lg:pr-1 active-black hover:bg-brown cp"
          onClick={() => onRead(book.id)}
        >
          Читать
        </button>
      </div>

      <div className="c flex-col items-stretch ml-1 col-span-2 gap-0-5">
        {role === Roles.admin ? (
          <>
            <input
              type="text"
              value={editableBook.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              className="border-2 text-lg font-medium p-0-5 rounded-tr-xl"
            />
            <textarea
              value={editableBook.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              className="h-full pr-0-5 text-justify"
            />
          </>
        ) : (
          <>
            <h3 className="text-lg font-medium">{book.title}</h3>
            <p>{book.description}</p>
          </>
        )}
      </div>

      {role === Roles.admin && (
        <div className="c gap-1 col-span-3">
          <button
            className="bg-brown-dark text-cat-beige-light hover:bg-brown rounded-4xl cp text-sm sm:text-base text-nowrap py-0-5 px-4 w-1/2"
            onClick={() => onUpdate.mutate({ id: book.id, data: editableBook })}
          >
            Сохранить
          </button>
          <motion.button
            whileHover={{ background: "var(--color-cat-coral-light)" }}
            className="bg-brown-dark text-cat-beige-light rounded-4xl cp text-sm sm:text-base text-nowrap py-0-5 px-4 w-1/2"
            onClick={() => onDelete.mutate(book.id)}
          >
            Удалить
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default BookCard;
