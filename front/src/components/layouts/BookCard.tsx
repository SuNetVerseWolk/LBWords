"use client";
import { useState, useRef, ChangeEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Book, UsersBooks } from "@/types/dbTypes";
import Roles from "@/enums/roles";
import { UseMutationResult } from "@tanstack/react-query";
import EmptyCover from "../../../public/placeholder.jpg";
import { MarkedBook } from "../svgs/MarkedBook";
import {
  useCreateUserBook,
  useToggleBookmark,
  useUpdateUserBook,
  useUserBook,
} from "@/hooks/useUserBooks";
import { useAuth } from "@/hooks/useAuth";

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
  const { user } = useAuth();
  const { data } = useUserBook(user!.id, book.id);
  const { mutate: CreateBookMark } = useCreateUserBook();
  const { mutate: toggleBookmark } = useToggleBookmark();

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
    <motion.div className="grid md:grid-cols-3 place-items-stretch bg-amber-50 p-1 rounded-3xl">
      <div className="c flex-col justify-end gap-0-5 row-end-3 md:row-end-1">
        <label className="cursor-pointer w-full">
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

      <div className="flex flex-col items-stretch ml-1 md:col-span-2 gap-0-5">
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
            <div className="c justify-between pr-1 mb-2">
              <h3 className="text-3xl md:text-lg font-medium">{book.title}</h3>
              <div
                className={`p-0-5 rounded cp ${
                  data?.is_book_marked ? "bg-gray-600" : ""
                }`}
                onClick={() =>
                  data
                    ? toggleBookmark(data?.id!)
                    : CreateBookMark({
                        book: book.id,
                        user: user?.id!,
                      })
                }
              >
                <MarkedBook
                  className={`w-9 md:w-2 ${
                    data?.is_book_marked
                      ? "fill-gold"
                      : "fill-black hover:fill-dark-gold"
                  }`}
                />
              </div>
            </div>
            <p className="text-gray-700 text-justify border-r-2 pr-0-5 rounded-br-sm hidden md:block">
              {book.description}
            </p>
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
