"use client";
import SpinerLoading from "@/components/layouts/SpinerLoading";
import { MarkedBook } from "@/components/svgs/MarkedBook";
import DefinitionPopup from "@/components/ui/DefinitionPopup";
import RefetchButton from "@/components/ui/RefetchButton";
import Roles from "@/enums/roles";
import { useAuth, useRole } from "@/hooks/useAuth";
import { useBooks } from "@/hooks/useBooks";
import {
  useUserBook,
  useCreateUserBook,
  useToggleBookmark,
} from "@/hooks/useUserBooks";
import { Chapter } from "@/types/dbTypes";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const BookPage = () => {
  const [localChapters, setLocalChapters] = useState<Chapter[]>([]);
  const { id } = useParams();
  const {
    bookQuery: { data: book, isLoading, isError, refetch, error },
    updateBook,
    isMutating,
  } = useBooks(id as string);
  const { data: role, isLoading: isRoleLoading } = useRole();

  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [selectedText, setSelectedText] = useState<string>("");
  const [popupPosition, setPopupPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const [mutations, setMutations] = useState({
    isDeleteChapter: false,
    isAddChapter: false,
    isAddParagraph: false,
  });

  const { user } = useAuth();
  const { data } = useUserBook(user!?.id, id as string);
  const { mutate: CreateBookMark } = useCreateUserBook();
  const { mutate: toggleBookmark } = useToggleBookmark();

  const handleTextSelection = useCallback(() => {
    setPopupPosition(null);
    const selection = window.getSelection();
    if (!selection?.toString().trim()) return;

    const newText = selection.toString().trim();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    setSelectedText(newText);
    setPopupPosition((prev) =>
      prev?.top === rect.top && prev?.left === rect.left
        ? prev
        : { top: rect.top + window.scrollY + 20, left: rect.left }
    );
  }, []);

  const generateChapterId = () => Date.now();

  const handleUpdateChapterName = (newName: string) => {
    setLocalChapters((prev) => {
      const updated = [...prev];
      updated[selectedChapterIndex] = {
        ...updated[selectedChapterIndex],
        name: newName,
      };
      return updated;
    });
  };

  const handleUpdateParagraph = (paragraphIndex: number, newValue: string) => {
    setLocalChapters((prev) => {
      const updated = [...prev];
      updated[selectedChapterIndex] = {
        ...updated[selectedChapterIndex],
        values: updated[selectedChapterIndex].values.map((v, i) =>
          i === paragraphIndex ? newValue : v
        ),
      };
      return updated;
    });
  };

  const handleAddParagraph = (chapterId: number) => {
    const chapterIndex = localChapters.findIndex((c) => c.id === chapterId);
    if (chapterIndex === -1) return;

    const updatedChapters = [...localChapters];
    updatedChapters[chapterIndex] = {
      ...updatedChapters[chapterIndex],
      values: [...updatedChapters[chapterIndex].values, ""],
    };

    setLocalChapters(updatedChapters);
    updateBook.mutate({
      id: id as string,
      data: { ...book!, chapters: updatedChapters },
    });
    setMutations((prev) => ({ ...prev, isAddParagraph: true }));
  };

  const handleAddChapter = () => {
    const newChapter = {
      id: generateChapterId(),
      name: `Chapter ${localChapters.length + 1}`,
      image: null,
      values: [],
    };

    const updatedChapters = [...localChapters, newChapter];
    setLocalChapters(updatedChapters);
    setSelectedChapterIndex(updatedChapters.length - 1);

    updateBook.mutate({
      id: id as string,
      data: { ...book!, chapters: updatedChapters },
    });
    setMutations((prev) => ({ ...prev, isAddChapter: true }));
  };

  const handleDeleteParagraph = (chapterId: number, paragraphIndex: number) => {
    const chapterIndex = localChapters.findIndex((c) => c.id === chapterId);
    if (chapterIndex === -1) return;

    const updatedChapters = [...localChapters];
    updatedChapters[chapterIndex] = {
      ...updatedChapters[chapterIndex],
      values: updatedChapters[chapterIndex].values.filter(
        (_, i) => i !== paragraphIndex
      ),
    };

    setLocalChapters(updatedChapters);
    updateBook.mutate({
      id: id as string,
      data: { ...book!, chapters: updatedChapters },
    });
  };

  const handleNextChapter = () => {
    if (!book?.chapters || selectedChapterIndex >= book.chapters.length - 1)
      return;
    setSelectedChapterIndex((prev) => prev + 1);
  };

  const handlePrevChapter = () => {
    if (selectedChapterIndex <= 0) return;
    setSelectedChapterIndex((prev) => prev - 1);
  };

  const handleDeleteChapter = (chapterId: number) => {
    const updatedChapters = localChapters.filter((c) => c.id !== chapterId);
    const newSelectedIndex = Math.min(
      selectedChapterIndex,
      updatedChapters.length - 1
    );

    setLocalChapters(updatedChapters);
    setSelectedChapterIndex(newSelectedIndex);

    updateBook.mutate({
      id: id as string,
      data: { ...book!, chapters: updatedChapters },
    });
    setMutations((prev) => ({ ...prev, isDeleteChapter: true }));
  };

  useEffect(() => {
    if (isMutating == false) {
      setMutations({
        isAddChapter: false,
        isAddParagraph: false,
        isDeleteChapter: false,
      });
    }
  }, [isMutating]);

  useEffect(() => {
    if (book?.chapters) {
      setLocalChapters(book.chapters);
    }
  }, [book?.chapters]);

  if (isLoading || isRoleLoading) {
    return <SpinerLoading />;
  }

  if (isError) {
    return <RefetchButton refetch={refetch} error={error} />;
  }

  if (!book || !book.chapters || book.chapters.length === 0) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <button
          onClick={handleAddChapter}
          className="rounded-4xl p-0-5 active-black hover:bg-brown"
        >
          Create First Chapter
        </button>
      </div>
    );
  }

  const currentChapter = localChapters[selectedChapterIndex] || { values: [] };

  const handleParagraphBlur = (paragraphIndex: number) => {
    if (!book.chapters || !localChapters[selectedChapterIndex]) return;

    const originalValue =
      book.chapters[selectedChapterIndex]?.values[paragraphIndex];
    const currentValue =
      localChapters[selectedChapterIndex].values[paragraphIndex];

    if (currentValue !== originalValue) {
      updateBook.mutate({
        id: id as string,
        data: { ...book, chapters: localChapters },
      });
    }
  };

  const handleChapterNameBlur = () => {
    if (!book.chapters || !localChapters[selectedChapterIndex]) return;

    const originalName = book.chapters[selectedChapterIndex]?.name;
    const currentName = localChapters[selectedChapterIndex].name;

    if (currentName !== originalName) {
      updateBook.mutate({
        id: id as string,
        data: { ...book, chapters: localChapters },
      });
    }
  };

  return (
    <div className="w-full">
      <div key={currentChapter?.id} className="flex flex-col gap-1-5 h-full">
        {role === Roles.admin ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={currentChapter?.name}
              onChange={(e) => handleUpdateChapterName(e.target.value)}
              onBlur={handleChapterNameBlur}
              className="text-xl font-medium p-0-5 rounded-t-2xl rounded-b-xl border-2 flex-1"
            />
            <button
              onClick={() => handleDeleteChapter(currentChapter?.id)}
              className="bg-red-500 p-0-5 rounded-xl min-w-40 text-white"
              disabled={book.chapters.length <= 1}
            >
              {mutations.isDeleteChapter && isMutating
                ? "Удаляется ..."
                : "Удалить страницу"}
            </button>
          </div>
        ) : (
          <div className="c px-3">
            <h1 className="text-center text-xl font-medium w-full">
              {currentChapter?.name}
            </h1>
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
                className={`w-2 ${
                  data?.is_book_marked
                    ? "fill-gold"
                    : "fill-black hover:fill-dark-gold"
                }`}
              />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-1 pr-0-5 overflow-y-scroll thin-scrollbar h-full">
          {currentChapter?.values?.map((value, j) =>
            role === Roles.admin ? (
              <div key={j} className="flex">
                <textarea
                  value={value}
                  onChange={(e) => handleUpdateParagraph(j, e.target.value)}
                  onBlur={() => handleParagraphBlur(j)}
                  className="border-2 border-r-0 p-0-5 rounded-l-xl w-full"
                />
                <button
                  onClick={() => handleDeleteParagraph(currentChapter?.id, j)}
                  className="bg-red-500 p-0-5 rounded-r-xl border-2 border-l-0"
                >
                  X
                </button>
              </div>
            ) : (
              <p
                onMouseUp={handleTextSelection}
                key={j}
                className="text-gray-800 hover:text-black selection:text-white selection:bg-amber-800 text-justify"
              >
                {value}
              </p>
            )
          )}
        </div>
        <hr />
        <div className="flex justify-between px-1-5">
          <div>
            {selectedChapterIndex > 0 ? (
              <button
                onClick={handlePrevChapter}
                className="rounded-4xl p-0-5 active-black hover:bg-brown"
              >
                Предыдущая
              </button>
            ) : (
              <span />
            )}
            {role === Roles.admin && (
              <button
                onClick={() => handleAddParagraph(currentChapter?.id)}
                className="rounded-4xl p-0-5 active-black hover:bg-brown ml-2"
              >
                {mutations.isAddParagraph && isMutating ? "+ ..." : "+ абзац"}
              </button>
            )}
          </div>
          <div className="flex gap-1 items-center">
            <span className="font-medium">
              Страница {selectedChapterIndex + 1} из {book.chapters.length}
            </span>
            <button
              onClick={handleNextChapter}
              disabled={selectedChapterIndex >= book.chapters.length - 1}
              className="rounded-4xl p-0-5 active-black hover:bg-brown disabled:opacity-50"
            >
              следущая
            </button>
            {role === Roles.admin && (
              <button
                onClick={handleAddChapter}
                className="rounded-4xl p-0-5 active-black hover:bg-brown"
              >
                {mutations.isAddParagraph && isMutating
                  ? "+ ..."
                  : "+ страницу"}
              </button>
            )}
          </div>
        </div>
      </div>

      {selectedText && popupPosition && (
        <div
          className="fixed top-0 left-0 w-full h-full"
          onClick={() => setPopupPosition(null)}
        >
          <DefinitionPopup
            text={currentChapter?.values?.join(" ") || ""}
            selectedText={selectedText}
            position={popupPosition}
            onClose={() => setPopupPosition(null)}
          />
        </div>
      )}
    </div>
  );
};

export default BookPage;
