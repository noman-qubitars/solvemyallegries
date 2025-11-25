import { MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";


const BreadCrum: React.FC = () => {

    return (
        <div className="bg-white rounded-[12px] shadow-sm p-4 flex items-center gap-1">
            <div className="flex items-center gap-1">
                <Link href="/usermanagement">
                    <p className="text-[#B1A9A9] text-[24px] font-semibold">User Management</p>
                </Link>
                <MdKeyboardArrowRight className="text-[#B1A9A9]" />
            </div>
            <p className="text-[#11401C] text-[24px] font-semibold">Patent Details</p>
        </div>
    );
};

export default BreadCrum;