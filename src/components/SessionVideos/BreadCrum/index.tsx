import { IoIosSearch } from "react-icons/io";

interface BreadCrumProps {
  onSearch: (term: string) => void;
  onOpen: () => void;
}

const BreadCrum: React.FC<BreadCrumProps> = ({ onSearch, onOpen }) => {

  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-[#11401C] font-semibold text-[24px]">Session Videos</h1>
        <p className="text-[#646464] font-medium text-[14px]">Upload or review exercise videos tailored to symptoms</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center px-3 gap-2 border border-[#D5D5D5] rounded-full w-[388px] h-[38px] focus-within:ring-1 focus-within:ring-[#11401C] focus-within:border-[#11401C] transition-all">
          <IoIosSearch size={20} />
          <input
            type="text"
            placeholder="Search Video"
            onChange={(e) => onSearch(e.target.value)}
            className="w-full text-black outline-none bg-transparent placeholder:text-[#8F9091]"
          />
        </div>
        <button onClick={onOpen} className="bg-gradient-to-r cursor-pointer from-[#11401C] via-[#1F7332] to-[#859B5B] rounded-full px-[12px] py-[7px] text-white font-bold">
          + Upload Video
        </button>
      </div>
    </div>
  );
};

export default BreadCrum;
