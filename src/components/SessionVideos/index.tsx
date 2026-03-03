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
  useInitiateUploadMutation,
  useCompleteUploadMutation,
  useInitiateUpdateUploadMutation,
  useCompleteUpdateUploadMutation,
  SessionVideo
} from "@/lib/api/sessionVideoApi";
import { useToaster } from "@/components/Toaster";
import { splitFileIntoChunks, uploadChunks } from "@/lib/utils/chunkedUpload";

const SessionVideos: React.FC = () => {
  const { showToast } = useToaster();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showUpload, setShowUpload] = useState(true);
  const [searchVideo, setSearchVideo] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<SessionVideo | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<{ video: SessionVideo; source: "upload" | "draft" } | null>(null);
  const uploadedErrorShownRef = useRef(false);
  const draftErrorShownRef = useRef(false);

  const { data: uploadedVideosData, error: uploadedError, refetch: refetchUploaded } = useGetVideosQuery(
    { status: 'uploaded' }
  );

  const { data: draftVideosData, error: draftError, refetch: refetchDrafts } = useGetVideosQuery(
    { status: 'draft' }
  );

  const [createVideo, { isLoading: creating }] = useCreateVideoMutation();
  const [updateVideo, { isLoading: updating }] = useUpdateVideoMutation();
  const [deleteVideo] = useDeleteVideoMutation();
  const [initiateUpload] = useInitiateUploadMutation();
  const [completeUpload] = useCompleteUploadMutation();
  const [initiateUpdateUpload] = useInitiateUpdateUploadMutation();
  const [completeUpdateUpload] = useCompleteUpdateUploadMutation();

  const uploadedVideos = uploadedVideosData?.data || [];
  const drafts = draftVideosData?.data || [];

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

  const handleSubmit = async (values: { title: string; description: string; symptoms: string[]; videos: File[] }, isDraft: boolean) => {
    try {
      if (editingVideo) {
        // For editing, use chunked upload if video file is provided
        if (values.videos.length > 0 && values.videos[0]) {
          const videoFile = values.videos[0];
          
          // Step 1: Initiate update upload
          const initiateResponse = await initiateUpdateUpload({
            id: editingVideo._id,
            filename: videoFile.name,
            mimetype: videoFile.type,
            totalSize: videoFile.size,
          }).unwrap();

          if (!initiateResponse.success || !initiateResponse.data) {
            throw new Error("Failed to initiate update upload");
          }

          const { uploadId, key, presignedUrls } = initiateResponse.data;

          // Step 2: Split file into chunks and upload
          const chunks = splitFileIntoChunks(videoFile);
          const parts = await uploadChunks(
            chunks,
            presignedUrls
          );

          // Step 3: Complete update upload
          await completeUpdateUpload({
            id: editingVideo._id,
            uploadId,
            key,
            parts,
            title: values.title,
            description: values.description,
            symptoms: values.symptoms,
            status: isDraft ? "draft" : "uploaded",
          }).unwrap();
        } else {
          // No video file, just update metadata
          await updateVideo({
            id: editingVideo._id,
            title: values.title,
            description: values.description,
            symptoms: values.symptoms,
            status: isDraft ? "draft" : "uploaded",
          }).unwrap();
        }
      } else {
        // For new videos, use chunked upload
        const videoFile = values.videos[0];
        
        // Step 1: Initiate upload
        const initiateResponse = await initiateUpload({
          filename: videoFile.name,
          mimetype: videoFile.type,
          totalSize: videoFile.size,
        }).unwrap();

        if (!initiateResponse.success || !initiateResponse.data) {
          throw new Error("Failed to initiate upload");
        }

        const { uploadId, key, presignedUrls } = initiateResponse.data;

        // Step 2: Split file into chunks and upload
        const chunks = splitFileIntoChunks(videoFile);
        const parts = await uploadChunks(
          chunks,
          presignedUrls
        );

        // Step 3: Complete upload
        await completeUpload({
          uploadId,
          key,
          parts,
          title: values.title,
          description: values.description,
          symptoms: values.symptoms,
          status: isDraft ? "draft" : "uploaded",
        }).unwrap();
      }

      setIsModalOpen(false);
      setEditingVideo(null);
      showToast(editingVideo ? (isDraft ? "Draft updated successfully" : "Video updated successfully") : (isDraft ? "Draft saved successfully" : "Video uploaded successfully"), "success");

      setTimeout(() => {
        try {
          refetchUploaded();
        } catch (error) {
        }
        try {
          refetchDrafts();
        } catch (error) {
        }
      }, 100);
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.message || `Failed to ${isDraft ? 'save draft' : 'upload video'}`;
      showToast(errorMessage, "error");
    }
  };

  const handleEdit = (index: number, source: "upload" | "draft") => {
    const listToEdit = source === "upload" ? uploadedVideos : drafts;
    setEditingVideo(listToEdit[index]);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (index: number, source: "upload" | "draft") => {
    const listToEdit = source === "upload" ? uploadedVideos : drafts;
    setVideoToDelete({ video: listToEdit[index], source });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
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
        }
        try {
          refetchDrafts();
        } catch (error) {
        }
      }, 100);
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to delete video";
      showToast(errorMessage, "error");
    }
  };

  const handleSelectCard = (index: number) => {
    setSelectedIndex(index);
    setShowUpload(false);
  };

  const SessionBtnData = [
    {
      label: "Upload",
      number: uploadedVideos.length > 0 ? `(${uploadedVideos.length})` : "",
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
          {SessionBtnData.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`flex items-center gap-1 cursor-pointer border-b-2
                        ${activeIndex === index ? "font-semibold text-[#11401C] border-[#11401C] pb-1" : "font-medium text-gray-50 border-transparent pb-1"}`}
            >
              {item.label}
              {item.number}
            </button>
          ))}
        </div>
        {activeIndex === 0 && (showUpload ?
          <Upload videos={uploadedVideos} searchTerm={searchVideo} onEdit={(index) => handleEdit(index, "upload")}
            onDelete={(index) => handleDeleteClick(index, "upload")} onSelectCard={handleSelectCard} />
          :
          <Yoga videos={uploadedVideos} index={selectedIndex} goBack={() => setShowUpload(true)} onDelete={(index) => handleDeleteClick(index, "upload")} onEdit={(index) => handleEdit(index, "upload")} />
        )}
        {activeIndex === 1 && (showUpload ?
          <Drafts drafts={drafts} onEdit={(index) => handleEdit(index, "draft")}
            onDelete={(index) => handleDeleteClick(index, "draft")} searchTerm={searchVideo} onSelectCard={handleSelectCard} />
          :
          <YogaDraft videos={drafts} index={selectedIndex} goBack={() => setShowUpload(true)} onDelete={(index) => handleDeleteClick(index, "draft")} onEdit={(index) => handleEdit(index, "draft")} />
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
        onClose={() => {
          setIsDeleteModalOpen(false);
          setVideoToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        videoTitle={videoToDelete?.video.title || ""}
      />
    </div>
  );
};

export default SessionVideos;
