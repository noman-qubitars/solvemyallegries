"use client"

import { useState } from "react";
import BreadCrum from "./BreadCrum";
import Upload from "./Upload/Upload";
import Drafts from "./Drafts/Drafts";
import Yoga from "./Upload/Yoga";
import Modal from "./Modal";
import YogaDraft from "./Drafts/YogaDraft";

const EducationalVideos: React.FC = () => {

  const [activeIndex, setActiveIndex] = useState(0);
  const [showUpload, setShowUpload] = useState(true);
  const [searchVideo, setSearchVideo] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialFormData = {
    title: "",
    description: "",
    symptoms: [] as string[],
    videos: [] as File[],
  };
  const [formDataList, setFormDataList] = useState<typeof initialFormData[]>([]);
  const [drafts, setDrafts] = useState<typeof initialFormData[]>([]);
  const [currentForm, setCurrentForm] = useState<typeof initialFormData>({ ...initialFormData });
  const [editingSource, setEditingSource] = useState<"upload" | "draft" | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [newSymptom, setNewSymptom] = useState("");

  const handleOpenModal = () => {
    setCurrentForm({ ...initialFormData });
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
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
        [field === "Title" ? "title" : field === "Description" ? "description" : field]: value,
      }));
    }
  };

  const handleRemoveSymptom = (symptomToRemove: string) => {
    setCurrentForm((prev) => ({
      ...prev,
      symptoms: prev.symptoms.filter(symptom => symptom !== symptomToRemove),
    }));
  };

  const handleVideoUpload = (files: FileList | null) => {
    if (!files) return;
    const file = Array.from(files).find((file) => file.type === "video/mp4");
    if (file) {
      setCurrentForm((prev) => ({
        ...prev,
        videos: [file],
      }));
    }
  };


  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleVideoUpload(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleVideoUpload(e.target.files);
  };

  const handleRemoveVideo = (index: number) => {
    setCurrentForm((prev) => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index),
    }));
  };

  const handleUpload = () => {
    if (
      currentForm.title.trim() === "" &&
      currentForm.description.trim() === "" &&
      currentForm.videos.length === 0
    ) {
      setIsModalOpen(false);
      return;
    }

    if (editingIndex !== null && editingSource !== null) {
      if (editingSource === "upload") {
        setFormDataList((prev) =>
          prev.map((item, idx) => (idx === editingIndex ? currentForm : item))
        );
      } else {
        setDrafts((prev) =>
          prev.map((item, idx) => (idx === editingIndex ? currentForm : item))
        );
      }
    } else {
      setFormDataList((prev) => [...prev, currentForm]);
    }

    setCurrentForm({ ...initialFormData });
    setEditingIndex(null);
    setEditingSource(null);
    setIsModalOpen(false);
  };

  const handleSaveDraft = () => {
    if (
      currentForm.title.trim() === "" &&
      currentForm.description.trim() === "" &&
      currentForm.videos.length === 0
    ) {
      setIsModalOpen(false);
      return;
    }
    if (editingIndex !== null && editingSource !== null) {
      if (editingSource === "upload") {
        setDrafts((prev) =>
          prev.map((item, idx) => (idx === editingIndex ? currentForm : item))
        );
      } else {
        setDrafts((prev) =>
          prev.map((item, idx) => (idx === editingIndex ? currentForm : item))
        );
      }
    } else {
      setDrafts((prev) => [...prev, currentForm]);
    }
    setCurrentForm({ ...initialFormData });
    setEditingIndex(null);
    setEditingSource(null);
    setIsModalOpen(false);
  };

  const handleEdit = (index: number, source: "upload" | "draft") => {
    const listToEdit = source === "upload" ? formDataList : drafts;
    const formToEdit = listToEdit[index];
    setCurrentForm(formToEdit);
    setEditingIndex(index);
    setEditingSource(source);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number, source: "upload" | "draft") => {
    if (source === "upload") {
      setFormDataList((prev) => prev.filter((_, i) => i !== index));
    } else {
      setDrafts((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSelectCard = (index: number) => {
    setSelectedIndex(index);
    setShowUpload(false);
  };

  const EducationalBtnData = [
    {
      label: "Upload",
      number: formDataList.length > 0 ? `(${formDataList.length})` : "",
    },
    {
      label: "Drafts",
      number: drafts.length > 0 ? `(${drafts.length})` : "",
    }
  ];


  return (
    <div>
      <BreadCrum onSearch={setSearchVideo} onOpen={handleOpenModal} />
      <div className="mt-4">
        <div className="flex items-center gap-2">
          {EducationalBtnData.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`flex items-center gap-1 cursor-pointer border-b-2
                        ${activeIndex === index ? "font-semibold text-[#11401C] border-[#11401C] pb-1" : "font-medium text-[#717171] border-transparent pb-1"}`}
            >
              {item.label}
              {item.number}
            </button>
          ))}
        </div>
        {activeIndex === 0 && (showUpload ?
          <Upload formData={formDataList} searchTerm={searchVideo} onEdit={(index) => handleEdit(index, "upload")}
            onDelete={(index) => handleDelete(index, "upload")} onSelectCard={handleSelectCard} />
          :
          <Yoga formData={formDataList} index={selectedIndex} goBack={() => setShowUpload(true)} onDelete={(index) => handleDelete(index, "upload")} onEdit={(index) => handleEdit(index, "upload")} />
        )}
        {activeIndex === 1 && (showUpload ?
          <Drafts drafts={drafts} onEdit={(index) => handleEdit(index, "draft")}
            onDelete={(index) => handleDelete(index, "draft")} searchTerm={searchVideo} onSelectCard={handleSelectCard} />
          :
          <YogaDraft formData={drafts} index={selectedIndex} goBack={() => setShowUpload(true)} onDelete={(index) => handleDelete(index, "upload")} onEdit={(index) => handleEdit(index, "upload")} />
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        formData={currentForm}
        handleChange={handleChange}
        handleDrop={handleDrop}
        handleFileSelect={handleFileSelect}
        handleRemoveVideo={handleRemoveVideo}
        handleSave={handleUpload}
        handleSaveDraft={handleSaveDraft}
        newSymptom={newSymptom}
        setNewSymptom={setNewSymptom}
        handleRemoveSymptom={handleRemoveSymptom}
      />
    </div>
  );
};

export default EducationalVideos;
