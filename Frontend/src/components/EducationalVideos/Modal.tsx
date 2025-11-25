import Image from "next/image";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { EducationalVideosModalData } from "@/data/EducationalVideo";
import { MdDeleteOutline } from "react-icons/md";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    formData: {
        title: string;
        description: string;
        videos: File[];
    };
    handleChange: (field: string, value: string) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveVideo: (index: number) => void;
    handleSave: () => void;
    handleSaveDraft: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, formData, handleChange, handleDrop, handleFileSelect, handleRemoveVideo, handleSave, handleSaveDraft }) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#BABBBB]/40 bg-opacity-50 flex items-center justify-center z-30">
            <div className="bg-white rounded-lg px-4 py-3 w-full max-w-2xl relative max-h-[35rem] overflow-y-auto">
                <div onClick={onClose} className="cursor-pointer absolute right-3 top-3 text-[24px] text-[#1C274C] hover:text-[#11401C]">
                    <IoIosCloseCircleOutline />
                </div>
                <div>
                    {EducationalVideosModalData.map((section, sectionIndex) => (
                        <div key={sectionIndex}>
                            <h2 className="text-[24px] font-semibold text-[#11401C] mt-3">
                                {section.section}
                            </h2>
                            <div className="grid grid-cols-1 gap-2 mt-2">
                                {section.fields.map((field, index) => {
                                    const isNotes = field.label === "Description";
                                    const isFileUpload = field.label === "Upload Video";
                                    return (
                                        <div key={index}>
                                            <label className="block font-bold text-[12px] text-[#1C1C1C] mb-2">
                                                {field.label}
                                            </label>
                                            {isNotes ? (
                                                <textarea
                                                    placeholder={field.placeholder}
                                                    value={formData.description}
                                                    onChange={(e) => handleChange(field.label, e.target.value)}
                                                    rows={3}
                                                    className="border border-[#8E8E8E] rounded-2xl py-2 focus-within:ring-1 focus-within:ring-[#11401C] focus-within:border-[#11401C] transition-all px-3 w-full placeholder:text-[#B1A9A9] outline-none text-[#222222]"
                                                />
                                            ) : isFileUpload ? (
                                                <div className="border border-[#8E8E8E] rounded-2xl focus-within:ring-1 focus-within:ring-[#11401C] focus-within:border-[#11401C] transition-all p-6 w-full">
                                                    <div
                                                        onDrop={handleDrop}
                                                        onDragOver={(e) => e.preventDefault()}
                                                    >
                                                        <input
                                                            type="file"
                                                            accept="video/mp4"
                                                            onChange={handleFileSelect}
                                                            className="hidden"
                                                            id="video-upload"
                                                        />
                                                        <label htmlFor="video-upload" className="cursor-pointer block text-center">
                                                            <div className="flex justify-center mb-2">
                                                                <Image src="/images/Educational/video.svg" alt="upload" width={18} height={12} />
                                                            </div>
                                                            <p className="text-[#6D6D6D] font-semibold underline">upload Video</p>
                                                            <div className="flex items-center justify-center gap-1 mt-1 text-[#6D6D6D]">
                                                                <p className="font-bold text-[12px]">MP4</p>
                                                                <p className="font-normal text-[14px]">(Max size 500MBs, Max Length 6 minutes)</p>
                                                            </div>
                                                            <button className="mt-[20px] px-[32px] py-[8px] text-white font-bold text-[14px] text-center bg-gradient-to-r cursor-pointer from-[#11401C] via-[#1F7332] to-[#859B5B] rounded-full">
                                                                Upload File
                                                            </button>
                                                        </label>
                                                        {formData.videos.length > 0 && (
                                                            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                                                                {formData.videos.map((file, index) => (
                                                                    <div key={index} className="relative">
                                                                        <video
                                                                            key={index}
                                                                            controls
                                                                            src={URL.createObjectURL(file)}
                                                                            className="w-full h-[100px] rounded-lg"
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleRemoveVideo(index)}
                                                                            className="absolute top-1 right-1 border border-[#CCCCCC] cursor-pointer rounded-md p-1 shadow-lg"
                                                                        >
                                                                            <MdDeleteOutline className="text-red-500 text-md" />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
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
                <div className="mt-6 flex justify-center items-center gap-3">
                    <button onClick={handleSave} className="rounded-full px-[24px] py-[8px] bg-transparent border border-[#11401C] text-[#11401C] cursor-pointer font-semibold text-center text-[14px]">
                        Upload
                    </button>
                    <button onClick={handleSaveDraft} className="rounded-full px-[24px] py-[8px] bg-transparent border border-[#859B5B] text-[#859B5B] text-center cursor-pointer font-bold">
                        Save Draft
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;