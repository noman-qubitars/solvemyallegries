import Image from "next/image";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { EducationalVideosModalData } from "@/data/EducationalVideo";
import { MdDeleteOutline } from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { educationalVideoSchema } from "@/lib/validation/educationalVideoSchema";
import { EducationalVideo } from "@/lib/api/educationalVideoApi";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    editingVideo: EducationalVideo | null;
    onSubmit: (values: { title: string; description: string; videos: File[] }, isDraft: boolean) => Promise<void>;
    isLoading?: boolean;
};

const Modal: React.FC<ModalProps> = ({ 
    isOpen, 
    onClose, 
    editingVideo,
    onSubmit,
    isLoading = false 
}) => {
    const MAX_FILE_SIZE = 500 * 1024 * 1024;

    if (!isOpen) return null;

    const initialValues = {
        title: editingVideo?.title || "",
        description: editingVideo?.description || "",
        videos: [] as File[],
    };

    const handleFormSubmit = async (values: typeof initialValues, isDraft: boolean, setErrors?: any) => {
        if (values.videos.length > 0) {
            const file = values.videos[0];
            if (file.size > MAX_FILE_SIZE) {
                if (setErrors) {
                    setErrors({ videos: "Video file size must be less than 500MB" });
                }
                return;
            }
        }
        
        if (!editingVideo && values.videos.length === 0) {
            if (setErrors) {
                setErrors({ videos: "At least one video file is required" });
            }
            return;
        }

        await onSubmit(values, isDraft);
    };

    return (
        <div className="fixed inset-0 bg-[#BABBBB]/40 bg-opacity-50 flex items-center justify-center z-30">
            <div className="bg-white rounded-lg px-4 py-3 w-full max-w-2xl relative max-h-[35rem] overflow-y-auto">
                <div onClick={onClose} className="cursor-pointer absolute right-3 top-3 text-[24px] text-[#1C274C] hover:text-[#11401C]">
                    <IoIosCloseCircleOutline />
                </div>
                <Formik
                    key={editingVideo?._id || 'new'}
                    initialValues={initialValues}
                    validationSchema={educationalVideoSchema}
                    enableReinitialize={true}
                    onSubmit={async (values, { setErrors, setSubmitting }) => {
                        setSubmitting(true);
                        try {
                            await handleFormSubmit(values, false, setErrors);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ values, setFieldValue, errors, touched, setErrors, setFieldTouched, isSubmitting }) => (
                        <Form>
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
                                                            <div>
                                                                <Field
                                                                    as="textarea"
                                                                    name="description"
                                                                    placeholder={field.placeholder}
                                                                    rows={3}
                                                                    className={`border border-[#8E8E8E] rounded-2xl py-2 focus-within:ring-1 focus-within:ring-[#11401C] focus-within:border-[#11401C] transition-all px-3 w-full placeholder:text-[#B1A9A9] outline-none text-[#222222] ${
                                                                        errors.description && touched.description ? 'border-red-500' : ''
                                                                    }`}
                                                                />
                                                                <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1" />
                                                            </div>
                                                        ) : isFileUpload ? (
                                                            <div>
                                                                <div className={`border border-[#8E8E8E] rounded-2xl focus-within:ring-1 focus-within:ring-[#11401C] focus-within:border-[#11401C] transition-all p-6 w-full ${
                                                                    errors.videos && touched.videos ? 'border-red-500' : ''
                                                                }`}>
                                                                    <div
                                                                        onDrop={(e) => {
                                                                            e.preventDefault();
                                                                            const files = e.dataTransfer.files;
                                                                            if (files.length > 0) {
                                                                                const file = Array.from(files).find((file) => file.type.startsWith("video/"));
                                                                                if (file) {
                                                                                    if (file.size > MAX_FILE_SIZE) {
                                                                                        setFieldValue("videos", []);
                                                                                        setErrors({ videos: "Video file size must be less than 500MB" });
                                                                                        return;
                                                                                    }
                                                                                    // if (values.videos.length > 0) {
                                                                                    //     setErrors({ videos: "At least one video file is required" });
                                                                                    //     return;
                                                                                    // }
                                                                                    setFieldValue("videos", [file], true);
                                                                                    setFieldTouched("videos", true);
                                                                                    setErrors({ videos: undefined });
                                                                                }
                                                                            }
                                                                        }}
                                                                        onDragOver={(e) => e.preventDefault()}
                                                                    >
                                                                        <input
                                                                            type="file"
                                                                            accept="video/mp4,video/*"
                                                                            onChange={(e) => {
                                                                                const files = e.target.files;
                                                                                if (files && files.length > 0) {
                                                                                    const file = Array.from(files).find((file) => file.type.startsWith("video/"));
                                                                                    if (file) {
                                                                                        if (file.size > MAX_FILE_SIZE) {
                                                                                            setFieldValue("videos", []);
                                                                                            setErrors({ videos: "Video file size must be less than 500MB" });
                                                                                            e.target.value = '';
                                                                                            return;
                                                                                        }
                                                                                        if (values.videos.length > 0) {
                                                                                            setErrors({ videos: "At least one video file is required" });
                                                                                            e.target.value = '';
                                                                                            return;
                                                                                        }
                                                                                        setFieldValue("videos", [file], true);
                                                                                        setFieldTouched("videos", true);
                                                                                        setErrors({ videos: undefined });
                                                                                    }
                                                                                }
                                                                                e.target.value = '';
                                                                            }}
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
                                                                            <button 
                                                                                type="button"
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    e.stopPropagation();
                                                                                    document.getElementById('video-upload')?.click();
                                                                                }}
                                                                                className="mt-[20px] px-[32px] py-[8px] text-white font-bold text-[14px] text-center bg-gradient-to-r cursor-pointer from-[#11401C] via-[#1F7332] to-[#859B5B] rounded-full"
                                                                            >
                                                                                Upload File
                                                                            </button>
                                                                        </label>
                                                                        {values.videos.length > 0 && (
                                                                            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                                                                                {values.videos.map((file, index) => (
                                                                                    <div key={index} className="relative">
                                                                                        <video
                                                                                            controls
                                                                                            src={URL.createObjectURL(file)}
                                                                                            className="w-full h-[100px] rounded-lg"
                                                                                        />
                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() => {
                                                                                                const newVideos = values.videos.filter((_, i) => i !== index);
                                                                                                setFieldValue("videos", newVideos);
                                                                                            }}
                                                                                            className="absolute top-1 right-1 border border-[#CCCCCC] cursor-pointer rounded-md p-1 shadow-lg"
                                                                                        >
                                                                                            <MdDeleteOutline className="text-red-500 text-md" />
                                                                                        </button>
                                                                                        <div className="text-xs text-gray-600 mt-1">
                                                                                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                        {editingVideo && values.videos.length === 0 && (
                                                                            <div className="mt-4">
                                                                                <video
                                                                                    controls
                                                                                    src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}${editingVideo.videoUrl}`}
                                                                                    className="w-full h-[200px] rounded-lg"
                                                                                />
                                                                                <p className="text-xs text-gray-500 mt-2 text-center">Current video (upload new file to replace)</p>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                {errors.videos && touched.videos && (
                                                                    <div className="text-red-500 text-xs mt-2 text-center">
                                                                        {typeof errors.videos === 'string' ? errors.videos : 'Video file is required'}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <Field
                                                                    name="title"
                                                                    type="text"
                                                                    placeholder={field.placeholder}
                                                                    className={`border border-[#8E8E8E] rounded-full focus-within:ring-1 focus-within:ring-[#11401C] focus-within:border-[#11401C] transition-all px-3 h-[40px] w-full flex items-center gap-2 outline-none text-[#222222] placeholder:text-[#B1A9A9] ${
                                                                        errors.title && touched.title ? 'border-red-500' : ''
                                                                    }`}
                                                                />
                                                                <ErrorMessage name="title" component="div" className="text-red-500 text-xs mt-1" />
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
                                <button 
                                    type="submit" 
                                    disabled={isLoading || isSubmitting}
                                    className="rounded-full px-[24px] py-[8px] bg-transparent border border-[#11401C] text-[#11401C] cursor-pointer font-semibold text-center text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading || isSubmitting ? (editingVideo ? "Updating..." : "Uploading...") : (editingVideo ? "Update" : "Upload")}
                                </button>
                                <button 
                                    type="button"
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        if (isSubmitting || isLoading) return;
                                        
                                        if (values.videos.length > 0) {
                                            const file = values.videos[0];
                                            if (file.size > MAX_FILE_SIZE) {
                                                setErrors({ videos: "Video file size must be less than 500MB" });
                                                return;
                                            }
                                        }
                                        
                                        await handleFormSubmit(values, true, setErrors);
                                    }}
                                    disabled={isLoading || isSubmitting}
                                    className="rounded-full px-[24px] py-[8px] bg-transparent border border-[#859B5B] text-[#859B5B] text-center cursor-pointer font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading || isSubmitting ? (editingVideo ? "Updating..." : "Saving...") : (editingVideo ? "Update Draft" : "Save Draft")}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Modal;