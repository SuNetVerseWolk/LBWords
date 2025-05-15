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
      className="p-2 border rounded-lg c justify-between items-stretch cp"
      onClick={handleDivClick}
    >
      <div className="c gap-1 items-stretch relative">
        <h3
          className={`c px-1 font-semibold text-xl uppercase bg-white rounded text-${item.status == "upto" ? "black" : item.status}`}
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
          <option value="unknown" className="bg-unknown">
            Не знаю
          </option>
          <option value="learned" className="bg-learned">
            Знаю
          </option>
          <option value="learning" className="bg-learning">
            Учу
          </option>
          <option value="upto" className="bg-upto">
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
            className="px-3 py-1 bg-learned text-white rounded"
          >
            Уже не забуду
          </button>
        )}
        <button
          className="px-2 py-1 bg-red-500 text-white rounded"
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
