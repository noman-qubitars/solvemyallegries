import { ReactNode } from "react";
import Link from "next/link";

interface Props {
    children: ReactNode;
}
const AuthLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
            <div className="flex-grow flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
            <footer className="w-full px-14 border-t-2 border-gray-200 py-3 text-xs text-gray-400 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-2 sm:gap-0">
                <p className="text-center font-semibold text-base text-gray-600 sm:text-left">
                    Copyright 2025 SolveMyAllergies ©
                </p>
                <div className="flex gap-4 text-center sm:text-right">
                    <Link href="" className="cursor-pointer text-base font-medium text-green-800 hover:text-gray-600 transition">
                        Privacy Policy
                    </Link>
                    <Link href="" className="cursor-pointer text-base font-medium text-green-800 hover:text-gray-600 transition">
                        Terms & Conditions
                    </Link>
                </div>
            </footer>
        </div>
    );
};
export default AuthLayout;