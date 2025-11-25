"use client"

import { useState } from "react";
import Image from "next/image";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AllergenDatabaseModalData } from "@/data/AllergenDatabase";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    formData: {
        title: string;
        symptoms: string[];
    };
    handleChange: (field: string, value: string) => void;
    handleSave: () => void;
    newSymptom: string;
    setNewSymptom: React.Dispatch<React.SetStateAction<string>>;
    handleRemoveSymptom: (symptom: string) => void;
    editingIndex: number | null;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, formData, handleChange, handleSave, newSymptom, handleRemoveSymptom, setNewSymptom, editingIndex }) => {
    
    const [isSymptomFocused, setIsSymptomFocused] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#BABBBB]/40 bg-opacity-50 flex items-center justify-center z-30">
            <div className="bg-white rounded-lg px-4 py-3 w-full max-w-xl relative max-h-[42.7rem] overflow-y-auto scrollbar-hide">
                <div onClick={onClose} className="cursor-pointer absolute right-3 top-3 text-[24px] text-[#1C274C] hover:text-[#11401C]">
                    <IoIosCloseCircleOutline />
                </div>
                <div>
                    {AllergenDatabaseModalData.map((section, sectionIndex) => (
                        <div key={sectionIndex}>
                            <h2 className="text-[24px] font-semibold text-[#11401C]">
                                {section.section}
                            </h2>
                            <div className="grid grid-cols-1 gap-2 mt-2">
                                {section.fields.map((field, index) => {
                                    const isSymptoms = field.label === "Common Symptoms";
                                    return (
                                        <div key={index}>
                                            <label className="block font-bold text-[12px] text-[#1C1C1C] mb-2">
                                                {field.label}
                                            </label>
                                            {isSymptoms ? (
                                                <div>
                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                        {formData.symptoms?.map((symptom, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="bg-transparent border border-[#14A155] font-normal rounded-full px-[12px] py-1 flex items-center text-[12px] text-[#333333]"
                                                            >
                                                                {symptom}
                                                                <button
                                                                    onClick={() => handleRemoveSymptom(symptom)}
                                                                    className="ml-2 text-[#999999] hover:text-[#333333] cursor-pointer"
                                                                >
                                                                    &times;
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <textarea
                                                        placeholder={field.placeholder}
                                                        value={newSymptom}
                                                        onChange={(e) => setNewSymptom(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                e.preventDefault();
                                                                handleChange("Symptoms Tags", newSymptom);
                                                            }
                                                        }}
                                                        onFocus={() => setIsSymptomFocused(true)}
                                                        onBlur={() => setIsSymptomFocused(false)}
                                                        rows={3}
                                                        className="border border-[#8E8E8E] rounded-2xl py-2 focus-within:ring-1 focus-within:ring-[#11401C] focus-within:border-[#11401C] transition-all px-3 w-full placeholder:text-[#B1A9A9] outline-none text-[#222222]"
                                                    />
                                                    {isSymptomFocused && <p className="text-[12px] text-[#333333]">After typing, press Enter.</p>}
                                                </div>
                                            ) : (
                                                <div className="border border-[#8E8E8E] rounded-full focus-within:ring-1 focus-within:ring-[#11401C] focus-within:border-[#11401C] transition-all px-3 h-[40px] w-full flex items-center gap-2">
                                                    {field.image && (
                                                        <Image src={field.image as string} alt="calendar" width={17} height={17} />
                                                    )}
                                                    <input
                                                        type="text"
                                                        placeholder={field.placeholder}
                                                        value={formData.title}
                                                        onChange={(e) => handleChange(field.label, e.target.value)}
                                                        className="placeholder:text-[#B1A9A9] outline-none text-[#222222] w-full"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex justify-center">
                    <button onClick={handleSave} className="rounded-full px-[24px] py-[8px] bg-transparent border border-[#11401C] text-[#11401C] cursor-pointer font-semibold text-center text-[14px]">
                        {editingIndex !== null ? 'Edit Details' : 'Save Details'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;