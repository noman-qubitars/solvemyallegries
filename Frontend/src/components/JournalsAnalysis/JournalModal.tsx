import Image from "next/image";
import { IoCloseCircleOutline } from "react-icons/io5";

interface RewardsModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: {
        id: number;
        title: string;
        titleone: string;
        date: string;
        image: string;
        name: string;
        email: string;
        uid: string;
        joined: string;
        label: string;
        text: string;
        word: string;
        labelone: string;
        array: {
            symptom: string;
            severity: string;
            tag: string;
        }[];
    };
}

const JournalModal: React.FC<RewardsModalProps> = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#BABBBB]/40 bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white p-4 rounded-lg shadow-lg w-[650px] overflow-x-hidden overflow-y-auto max-h-[85vh] scrollbar-hide">
                <div className="flex items-center justify-between border-b border-[#717171] pb-1">
                    <div className="flex items-center gap-1">
                        <div className="text-[#11401C] font-semibold text-[24px]">{data.title}</div>
                        <div className="text-[#859B5B] font-semibold text-[24px]">{data.titleone}</div>
                        <div className="text-[#808080] font-normal">{data.date}</div>
                    </div>
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
                            <p className="text-[#B3B3B3] font-bold text-[12px]">Joined on:</p>
                            <p className="text-[#11401C] font-medium text-[18px]">{data.joined}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p className="text-[#B3B3B3] font-bold text-[12px] mb-1">User ID:</p>
                            <p className="text-[#11401C] font-medium text-[18px]">{data.uid}</p>
                        </div>
                        <div>
                            <p className="text-[#B3B3B3] font-bold text-[12px] mb-1">Email ID:</p>
                            <p className="text-[#11401C] font-medium text-[18px]">{data.email}</p>
                        </div>
                    </div>
                </div>
                <h3 className="text-[#11401C] font-semibold text-[24px] mb-2">{data.label}</h3>
                <h3 className="text-[#222222] font-normal mb-2">{data.text}</h3>
                <h3 className="text-[#808080] font-normal text-[12px] mb-2">{data.word}</h3>
                <h3 className="text-[20px] pt-2 font-bold border-t border-[#B1A9A9] bg-gradient-to-r from-[#11401C] via-[#1F7332] to-[#859B5B] bg-clip-text text-transparent">
                    {data.labelone}
                </h3>
                <div className="overflow-x-auto mt-3">
                    <div className="grid grid-cols-3 text-[#717171] font-semibold text-[12px] bg-white">
                        <div className="px-2 py-2 text-left">Symptom Mentioned</div>
                        <div className="px-2 py-2 text-center">Severity (Scale 1-10)</div>
                        <div className="pr-7 py-2 text-right">Tag</div>
                    </div>
                    {data.array.map((user, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-3 bg-white"
                        >
                            <div className="px-2 py-2 text-left text-[#222222] font-medium">
                                {user.symptom}
                            </div>
                            <div className="px-2 py-2 text-center text-[#222222] font-medium">
                                {user.severity}
                            </div>
                            <div
                                className={`px-2 py-2 text-right font-bold text-[12px] ${user.tag === "Moderate"
                                    ? "text-[#F2711C]"
                                    : user.tag === "Low"
                                        ? "text-[#2185D0]"
                                        : user.tag === "Improved"
                                            ? "text-[#21BA45]"
                                            : ""
                                    }`}
                            >
                                {user.tag}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JournalModal;