import Image from "next/image";
import { IoCloseCircleOutline } from "react-icons/io5";

interface RewardsModalProps {
    isOpen: boolean;
    selectedIndex: number | null;
    onClose: () => void;
    toggleBlockStatus: (id: string) => void;
    handleOpen: (index: number) => void;
    data: {
        id: string;
        title: string;
        image: string;
        name: string;
        email: string;
        phone: string;
        label: string;
        array: {
            title: string;
            label: string;
            rating: string;
            earned: string;
        }[];
        supplement: string;
        feedback: string;
    };
}

const AllergyModal: React.FC<RewardsModalProps> = ({ isOpen, onClose, data, selectedIndex, handleOpen, toggleBlockStatus }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#BABBBB]/40 bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white p-4 rounded-lg shadow-lg w-[650px] overflow-x-hidden overflow-y-auto max-h-[85vh] scrollbar-hide">
                <div className="flex items-center justify-between">
                    <div className="text-[#11401C] font-semibold text-[24px]">{data.title}</div>
                    <IoCloseCircleOutline className="w-6 h-6 text-[#1C274C] hover:text-[#11401C] cursor-pointer" onClick={onClose} />
                </div>
                <div className="flex justify-between mb-6 mt-4 pr-12">
                    <Image src={data.image} alt={data.name} width={100} height={100} className="rounded-full" />
                    <div>
                        <div>
                            <p className="text-[#B3B3B3] font-bold text-[12px] mb-1">Full Name:</p>
                            <p className="text-[#11401C] font-medium text-[18px]">{data.name}</p>
                        </div>
                        <div className="mt-1">
                            <p className="text-[#B3B3B3] font-bold text-[12px]">Phone Number:</p>
                            <p className="text-[#11401C] font-medium text-[18px]">{data.phone}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p className="text-[#B3B3B3] font-bold text-[12px] mb-1">Email ID:</p>
                            <p className="text-[#11401C] font-medium text-[18px]">{data.email}</p>
                        </div>
                    </div>
                </div>
                <h3 className="text-[#11401C] font-semibold text-[24px] mb-2">{data.label}</h3>
                {data.array.map((item, index) => (
                    <div key={index} className="grid grid-cols-3 text-sm mt-2">
                        <div>
                            <p className="font-bold text-[#B3B3B3] text-[12px]">{item.title}</p>
                            <p className="text-[#11401C] font-medium text-[18px]">{item.label}</p>
                        </div>
                        <div>
                            <p className="font-bold text-[#B3B3B3] text-[12px]">Rating</p>
                            <p className="text-[#11401C] font-medium text-[18px]">{item.rating}</p>
                        </div>
                        <div>
                            <p className="font-bold text-[#B3B3B3] text-[12px]">Severity</p>
                            <p className="text-[#11401C] font-medium text-[18px]">{item.earned}</p>
                        </div>
                    </div>
                ))}
                <div className="flex gap-4 mt-2">
                    <div className="w-[190px]">
                        <p className="font-bold text-[#B3B3B3] text-[12px]">Daily Supplement</p>
                        <p className="text-[#11401C] font-medium text-[18px]">{data.supplement}</p>
                    </div>
                    <div>
                        <p className="font-bold text-[#B3B3B3] text-[12px]">Daily Feedback</p>
                        <p className="text-[#11401C] font-medium text-[18px]">{data.feedback}</p>
                    </div>
                </div>
                <div className="flex justify-center gap-4 mt-6">
                    <button onClick={onClose} className="border border-[#11401C] cursor-pointer font-semibold text-[14px] text-[#11401C] px-[24px] py-[8px] rounded-full">
                        Approve
                    </button>
                    <button onClick={() => {selectedIndex !== null && toggleBlockStatus(data.id); onClose()}} className="border border-[#859B5B] cursor-pointer text-[#859B5B] font-semibold text-[14px] px-[24px] py-[8px] rounded-full">
                        Reject
                    </button>
                    <button className="border border-[#11401C] cursor-pointer text-[#11401C] font-bold px-[24px] py-[8px] rounded-full">
                        Contact User
                    </button>
                    <button onClick={() => {selectedIndex !== null && handleOpen(selectedIndex); onClose() }} className="border border-[#DB2828] cursor-pointer text-[#DB2828] font-bold px-[24px] py-[8px] rounded-full">
                        Delete Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllergyModal;