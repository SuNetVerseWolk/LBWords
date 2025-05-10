"use client";
import SpinerLoading from "@/components/layouts/SpinerLoading";
import DefinitionPopup from "@/components/ui/DefinitionPopup";
import RefetchButton from "@/components/ui/RefetchButton";
import Roles from "@/enums/roles";
import { useBooks } from "@/hooks/useBooks";
import { useRole } from "@/hooks/useAuth";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const BookPage = () => {
  const { id } = useParams();
  const {
    useBook: { data: book, isLoading, isError, refetch, error },
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

  const handleUpdateChapterName = (chapterId: number, newName: string) => {
    if (!book) return;

    const updatedChapters = book.chapters.map((chapter) =>
      chapter.id === chapterId ? { ...chapter, name: newName } : chapter
    );

    updateBook.mutate({
      id: id as string,
      data: { ...book, chapters: updatedChapters },
    });
  };

  const handleUpdateParagraph = (
    chapterId: number,
    paragraphIndex: number,
    newValue: string
  ) => {
    if (!book) return;

    const updatedChapters = book.chapters.map((chapter) => {
      if (chapter.id === chapterId) {
        const updatedValues = [...chapter.values];
        updatedValues[paragraphIndex] = newValue;
        return { ...chapter, values: updatedValues };
      }
      return chapter;
    });

    updateBook.mutate({
      id: id as string,
      data: { ...book, chapters: updatedChapters },
    });
  };

  const handleAddParagraph = (chapterId: number) => {
    if (!book) return;

    const updatedChapters = book.chapters.map((chapter) =>
      chapter.id === chapterId
        ? { ...chapter, values: [...chapter.values, ""] }
        : chapter
    );

    updateBook.mutate({
      id: id as string,
      data: { ...book, chapters: updatedChapters },
    });
		setMutations(prev => ({
			...prev,
			isAddParagraph: true,
		}))
  };

  const handleAddChapter = () => {
    if (!book) {
      const newChapter = {
        id: generateChapterId(),
        name: "Chapter 1",
        image: null,
        values: [],
      };

      updateBook.mutate({
        id: id as string,
        data: { chapters: [newChapter] },
      });
      return;
    }

    const newChapter = {
      id: generateChapterId(),
      name: `Chapter ${book.chapters.length + 1}`,
      image: null,
      values: [],
    };

    updateBook.mutate({
      id: id as string,
      data: { ...book, chapters: [...book.chapters, newChapter] },
    });
		setMutations(prev => ({
			...prev,
			isAddChapter: true,
		}))

		setSelectedChapterIndex(book.chapters.length);
  };

  const handleDeleteParagraph = (chapterId: number, paragraphIndex: number) => {
    if (!book) return;

    const updatedChapters = book.chapters.map((chapter) => {
      if (chapter.id === chapterId) {
        const updatedValues = [...chapter.values];
        updatedValues.splice(paragraphIndex, 1);
        return { ...chapter, values: updatedValues };
      }
      return chapter;
    });

    updateBook.mutate({
      id: id as string,
      data: { ...book, chapters: updatedChapters },
    });
  };

  const handleNextChapter = () => {
    if (!book || selectedChapterIndex >= book.chapters.length - 1) return;
    setSelectedChapterIndex((prev) => prev + 1);
  };

  const handlePrevChapter = () => {
    if (selectedChapterIndex <= 0) return;
    setSelectedChapterIndex((prev) => prev - 1);
  };

  const handleDeleteChapter = (chapterId: number) => {
    if (!book || book.chapters.length <= 1) return;

    const updatedChapters = book.chapters.filter(
      (chapter) => chapter.id !== chapterId
    );
		const newSelectedIndex = Math.min(
			selectedChapterIndex,
			updatedChapters.length - 1
		);

    updateBook.mutate({
      id: id as string,
      data: { ...book, chapters: updatedChapters },
    });
		setMutations(prev => ({
			...prev,
			isDeleteChapter: true,
		}))

		setSelectedChapterIndex(newSelectedIndex);
  };

	useEffect(() => {
		if (isMutating == false) {
			setMutations({
				isAddChapter: false,
				isAddParagraph: false,
				isDeleteChapter: false,
			})
		}
	}, [isMutating])

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

  const currentChapter = book.chapters[selectedChapterIndex];

  return (
    <div className="w-full">
      <div key={currentChapter?.id} className="flex flex-col gap-1-5 h-full">
        {role === Roles.admin ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={currentChapter?.name}
              onChange={(e) =>
                handleUpdateChapterName(currentChapter?.id, e.target.value)
              }
              onBlur={(e) =>
                handleUpdateChapterName(currentChapter?.id, e.target.value)
              }
              className="text-xl font-medium p-0-5 rounded-t-2xl rounded-b-xl border-2 flex-1"
            />
            <button
              onClick={() => handleDeleteChapter(currentChapter?.id)}
              className="bg-red-500 p-0-5 rounded-xl min-w-40 text-white"
              disabled={book.chapters.length <= 1}
            >
							{mutations.isDeleteChapter && isMutating ? 'Удаляется ...' : 'Удалить страницу'}
            </button>
          </div>
        ) : (
          <h1 className="text-center text-xl font-medium">
            {currentChapter?.name}
          </h1>
        )}
        <div className="flex flex-col gap-1 pr-0-5 overflow-y-scroll thin-scrollbar h-full">
          {currentChapter?.values?.map((value, j) =>
            role === Roles.admin ? (
              <div key={j} className="flex">
                <textarea
                  value={value}
                  onChange={(e) =>
                    handleUpdateParagraph(currentChapter?.id, j, e.target.value)
                  }
                  onBlur={(e) =>
                    handleUpdateParagraph(currentChapter?.id, j, e.target.value)
                  }
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
								{mutations.isAddParagraph && isMutating ? '+ ...' : '+ абзац'}
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
								{mutations.isAddParagraph && isMutating ? '+ ...' : '+ страницу'}
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
