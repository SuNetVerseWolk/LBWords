"use client";
import { useState, useRef, ChangeEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Book } from "@/types/dbTypes";
import Roles from "@/enums/roles";
import { UseMutationResult } from "@tanstack/react-query";
import EmptyCover from "../../../public/placeholder.jpg";

type BookUpdateData = {
  id: string;
  data: Partial<Book>;
  coverImage?: File;
};

const BookCard = ({
  book,
  role,
  onUpdate,
  onDelete,
  onRead,
}: {
  book: Book;
  role?: keyof typeof Roles;
  onUpdate: UseMutationResult<
    Book,
    Error,
    {
      id: string;
      data: Partial<Book>;
      image?: File;
    },
    unknown
  >;
  onDelete: UseMutationResult<void, Error, string, unknown>;
  onRead: (id: string) => void;
}) => {
  const [editableBook, setEditableBook] = useState<Partial<Book>>({
    title: book.title,
    description: book.description,
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof Book, value: string) => {
    setEditableBook((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleUpdate = () => {
    onUpdate.mutate({
      id: book.id,
      data: editableBook,
      image: coverImage || undefined,
    });
    setCoverImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const imageSrc = coverImage
    ? URL.createObjectURL(coverImage)
    : book.image || EmptyCover.src;

  return (
    <motion.div className="grid grid-cols-3 place-items-stretch bg-amber-50 p-1 rounded-3xl">
      <div className="flex flex-col gap-0-5">
        <label className="cursor-pointer">
          <Image
            src={imageSrc}
            alt="Book cover"
            width={500}
            height={500}
            className={`w-full rounded-tl-md ${
              role === Roles.admin ? "hover:opacity-80" : ""
            }`}
          />
          {role === Roles.admin && (
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          )}
        </label>
        <button
          className="rounded-b-xl w-full p-0-5 pl-3 pr-1-5 lg:pl-1-5 lg:pr-1 active-black hover:bg-brown transition-colors"
          onClick={() => onRead(book.id)}
        >
          Читать
        </button>
      </div>

      <div className="flex flex-col items-stretch ml-1 col-span-2 gap-0-5">
        {role === Roles.admin ? (
          <>
            <input
              type="text"
              value={editableBook.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              className="border-2 text-lg font-medium p-0-5 rounded-tr-xl focus:outline-none"
            />
            <textarea
              value={editableBook.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              className="h-full pr-0-5 text-justify border-l-2 pl-0-5 focus:outline-none"
              rows={4}
            />
          </>
        ) : (
          <>
            <h3 className="text-lg font-medium">{book.title}</h3>
            <p className="text-gray-700">{book.description}</p>
          </>
        )}
      </div>

      {role === Roles.admin && (
        <div className="flex gap-1 col-span-3 mt-1">
          <button
            className="bg-brown-dark text-cat-beige-light hover:bg-brown rounded-4xl transition-colors text-sm sm:text-base text-nowrap py-0-5 px-4 w-1/2 disabled:opacity-50"
            onClick={handleUpdate}
            disabled={onUpdate.isPending}
          >
            {onUpdate.isPending ? "Сохранение..." : "Сохранить"}
          </button>
          <motion.button
            whileHover={{ backgroundColor: "#fda4af" }} // cat-coral-light
            className="bg-brown-dark text-cat-beige-light rounded-4xl transition-colors text-sm sm:text-base text-nowrap py-0-5 px-4 w-1/2 disabled:opacity-50"
            onClick={() => onDelete.mutate(book.id)}
            disabled={onDelete.isPending}
          >
            {onDelete.isPending ? "Удаление..." : "Удалить"}
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default BookCard;
