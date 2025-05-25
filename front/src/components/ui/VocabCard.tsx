import {
  useDeleteVocabItem,
  useUpdateVocabStatus,
} from "@/hooks/useUsersVocab";
import { UsersVocab, word_statuses } from "@/types/dbTypes";
import { useRouter } from "next/navigation";

const VocabCard = ({ item }: { item: UsersVocab }) => {
  const { mutate: updateStatus } = useUpdateVocabStatus();
  const { mutate: deleteVocabItem } = useDeleteVocabItem();
  const router = useRouter();

  const handleDivClick = () => {
    router.push("/dictionary/" + item.term);
  };

  const handleInnerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="p-2 md:p-1 border-2 border-main-darken rounded-lg c justify-between items-stretch cp bg-main-2"
      onClick={handleDivClick}
    >
      <div className="c gap-1 items-stretch relative">
        <h3
          className={`c px-1 font-semibold text-xl uppercase rounded-md bg-${item.status} text-white`}
        >
          {item.term}
        </h3>
        <select
          name="status"
          id="status"
          className="bg-white text-black rounded px-0-5 absolute inset-0 opacity-0 cursor-pointer"
          value={item.status}
          onChange={(e) =>
            updateStatus({
              id: item.id!,
              status: e.target.value as word_statuses,
            })
          }
          onClick={handleInnerClick}
        >
          <option value="unknown" className="bg-unknown text-white">
            Не знаю
          </option>
          <option value="learned" className="bg-learned text-white">
            Знаю
          </option>
          <option value="learning" className="bg-learning text-white">
            Учу
          </option>
          <option value="upto" className="bg-upto text-white">
            В планах
          </option>
        </select>
      </div>
      <div className="c gap-2 items-stretch" onClick={handleInnerClick}>
        {item.status != "learned" && (
          <button
            onClick={(e) => {
              handleInnerClick(e);
              updateStatus({ id: item.id!, status: "learned" });
            }}
            className="px-3 py-1 bg-cat-beige-light rounded"
          >
            Уже не забуду
          </button>
        )}
        <button
          className="px-2 py-1 bg-cat-coral-light text-white rounded"
          onClick={(e) => {
            handleInnerClick(e);
            deleteVocabItem(item.id!);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default VocabCard;
