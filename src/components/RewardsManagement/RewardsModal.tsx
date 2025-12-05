import Image from "next/image";
import { IoCloseCircleOutline } from "react-icons/io5";

interface RewardsModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: {
        title: string;
        image: string;
        user: string;
        name: string;
        join: string;
        email: string;
        label: string;
        table: {
            date: string;
            event: string;
            earned: string;
            redeem: string;
            transferred: string;
            balance: string;
        }[];
    };
}

const RewardsModal: React.FC<RewardsModalProps> = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#BABBBB]/40 bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-white p-4 rounded-lg shadow-lg w-[650px] overflow-x-hidden overflow-y-auto max-h-[85vh] scrollbar-hide">
                <div className="flex items-center justify-between">
                    <div className="text-[#11401C] font-semibold text-[24px]">{data.title}</div>
                    <IoCloseCircleOutline className="w-6 h-6 text-[#1C274C] hover:text-[#11401C] cursor-pointer" onClick={onClose} />
                </div>
                <div className="flex items-center justify-between mb-6 mt-4 pr-12">
                    <Image src={data.image} alt={data.name} width={100} height={100} className="rounded-full" />
                    <div>
                        <div>
                            <p className="text-[#B3B3B3] font-bold text-[12px] mb-1">Full Name:</p>
                            <p className="text-[#11401C] font-medium text-[18px]">{data.name}</p>
                        </div>
                        <div className="mt-1">
                            <p className="text-[#B3B3B3] font-bold text-[12px]">Joined on:</p>
                            <p className="text-[#11401C] font-medium text-[18px]">{data.join}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p className="text-[#B3B3B3] font-bold text-[12px] mb-1">User ID:</p>
                            <p className="text-[#11401C] font-medium text-[18px]">{data.user}</p>
                        </div>
                        <div className="mt-1">
                            <p className="text-[#B3B3B3] font-bold text-[12px]">Email ID:</p>
                            <p className="text-[#11401C] font-medium text-[18px]">{data.email}</p>
                        </div>
                    </div>
                </div>
                <h3 className="text-[#11401C] font-semibold text-[24px] mb-2">{data.label}</h3>
                <table className="w-full text-sm text-left">
                    <thead className="text-[#4D4D4D] font-semibold text-[12px] border-b border-[#D4D4D4]">
                        <tr>
                            <th className="p-2">Date</th>
                            <th className="p-2">Event</th>
                            <th className="p-2">Stars Earned</th>
                            <th className="p-2">Stars Redeem</th>
                            <th className="p-2">Stars Transferred</th>
                            <th className="p-2">Balance After</th>
                        </tr>
                    </thead>
                    <tbody className="border-b border-[#D4D4D4]">
                        {data.table.map((item, index) => (
                            <tr key={index} className="text-[12px] border-b border-[#D4D4D4]">
                                <td className="p-2 text-[#11401C] font-bold">{item.date}</td>
                                <td className="p-2 text-[#666666] font-semibold">{item.event}</td>
                                <td className="p-2 text-[#859B5B] font-bold">{item.earned}</td>
                                <td className="p-2 text-[#666666] font-bold">{item.redeem}</td>
                                <td className="p-2 text-[#666666] font-bold">{item.transferred}</td>
                                <td className="p-2 text-[#666666] font-bold">{item.balance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RewardsModal;