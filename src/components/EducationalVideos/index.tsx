"use client"

import { useState, useEffect, useRef } from "react";
import BreadCrum from "./BreadCrum";
import Upload from "./Upload/Upload";
import Drafts from "./Drafts/Drafts";
import Yoga from "./Upload/Yoga";
import Modal from "./Modal";
import YogaDraft from "./Drafts/YogaDraft";
import DeleteVideoModal from "./DeleteVideoModal";
import {
  useGetVideosQuery,
  useCreateVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
  EducationalVideo
} from "@/lib/api/educationalVideoApi";
import { useToaster } from "@/components/Toaster";

const EducationalVideos: React.FC = () => {
  const { showToast } = useToaster();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showUpload, setShowUpload] = useState(true);
  const [searchVideo, setSearchVideo] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<EducationalVideo | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<{ video: EducationalVideo; source: "upload" | "draft" } | null>(null);
  const uploadedErrorShownRef = useRef(false);
  const draftErrorShownRef = useRef(false);
  const [uploadedPage, setUploadedPage] = useState(1);
  const [draftPage, setDraftPage] = useState(1);
  const pageSize = 10;

  // Fetch all videos without pagination
  const { data: uploadedVideosData, error: uploadedError, refetch: refetchUploaded } = useGetVideosQuery(
    { status: 'uploaded' }
  );

  const { data: draftVideosData, error: draftError, refetch: refetchDrafts } = useGetVideosQuery(
    { status: 'draft' }
  );

  const [createVideo, { isLoading: creating }] = useCreateVideoMutation();
  const [updateVideo, { isLoading: updating }] = useUpdateVideoMutation();
  const [deleteVideo] = useDeleteVideoMutation();

  // Get all videos
  const allUploadedVideos = uploadedVideosData?.data || [];
  const allDrafts = draftVideosData?.data || [];

  // Filter videos based on search term
  const filteredUploadedVideos = allUploadedVideos.filter(video =>
    video.title.toLowerCase().includes(searchVideo.toLowerCase())
  );
  const filteredDrafts = allDrafts.filter(draft =>
    draft.title.toLowerCase().includes(searchVideo.toLowerCase())
  );

  // Client-side pagination for uploaded videos (after filtering)
  const uploadedStartIndex = (uploadedPage - 1) * pageSize;
  const uploadedEndIndex = uploadedStartIndex + pageSize;
  const uploadedVideos = filteredUploadedVideos.slice(uploadedStartIndex, uploadedEndIndex);
  const uploadedTotalPages = Math.ceil(filteredUploadedVideos.length / pageSize);

  // Client-side pagination for drafts (after filtering)
  const draftStartIndex = (draftPage - 1) * pageSize;
  const draftEndIndex = draftStartIndex + pageSize;
  const drafts = filteredDrafts.slice(draftStartIndex, draftEndIndex);
  const draftTotalPages = Math.ceil(filteredDrafts.length / pageSize);
  
  useEffect(() => {
    if (searchVideo) {
      setUploadedPage(1);
      setDraftPage(1);
    }
  }, [searchVideo]);

  // Reset to page 1 when videos change (after delete, create, update)
  useEffect(() => {
    if (uploadedPage > uploadedTotalPages && uploadedTotalPages > 0) {
      setUploadedPage(1);
    }
  }, [uploadedTotalPages, uploadedPage]);

  useEffect(() => {
    if (draftPage > draftTotalPages && draftTotalPages > 0) {
      setDraftPage(1);
    }
  }, [draftTotalPages, draftPage]);

  useEffect(() => {
    if (uploadedVideosData?.success) {
      uploadedErrorShownRef.current = false;
    } else if (uploadedError && !uploadedErrorShownRef.current) {
      uploadedErrorShownRef.current = true;
      showToast("Failed to fetch uploaded videos", "error");
    }
  }, [uploadedVideosData, uploadedError, showToast]);

  useEffect(() => {
    if (draftVideosData?.success) {
      draftErrorShownRef.current = false;
    } else if (draftError && !draftErrorShownRef.current) {
      draftErrorShownRef.current = true;
      showToast("Failed to fetch draft videos", "error");
    }
  }, [draftVideosData, draftError, showToast]);

  const handleOpenModal = () => {
    setEditingVideo(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingVideo(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (values: { title: string; description: string; videos: File[] }, isDraft: boolean) => {
    try {
      if (editingVideo) {
        await updateVideo({
          id: editingVideo._id,
          title: values.title,
          description: values.description,
          status: isDraft ? "draft" : "uploaded",
          video: values.videos[0],
        }).unwrap();
      } else {
        await createVideo({
          title: values.title,
          description: values.description,
          status: isDraft ? "draft" : "uploaded",
          video: values.videos[0],
        }).unwrap();
      }

      setIsModalOpen(false);
      setEditingVideo(null);
      showToast(isDraft ? "Draft saved successfully" : "Video uploaded successfully", "success");

      setTimeout(() => {
        try {
          refetchUploaded();
        } catch (error) {
          // Silently handle refetch errors
        }
        try {
          refetchDrafts();
        } catch (error) {
          // Silently handle refetch errors
        }
      }, 100);
    } catch (error: any) {
      const errorMessage = error?.data?.message || `Failed to ${isDraft ? 'save draft' : 'upload video'}`;
      showToast(errorMessage, "error");
    }
  };

  const handleEdit = (index: number, source: "upload" | "draft") => {
    // Calculate the actual index in the filtered array
    const actualIndex = source === "upload" 
      ? uploadedStartIndex + index 
      : draftStartIndex + index;
    const listToEdit = source === "upload" ? filteredUploadedVideos : filteredDrafts;
    setEditingVideo(listToEdit[actualIndex]);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (index: number, source: "upload" | "draft") => {
    // Calculate the actual index in the filtered array
    const actualIndex = source === "upload" 
      ? uploadedStartIndex + index 
      : draftStartIndex + index;
    const listToDelete = source === "upload" ? filteredUploadedVideos : filteredDrafts;
    const video = listToDelete[actualIndex];
    setVideoToDelete({ video, source });
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!videoToDelete) return;

    try {
      await deleteVideo(videoToDelete.video._id).unwrap();
      showToast("Video deleted successfully", "success");
      setIsDeleteModalOpen(false);
      setVideoToDelete(null);

      setTimeout(() => {
        try {
          refetchUploaded();
        } catch (error) {
          // Silently handle refetch errors
        }
        try {
          refetchDrafts();
        } catch (error) {
          // Silently handle refetch errors
        }
      }, 100);
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to delete video";
      showToast(errorMessage, "error");
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setVideoToDelete(null);
  };

  const handleSelectCard = (index: number, source: "upload" | "draft") => {
    // Calculate the actual index in the full array
    const actualIndex = source === "upload" 
      ? uploadedStartIndex + index 
      : draftStartIndex + index;
    setSelectedIndex(actualIndex);
    setShowUpload(false);
  };

  const EducationalBtnData = [
    {
      label: "Upload",
      number: uploadedVideosData?.totalVideos ? `(${uploadedVideosData.totalVideos})` : "",
    },
    {
      label: "Drafts",
      number: draftVideosData?.totalVideos ? `(${draftVideosData.totalVideos})` : "",
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
          <Upload
            videos={uploadedVideos}
            searchTerm=""
            onEdit={(index) => handleEdit(index, "upload")}
            onDelete={(index) => handleDeleteClick(index, "upload")}
            onSelectCard={(index) => handleSelectCard(index, "upload")}
            currentPage={uploadedPage}
            totalPages={uploadedTotalPages}
            onPageChange={setUploadedPage}
          />
          :
          <Yoga
            videos={allUploadedVideos}
            index={selectedIndex}
            goBack={() => setShowUpload(true)}
            onDelete={(index) => handleDeleteClick(index, "upload")}
            onEdit={(index) => handleEdit(index, "upload")}
          />
        )}
        {activeIndex === 1 && (showUpload ?
          <Drafts
            drafts={drafts}
            onEdit={(index) => handleEdit(index, "draft")}
            onDelete={(index) => handleDeleteClick(index, "draft")}
            searchTerm=""
            onSelectCard={(index) => handleSelectCard(index, "draft")}
            currentPage={draftPage}
            totalPages={draftTotalPages}
            onPageChange={setDraftPage}
          />
          :
          <YogaDraft
            videos={allDrafts}
            index={selectedIndex}
            goBack={() => setShowUpload(true)}
            onDelete={(index) => handleDeleteClick(index, "draft")}
            onEdit={(index) => handleEdit(index, "draft")}
          />
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingVideo={editingVideo}
        onSubmit={handleSubmit}
        isLoading={creating || updating}
      />
      <DeleteVideoModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default EducationalVideos;