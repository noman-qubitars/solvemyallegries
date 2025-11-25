"use client"

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import BreadCrum from "./BreadCrum";
import { AiOutlineEye } from 'react-icons/ai';
import { MdOutlineKeyboardDoubleArrowLeft, MdKeyboardArrowLeft, MdOutlineKeyboardDoubleArrowRight, MdKeyboardArrowRight } from 'react-icons/md';
import Modal from "./Modal";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { TiTick } from "react-icons/ti";


const AllergenDatabase: React.FC = () => {

  // const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const initialFormData = {
    title: "",
    symptoms: [] as string[],
  };
  const [formDataList, setFormDataList] = useState<typeof initialFormData[]>([]);
  const [currentForm, setCurrentForm] = useState<typeof initialFormData>({ ...initialFormData });
  const [editingSource, setEditingSource] = useState<"upload" | null>(null);
  const [newSymptom, setNewSymptom] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);


  const handleOpen = (index: number) => {
    setDeleteIndex(index);
    setModalOpen(true);
    setOpenDropdownIndex(null);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleOpenModal = () => {
    setCurrentForm({ ...initialFormData });
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentForm({ ...initialFormData });
    setIsModalOpen(false);
  };

  const handleChange = (field: string, value: string) => {
    if (field === "Symptoms Tags") {
      const trimmed = value.trim();
      if (trimmed && !currentForm.symptoms.includes(trimmed)) {
        setCurrentForm((prev) => ({
          ...prev,
          symptoms: [...prev.symptoms, trimmed],
        }));
      }
      setNewSymptom("");
    } else {
      setCurrentForm((prev) => ({
        ...prev,
        [field === "Symptom Name" ? "title" : field]: value,
      }));
    }
  };

  const handleRemoveSymptom = (symptomToRemove: string) => {
    setCurrentForm((prev) => ({
      ...prev,
      symptoms: prev.symptoms.filter(symptom => symptom !== symptomToRemove),
    }));
  };

  const handleUpload = () => {
    if (
      currentForm.title.trim() === ""
    ) {
      setIsModalOpen(false);
      return;
    }
    if (editingIndex !== null && editingSource !== null) {
      if (editingSource === "upload") {
        setFormDataList((prev) =>
          prev.map((item, idx) => (idx === editingIndex ? currentForm : item))
        );
      }
    } else {
      setFormDataList((prev) => [
        ...prev,
        { ...currentForm, date: new Date().toISOString() }
      ]);
    }

    setCurrentForm({ ...initialFormData });
    setEditingIndex(null);
    setEditingSource(null);
    setIsModalOpen(false);
  };


  const handleEdit = (index: number) => {
    const formToEdit = formDataList[index];
    setCurrentForm(formToEdit);
    setEditingIndex(index);
    setEditingSource("upload");
    setIsModalOpen(true);
    setOpenDropdownIndex(null);
  };

  const handleDelete = (index: number) => {
    setDeleteIndex(index);
    setDeleteModalOpen(true);
    setOpenDropdownIndex(null);
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      setFormDataList((prev) => prev.filter((_, i) => i !== deleteIndex));
      setDeleteIndex(null);
      setDeleteModalOpen(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteIndex(null);
  };

  const filteredData = formDataList
    .filter(user =>
      user.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(user =>
      selectedFilter
        ? user.title.toLowerCase().includes(selectedFilter.toLowerCase())
        : true
    );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(formDataList.length / itemsPerPage);
  const itemsPerPageOptions = [10, 20, 30, 50];


  const toggleCheckbox = (title: string) => {
    setSelectedRows((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    )
  }

  const toggleAllCheckboxes = () => {
    if (selectedRows.length === formDataList.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(formDataList.map((user) => user.title))
    }
  }

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`[data-dropdown-index="${openDropdownIndex}"]`)) {
        setOpenDropdownIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownIndex]);

  // const handleView = (userId: number) => {
  //   router.push(`/usermanagement/${userId}`);
  //   setOpenDropdownIndex(null);
  // };

  return (
    <div className="">
      <BreadCrum onSearch={setSearchTerm} setSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter} onOpen={handleOpenModal} />
      <div className="relative mt-4">
        <div className="overflow-x-auto rounded-lg border border-[#CCCCCC]">
          <table className="min-w-full text-sm text-center">
            <thead className="text-[#484C52] font-medium bg-[#F2F2F2] border-b border-[#CCCCCC]">
              <tr>
                <th className="px-4 py-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formDataList.length > 0 && selectedRows.length === formDataList.length}
                      onChange={toggleAllCheckboxes}
                      className="peer hidden"
                    />
                    <div className="w-4 h-4 rounded border border-[#828282] bg-white flex items-center justify-center peer-checked:border-[#21BA45] peer-checked:bg-[#21BA45]">
                      <Image src="/images/User/tick.svg" alt="check" width={12} height={7} />
                    </div>
                  </label>
                </th>
                <th
                  className={`px-4 py-4 cursor-pointer text-left whitespace-nowrap`}
                >
                  Symptom ID
                </th>
                <th className="px-4 py-4 whitespace-nowrap">Symptom Name</th>
                <th className="px-4 py-4 whitespace-nowrap">Common Symptoms</th>
                <th className="px-4 py-4 whitespace-nowrap">Added Date</th>
                <th className="px-4 py-4 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#CCCCCC]">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-[#222222] font-medium py-2">
                    No Data Available
                  </td>
                </tr>
              ) : (
                currentItems.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(user.title)}
                          onChange={() => toggleCheckbox(user.title)}
                          className="peer hidden"
                        />
                        <div className="w-4 h-4 rounded border border-[#828282] bg-white flex items-center justify-center peer-checked:border-[#21BA45] peer-checked:bg-[#21BA45]">
                          <Image src="/images/User/tick.svg" alt="check" width={12} height={7} />
                        </div>
                      </label>
                    </td>
                    <td className="px-4 py-4 text-left whitespace-nowrap font-medium text-[#484C52]">
                      #A{index + 1}
                    </td>
                    <td className="px-4 py-4 text-[#484C52] font-medium text-[14px] whitespace-nowrap">{user.title}</td>
                    <td className="px-4 py-4 text-[#484C52] font-medium text-[14px] whitespace-nowrap">
                      {Array.isArray(user.symptoms) ? user.symptoms.join(", ") : ""}
                    </td>
                    <td className="px-4 py-4 text-[#484C52] font-medium text-[14px] whitespace-nowrap">
                      {"date" in user && user.date
                        ? new Date(user.date as string).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })
                        : ""}
                    </td>
                    <td className="px-4 py-4 flex justify-center whitespace-nowrap">
                      <div ref={dropdownRef} data-dropdown-index={index}>
                        <button className="text-[#000000] cursor-pointer" onClick={() => toggleDropdown(index)}>
                          <HiOutlineDotsHorizontal className="w-5 h-5" />
                        </button>
                        {openDropdownIndex === index && (
                          <div className="absolute right-[4.5rem] mt-0 w-[127px] bg-white rounded-[6px] shadow-lg border border-[#B3B3B3] z-50">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDelete(index) }}
                              className="w-full cursor-pointer flex gap-2 pl-[12px] py-[12px] text-[#11401C] font-medium border-b border-[#B3B3B3]"
                            >
                              <AiOutlineEye className="w-4 h-4" /> View
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(index);
                              }}
                              className="w-full cursor-pointer flex items-center gap-2 pl-[12px] py-[12px] text-[#717171] font-medium border-b border-[#B3B3B3]"
                            >
                              <FiEdit2 className="w-4 h-4" /> Edit
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); handleOpen(index) }}  className="w-full cursor-pointer flex items-center gap-2 pl-[12px] py-[12px] text-[#DB2828] font-medium border-b border-[#B3B3B3]">
                              <RiDeleteBinLine className="w-4 h-4" /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {filteredData.length > 10 && (
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between mt-3 gap-4 px-[28px]">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-[#484C52] font-medium text-[14px] border-r border-[#CCCCCC] pr-4">
              Items per page
              <select
                className="ml-2 px-2 py-1 border border-[#E9E9E9] rounded-lg outline-none cursor-pointer"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {itemsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-[#313131] text-[14px] font-normal">
              {startIndex + 1} - {Math.min(startIndex + itemsPerPage, formDataList.length)} of {formDataList.length} items
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2">
            <div className="text-[#313131] text-[14px] font-normal border-r border-[#A6A6A6] pr-3">
              {currentPage} of {formDataList.length} pages
            </div>
            <button
              onClick={() => setCurrentPage(1)}
              className="border border-[#E9E9E9] w-[40px] h-[36px] flex items-center justify-center cursor-pointer rounded-[4px] text-[#626262]"
            >
              <MdOutlineKeyboardDoubleArrowLeft />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="border border-[#E9E9E9] w-[40px] h-[36px] flex items-center justify-center cursor-pointer rounded-[4px] text-[#626262]">
              <MdKeyboardArrowLeft />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="border border-[#E9E9E9] w-[40px] h-[36px] flex items-center justify-center cursor-pointer rounded-[4px] text-[#626262]"
            >
              <MdKeyboardArrowRight />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="border border-[#E9E9E9] w-[40px] h-[36px] flex items-center justify-center cursor-pointer rounded-[4px] text-[#626262]">
              <MdOutlineKeyboardDoubleArrowRight />
            </button>
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        formData={currentForm}
        handleChange={handleChange}
        handleSave={handleUpload}
        newSymptom={newSymptom}
        setNewSymptom={setNewSymptom}
        handleRemoveSymptom={handleRemoveSymptom}
        editingIndex={editingIndex}
      />
      {deleteModalOpen && deleteIndex !== null && (
        <div className="fixed inset-0 bg-[#BABBBB]/40 bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white rounded-lg px-4 py-3 w-full max-w-lg relative">
            <div onClick={handleCloseDeleteModal} className="cursor-pointer absolute right-3 top-3 text-[24px] text-[#1C274C] hover:text-[#11401C]">
              <IoIosCloseCircleOutline />
            </div>
            <h2 className="text-[24px] font-semibold text-[#11401C]">Symptom Details</h2>
            <div className="space-y-2 mt-3">
              <div className="flex items-center gap-1">
                <p className="text-[#1E1E1E] font-medium">Symptom Name:</p>
                <h2 className="text-[18px] font-medium text-[#11401C]">
                  {formDataList[deleteIndex]?.title}
                </h2>
              </div>
              <div className="flex items-center gap-1">
                <p className="text-[#1E1E1E] font-medium">Added Date:</p>
                <h2 className="text-[18px] font-medium text-[#11401C]">
                  {(() => {
                    const item = formDataList[deleteIndex];
                    if (item && "date" in item && item.date) {
                      try {
                        return new Date((item as any).date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                      } catch {
                        return "N/A";
                      }
                    }
                    return "N/A";
                  })()}
                </h2>
              </div>
              <div>
                <p className="text-[#1E1E1E] font-medium mb-2">Common Symptoms:</p>
                <div className="flex flex-wrap gap-2">
                  {formDataList[deleteIndex]?.symptoms?.map((symptom, idx) => (
                    <div
                      key={idx}
                      className="bg-transparent border border-[#14A155] font-normal rounded-full px-[12px] py-1 flex items-center text-[12px] text-[#333333]"
                    >
                      {symptom}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleConfirmDelete}
                  className="rounded-full px-[24px] py-[8px] text-[#DB3B21] border border-[#DB3B21] cursor-pointer font-semibold text-center text-[14px]"
                >
                  Delete Symptom
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {ModalOpen && deleteIndex !== null && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-[#BABBBB]/40 bg-opacity-50">
          <div className="bg-white rounded-xl p-6 w-80">
            <h2 className="text-lg font-semibold text-center">
              Are you sure you want to delete?
            </h2>
            <div className="flex justify-center items-center gap-3 mt-3">
              <button
                onClick={handleConfirmDelete}
                className="px-[16px] py-[7px] border border-[#DB2828] text-[#DB2828] rounded-full font-medium flex items-center justify-center gap-1 cursor-pointer"
              >
                <TiTick />
                Yes
              </button>
              <button
                onClick={handleClose}
                className="px-[16px] py-[7px] border border-[#2185D0] text-[#989898] hover:text-[#2185D0] rounded-full transition cursor-pointer flex items-center justify-center gap-1"
              >
                <MdClose />
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllergenDatabase;